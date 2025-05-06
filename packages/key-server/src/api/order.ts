import { AppContext } from '../context'
import { createKeypair, getKeypair } from '#/db'
import { Express, RequestHandler } from 'express'
import { Address } from 'ox'
export * as health from './health'

export default function registerApi(app: Express, ctx: AppContext) {
  app.get('/orders/customer/:address', async (req, res) => {
    const { address } = req.params
    console.log('orders/customer/:address', address)

    if (!address || !Address.validate(address)) {
      res.status(400).json({ error: 'Invalid address' })
      return
    }

    const escrows = await ctx.db.selectFrom('escrows').where('payer', '=', address).selectAll().execute()
    res.json(escrows)
  })

  app.get('/orders/merchant/:address', async (req, res) => {
    const { address } = req.params

    if (!address || !Address.validate(address)) {
      res.status(400).json({ error: 'Invalid address' })
      return
    }

    const escrows = await ctx.db.selectFrom('escrows').where('payee', '=', address).selectAll().execute()
    res.json(escrows)
  })
}
