import express, { Request, Response, NextFunction, Router } from 'express'
import cors from 'cors'
import { Address, Json } from 'ox'
import { ServerKeyPair } from './keys'
import { actions, buildActionCall } from './calls'
import type { Env } from './types'
import logger from 'pino-http'

// Extend Express Request type to include our environment
declare global {
  namespace Express {
    interface Request {
      app: {
        locals: {
          env: Env
        }
      }
    }
  }
}

// Define route parameter types
interface KeysParams {
  address: string
}

interface WorkflowParams {
  address: string
}

interface ScheduleQuery {
  address?: string
}

interface WorkflowQuery {
  count?: string
}

const app = express()
const router = Router()

// Middleware
app.use(express.json())
app.use(cors({ origin: '*', methods: ['GET', 'OPTIONS', 'POST'] }))

// Request ID middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const requestId = crypto.randomUUID()
  req.headers['EXP0003-Request-Id'] = requestId
  next()
})

// Pretty JSON middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.query.pretty) {
    const originalJson = res.json
    res.json = function (data: any) {
      res.setHeader('Content-Type', 'application/json')
      return res.send(JSON.stringify(data, null, 2))
    }
  }
  next()
})
app.use(logger())

// Routes
router.get('/', (_req: Request, res: Response) => {
  res.send('gm. See code at https://github.com/ithacaxyz/exp-0003')
})

router.get('/keys/:address', async (req: any, res: any) => {
  const { address } = req.params
  const { expiry } = req.query

  if (!address || !Address.validate(address)) {
    return res.status(400).json({ error: 'Invalid address' })
  }

  // check for existing key
  const storedKey = await ServerKeyPair.getFromStore(req.app.locals.env, {
    address,
  })

  const expired = storedKey?.expiry && storedKey.expiry < Math.floor(Date.now() / 1_000)

  if (!expired && storedKey) {
    return res.json({
      type: storedKey.type,
      publicKey: storedKey.public_key,
      expiry: storedKey.expiry,
      role: storedKey.role,
    })
  }

  const keyPair = await ServerKeyPair.generateAndStore(req.app.locals.env, {
    address,
    expiry: expiry ? Number(expiry) : undefined,
  })

  console.info(`Key stored for ${address}`)

  const { public_key, role, type } = keyPair

  return res.json({ type, publicKey: public_key, expiry, role })
})

router.post('/schedule', async (req: any, res: any) => {
  const account = req.query.address
  if (!account || !Address.validate(account)) {
    return res.status(400).json({ message: 'Invalid address' })
  }

  const { action, schedule } = req.body

  if (!action || !actions.includes(action)) {
    return res.status(400).json({ message: 'Invalid action' })
  }

  const storedKey = await ServerKeyPair.getFromStore(req.app.locals.env, {
    address: account.toLowerCase(),
  })

  if (!storedKey) {
    return res.status(400).json({
      message: 'Key not found. Request a new key and grant permissions if the problem persists',
    })
  }

  if (storedKey?.expiry && storedKey?.expiry < Math.floor(Date.now() / 1_000)) {
    await ServerKeyPair.deleteFromStore(req.app.locals.env, {
      address: account.toLowerCase(),
    })
    return res.status(400).json({ message: 'Key expired and deleted' })
  }

  const calls = buildActionCall({ action, account })

  const insertSchedule = await req.app.locals.env.DB.prepare(
    /* sql */ `
    INSERT INTO schedules ( address, schedule, action, calls ) VALUES ( ?, ?, ?, ? )`,
  )
    .bind(account.toLowerCase(), schedule, action, Json.stringify(calls))
    .all()

  if (!insertSchedule.success) {
    console.info('insertSchedule error', insertSchedule)
    return res.status(500).json({ message: insertSchedule.error })
  }

  console.info('insertSchedule success', insertSchedule.success)

  return res.json({
    calls,
    action,
    schedule,
    address: account.toLowerCase(),
  })
})

router.all('/workflow/:address', async (req: any, res: any) => {
  const { address } = req.params
  const { count = 6 } = req.query
  console.info('workflow', address, count)

  if (!Address.validate(address)) {
    return res.status(400).json({ message: 'Invalid address' })
  }

  if (!count || Number(count) < 1 || Number(count) > 10) {
    return res.status(400).json({
      message: `Count must be between 1 and 10. Received: ${count}`,
    })
  }

  const keyPair = await ServerKeyPair.getFromStore(req.app.locals.env, { address })

  if (!keyPair) return res.status(404).json({ error: 'Key not found' })

  if (keyPair.expiry && keyPair.expiry < Math.floor(Date.now() / 1_000)) {
    await ServerKeyPair.deleteFromStore(req.app.locals.env, { address })
    return res.status(400).json({ error: 'Key expired and deleted' })
  }

  const instance = await req.app.locals.env.WORKFLOW_01.create({
    id: crypto.randomUUID(),
    params: { keyPair, count: Number(count || 6) },
  })

  console.info('Workflow01 instance created', instance.id)

  return res.json({ id: instance.id, details: await instance.status() })
})

// Mount routes
app.use(router)

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const requestId = req.headers['EXP0003-Request-Id']
  console.error(`[onError: ${requestId} ${req.url}]: ${err}`)
  res.status(500).json({
    remote: req.ip,
    error: err.message,
    requestId,
  })
})

// 404 handler
app.use((req: Request, res: Response) => {
  const requestId = req.headers['EXP0003-Request-Id']
  const errorMessage = `[notFound: ${requestId} ${req.url}]: is not a valid path.`
  console.error(errorMessage, req.ip)
  res.status(404).json({
    error: errorMessage,
    remote: req.ip,
    requestId,
  })
})

// Mount debug routes
// app.use('/debug', debugApp as unknown as Router)

app.listen(3033, () => {
  console.info('Server is running on port 3000')
})
