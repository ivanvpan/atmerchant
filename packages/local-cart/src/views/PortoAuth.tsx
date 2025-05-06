import { useQuery } from '@tanstack/react-query'
import { Hooks } from 'porto/wagmi'
import { baseSepolia } from 'wagmi/chains'
import { porto } from 'porto/wagmi'
import {
  useAccount,
  useConnectors,
  http,
  createConfig,
  createStorage,
  BaseError,
  useCallsStatus,
  useSendCalls,
  useWatchContractEvent,
} from 'wagmi'
import { Hex, Json, Value } from 'ox'
import { useEffect, useState } from 'react'
import { Porto } from 'porto'
import { useMutation } from 'wagmi/query'
import EscrowFactory from '../contracts/EscrowFactory'
import { queryClient } from '../queryClient'
// import SimpleEscrow from '../contracts/SimpleEscrow'

export const wagmiConfig = createConfig({
  chains: [baseSepolia],
  connectors: [porto()],
  storage: createStorage({ storage: window.localStorage }),
  transports: {
    [baseSepolia.id]: http(),
  },
})

export function truncateHexString({ address, length = 6 }: { address: string; length?: number }) {
  return length > 0 ? `${address.slice(0, length)}...${address.slice(-length)}` : address
}

console.log(wagmiConfig.chains)
export const permissions = () =>
  ({
    expiry: Math.floor(Date.now() / 1_000) + 60 * 60, // 1 hour
    permissions: {
      calls: [
        {
          signature: 'createEscrow(address,address,address)',
          to: EscrowFactory.address,
        },
      ],
      spend: [
        {
          period: 'minute',
          token: EscrowFactory.address,
          limit: Hex.fromNumber(Value.fromEther('1000')),
        },
      ],
    },
  }) as const

interface Key {
  type: 'p256'
  expiry: number
  publicKey: Hex.Hex
  role: 'session' | 'admin'
}

export default function PortoAuth() {
  return (
    <div>
      <Register />
      <RequestKey />
      <GrantPermissions />
      <CreateEscrow />
      <Account />
      <Events />
      <Clear />
      <Orders />
    </div>
  )
}

function Orders() {
  const { address } = useAccount()

  const queryOrders = useQuery<
    {
      address: string
      payer: string
      payee: string
      arbiter: string
    }[]
  >({
    queryKey: ['orders', address],
    queryFn: async () => {
      if (!address) return
      const response = await fetch(`/api/orders/customer/${address}`)
      const result = await Json.parse(await response.text())
      return result
    },
  })

  return (
    <div>
      <h2>Orders</h2>
      <div>
        {queryOrders.data?.map((order) => (
          <div key={order.address}>
            <h3>{order.address}</h3>
            <p>Payer: {order.payer}</p>
            <p>Payee: {order.payee}</p>
            <p>Arbiter: {order.arbiter}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function RequestKey() {
  const { address } = useAccount()

  const requestKeyMutation = useMutation<Key>({
    mutationFn: async () => {
      if (!address) return
      const searchParams = new URLSearchParams({
        expiry: permissions().expiry.toString(),
      })
      console.log('Requesting ========')
      const response = await fetch(`/api/keys/${address.toLowerCase()}?${searchParams.toString()}`)
      const result = await Json.parse(await response.text())
      await wagmiConfig.storage?.setItem(`${address.toLowerCase()}-keys`, Json.stringify(result))
      return result
    },
  })

  useEffect(() => {
    requestKeyMutation.mutate()
  }, [])
  return (
    <div>
      {address ? (
        <button
          type="button"
          onClick={() => requestKeyMutation.mutate()}
          disabled={requestKeyMutation.status === 'pending'}
        >
          {requestKeyMutation.status === 'pending' ? 'Requesting key…' : 'Request Key'}
        </button>
      ) : null}
      {requestKeyMutation.data ? (
        <div>
          <pre>{Json.stringify(requestKeyMutation.data, undefined, 2)}</pre>
        </div>
      ) : null}
    </div>
  )
}

function Register() {
  const label = 'ivan-account-003'
  const connectors = useConnectors()
  const connector = connectors.find((x) => x.id === 'xyz.ithaca.porto')
  const connect = Hooks.useConnect()

  return (
    <div>
      <button
        disabled={connect.status === 'pending'}
        onClick={async () => {
          connect.mutate({
            connector,
            createAccount: { label },
            // grantPermissions: permissions(),
          })
        }}
        type="button"
      >
        Register
      </button>
      <p>{connect.error?.message}</p>
    </div>
  )
}

function Clear() {
  const clear = () => {
    queryClient.clear()
    queryClient.resetQueries()
    queryClient.removeQueries()
    queryClient.invalidateQueries()
    queryClient.unmount()
    window.localStorage.clear()
    window.sessionStorage.clear()
  }
  return <button onClick={clear}>Clear</button>
}

function CreateEscrow() {
  const { address } = useAccount()
  const { data, error, isPending, sendCalls } = useSendCalls({
    mutation: {
      onSuccess: (data) => {
        // 0x8cd4ff1a921f41a5f8962c8072840dcc777acd93612030a6a6a7fc5c65c271e6
        console.log('onSuccess data', data)
      },
    },
  })
  useWatchContractEvent({
    address: EscrowFactory.address as `0x${string}`,
    eventName: 'EscrowCreated',
    onLogs: (logs) => {
      console.log('logs', logs)
    },
  })
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useCallsStatus({
    id: data?.id || 'disabled',
    query: {
      enabled: !!data?.id,
      refetchInterval: ({ state }) => {
        if (state.data?.status === 'success') return false
        return 1_000
      },
    },
  })

  const [transactions, setTransactions] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (data?.id) {
      setTransactions((prev) => new Set([...prev, data.id]))
      console.log('data', data)
    }
  }, [data])

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          sendCalls({
            calls: [
              {
                functionName: 'createEscrow',
                abi: EscrowFactory.abi,
                to: EscrowFactory.address,
                args: [address, address, address],
              },
            ],
          })
        }}
      >
        <button type="submit" disabled={isPending} style={{ marginBottom: '5px' }}>
          {isPending ? 'Confirming...' : 'Create Escrow'}
        </button>
      </form>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {Array.from(transactions).map((tx) => (
          <li key={tx}>
            <a target="_blank" rel="noopener noreferrer" href={`https://sepolia.basescan.org/tx/${tx}`}>
              {tx}
            </a>
          </li>
        ))}
      </ul>
      <p>{isConfirming && 'Waiting for confirmation...'}</p>
      <p>{isConfirmed && 'Transaction confirmed.'}</p>
      {error && (
        <div>
          Error: {(error as BaseError).shortMessage} {error.message} <br />
          {error.stack}
        </div>
      )}
    </div>
  )
}

function GrantPermissions() {
  const { address } = useAccount()
  const grantPermissions = Hooks.useGrantPermissions()
  return (
    <div>
      <form
        onSubmit={async (event) => {
          event.preventDefault()
          if (!address) return

          const key = Json.parse((await wagmiConfig.storage?.getItem(`${address.toLowerCase()}-keys`)) || '{}') as Key

          // if `expry` is present in both `key` and `permissions`, pick the lower value
          const expiry = Math.min(key.expiry, permissions().expiry)

          grantPermissions.mutate({
            key,
            expiry,
            address,
            permissions: permissions().permissions,
          })
        }}
      >
        <button type="submit" style={{ marginBottom: '5px' }} disabled={grantPermissions.status === 'pending'}>
          {grantPermissions.status === 'pending' ? 'Authorizing…' : 'Grant Permissions'}
        </button>
        {grantPermissions.status === 'error' && <p>{grantPermissions.error?.message}</p>}
      </form>
      {grantPermissions.data ? (
        <details>
          <summary style={{ marginTop: '1rem' }}>
            Permissions:{' '}
            {truncateHexString({
              address: grantPermissions.data?.key.publicKey,
              length: 12,
            })}
          </summary>
          <pre>{Json.stringify(grantPermissions.data, undefined, 2)}</pre>
        </details>
      ) : null}
    </div>
  )
}

function Account() {
  const account = useAccount()
  const disconnect = Hooks.useDisconnect()

  return (
    <div>
      <h2>Account</h2>

      <div>
        account: {account.address}
        <br />
        chainId: {account.chainId}
        <br />
        status: {account.status}
      </div>

      {account.status !== 'disconnected' && (
        <button onClick={() => disconnect.mutate({})} type="button">
          Disconnect
        </button>
      )}
    </div>
  )
}

function Events() {
  const [responses, setResponses] = useState<Record<string, unknown>>({})
  const connectors = useConnectors()
  const portoConnector = connectors.find((x) => x.id === 'xyz.ithaca.porto')
  useEffect(() => {
    portoConnector
      ?.getProvider({
        chainId: baseSepolia.id,
      })
      .then((provider: unknown) => {
        const castedProvider = provider as ReturnType<typeof Porto.create>['provider']
        const handleResponse = (event: string) => (response: unknown) =>
          setResponses((responses) => ({
            ...responses,
            [event]: response,
          }))

        const handleAccountsChanged = handleResponse('accountsChanged')
        const handleChainChanged = handleResponse('chainChanged')
        const handleConnect = handleResponse('connect')
        const handleDisconnect = handleResponse('disconnect')
        const handleMessage = handleResponse('message')

        castedProvider?.on('accountsChanged', handleAccountsChanged)
        castedProvider?.on('chainChanged', handleChainChanged)
        castedProvider?.on('connect', handleConnect)
        castedProvider?.on('disconnect', handleDisconnect)
        castedProvider?.on('message', handleMessage)
        return () => {
          castedProvider?.removeListener('accountsChanged', handleAccountsChanged)
          castedProvider?.removeListener('chainChanged', handleChainChanged)
          castedProvider?.removeListener('connect', handleConnect)
          castedProvider?.removeListener('disconnect', handleDisconnect)
          castedProvider?.removeListener('message', handleMessage)
        }
      })
  }, [])
  return (
    <div>
      <h3>Events</h3>
      <pre>{Json.stringify(responses, null, 2)}</pre>
    </div>
  )
}
