import { AppContext } from '#/context'
import { createKeypair, getKeypair } from '#/db'
import { Express } from 'express'
import { Address } from 'ox'
export * as health from './health'

export default function (app: Express, ctx: AppContext) {
  app.get('/key/:address', async (req, res) => {
    const { address } = req.params
    const { expiry } = req.query

    if (!address || !Address.validate(address)) {
      return res.status(400).json({ error: 'Invalid address' })
    }

    // check for existing key
    const storedKey = await getKeypair(ctx.db, address)

    const expired = storedKey?.expiry && storedKey.expiry < Math.floor(Date.now() / 1_000)

    if (!expired && storedKey) {
      return res.json({
        type: storedKey.type,
        publicKey: storedKey.public_key,
        expiry: storedKey.expiry,
        role: storedKey.role,
      })
    }

    const keyPair = await createKeypair(ctx.db, {
      address,
      expiry: expiry ? Number(expiry) : undefined,
    })

    console.info(`Key stored for ${address}`)

    const { public_key, role, type } = keyPair

    return res.json({ type, publicKey: public_key, expiry, role })
  })

  return app
}
