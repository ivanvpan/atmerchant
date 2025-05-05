import { Hooks } from 'porto/wagmi'
import { baseSepolia } from 'wagmi/chains'
import { porto } from 'porto/wagmi'
import { useAccount, useConnectors } from 'wagmi'
import { Hex, Json, Value } from 'ox'
import { http, createConfig, createStorage } from 'wagmi'
import { useEffect, useState } from 'react'
import { Porto } from 'porto'

export const wagmiConfig = createConfig({
  chains: [baseSepolia],
  connectors: [porto()],
  storage: createStorage({ storage: window.localStorage }),
  transports: {
    [baseSepolia.id]: http(),
  },
})

console.log(wagmiConfig.chains)
const testErc20Addresses = ['0x706aa5c8e5cc2c67da21ee220718f6f6b154e75c']
export const permissions = () =>
  ({
    expiry: Math.floor(Date.now() / 1_000) + 60 * 60, // 1 hour
    permissions: {
      calls: [
        {
          signature: 'approve(address,uint256)',
          to: testErc20Addresses[0],
        },
        {
          signature: 'transfer(address,uint256)',
          to: testErc20Addresses[0],
        },
      ],
      spend: [
        {
          period: 'minute',
          token: testErc20Addresses[0],
          limit: Hex.fromNumber(Value.fromEther('1000')),
        },
      ],
    },
  }) as const

export default function PortoAuth() {
  const label = 'ivan-account-001'
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
            grantPermissions: permissions(),
          })
        }}
        type="button"
      >
        Register
      </button>
      <p>{connect.error?.message}</p>
      <Account />
      <Events />
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
