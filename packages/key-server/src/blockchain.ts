import EscrowFactory from './contracts/EscrowFactory'
import { getKeypair } from './db'
import { AppContext } from './context'
import type { AbiEvent } from 'abitype'
export function listenToEscrowCreated(ctx: AppContext) {
  console.log('Listening to blockchain events...')

  ctx.client.watchContractEvent<typeof EscrowFactory.abi, 'EscrowCreated'>({
    abi: EscrowFactory.abi,
    address: EscrowFactory.address as `0x${string}`,
    eventName: 'EscrowCreated',
    onLogs: (logs) => {
      logs.forEach((log) => {
        console.log('New escrow created', (log as any).args.escrowAddress)
        const args = (log as any).args
        processEscrowCreated(args.payee, args.escrowAddress, ctx)
      })
    },
  })

  updateSinceLastProcessedBlock(ctx)
  setInterval(
    () => {
      updateSinceLastProcessedBlock(ctx)
    },
    1000 * 60 * 10,
  )
}

async function updateSinceLastProcessedBlock(ctx: AppContext) {
  console.log('Catching up since last processed block')
  let lastProcessedBlock = await ctx.db.selectFrom('lastProcessedBlock').selectAll().executeTakeFirst()
  const START_BLOCK = 25324505
  if (!lastProcessedBlock) {
    await ctx.db
      .insertInto('lastProcessedBlock')
      .values({
        blockNumber: START_BLOCK,
      })
      .execute()
    lastProcessedBlock = {
      blockNumber: START_BLOCK,
    }
  }

  const currentBlockNumber = await ctx.client.getBlockNumber()

  const logs = await ctx.client.getLogs({
    address: EscrowFactory.address as `0x${string}`,
    event: EscrowFactory.abi.find((abi) => abi.name === 'EscrowCreated') as AbiEvent,
    fromBlock: BigInt(lastProcessedBlock.blockNumber),
    toBlock: currentBlockNumber,
  })

  logs.forEach((log) => {
    const args = (log as any).args
    processEscrowCreated(args.payee, args.escrowAddress, ctx)
  })

  await ctx.db
    .updateTable('lastProcessedBlock')
    .set({
      blockNumber: Number(currentBlockNumber),
    })
    .execute()
}

async function processEscrowCreated(payee: `0x${string}`, escrowAddress: `0x${string}`, ctx: AppContext) {
  console.log('Processing escrow created', escrowAddress)
  const escrow = await ctx.db.selectFrom('escrows').where('address', '=', escrowAddress).selectAll().executeTakeFirst()
  if (escrow) {
    console.log('Escrow already exists', escrowAddress)
    return
  }

  await ctx.db
    .insertInto('escrows')
    .values({
      address: escrowAddress,
      payer: payee,
      payee: payee,
      arbiter: payee,
    })
    .execute()

  const keypair = await getKeypair(ctx.db, payee)
  if (!keypair) {
    console.error('No keypair found for address', payee)
    return
  }
}

/*
  {
    eventName: 'EscrowCreated',
    args: {
      escrowAddress: '0x1439675344ea18FA878f23c9DCa0aD3230E3E3a8',
      payee: '0x0ca3AA1529206b4df87A512993657fc7290DaD7d',
      storefront: '0x0ca3AA1529206b4df87A512993657fc7290DaD7d',
      arbiter: '0x0ca3AA1529206b4df87A512993657fc7290DaD7d'
    },
    address: '0x0f01298ca1472dc8fce232e5611d57294aefe904',
    blockHash: '0xba6c2e823244ad5a078194e4246c68e35c88bae23bd7bcf62ff3f8e13a43fbff',
    blockNumber: 25398744n,
    data: '0x0000000000000000000000000ca3aa1529206b4df87a512993657fc7290dad7d',
    logIndex: 308,
    removed: false,
    topics: [
      '0x9d6330c40b62e9b3318783aac74e1b766472a80cc5298f1a06e5106eb7c58a8e',
      '0x0000000000000000000000001439675344ea18fa878f23c9dca0ad3230e3e3a8',
      '0x0000000000000000000000000ca3aa1529206b4df87a512993657fc7290dad7d',
      '0x0000000000000000000000000ca3aa1529206b4df87a512993657fc7290dad7d'
    ],
    transactionHash: '0x7c9a2e3558d58ea4eedc9b48efb0c6bddb420e4ba22916603cfb285ce0a122b5',
    transactionIndex: 51
  }
*/
