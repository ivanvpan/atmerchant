import { Hooks } from 'porto/wagmi'
import { odysseyTestnet, baseSepolia } from 'wagmi/chains'
import { porto } from 'porto/wagmi'
import { useAccount, useConnectors } from 'wagmi'
import { Hex, Value } from 'ox'
import { http, createConfig, createStorage } from 'wagmi'

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
  const account = useAccount()
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
      {account && <p>Account: {account.address}</p>}
    </div>
  )
}
