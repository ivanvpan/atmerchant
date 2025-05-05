import { ExperimentERC20 } from './contracts'
import { AbiFunction, type Address, Value } from 'ox'

export const actions = ['mint', 'approve-transfer']

export function buildActionCall({ action, account }: { action: string; account: Address.Address }) {
  if (action === 'mint') {
    return <const>[
      {
        to: ExperimentERC20.address[0],
        data: AbiFunction.encodeData(AbiFunction.fromAbi(ExperimentERC20.abi, 'mint'), [account, Value.fromEther('1')]),
      },
    ]
  }

  if (action === 'approve-transfer') {
    return <const>[
      {
        to: ExperimentERC20.address[0],
        data: AbiFunction.encodeData(AbiFunction.fromAbi(ExperimentERC20.abi, 'approve'), [
          account,
          Value.fromEther('1'),
        ]),
      },
      {
        to: ExperimentERC20.address[0],
        data: AbiFunction.encodeData(AbiFunction.fromAbi(ExperimentERC20.abi, 'transfer'), [
          '0x0000000000000000000000000000000000000000',
          Value.fromEther('1'),
        ]),
      },
    ]
  }

  return <const>[
    { to: '0x0000000000000000000000000000000000000000', value: '0x0' },
    { to: '0x0000000000000000000000000000000000000000', value: '0x0' },
  ]
}
