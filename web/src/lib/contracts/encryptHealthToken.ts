// Rights Reserved, Unlicensed
import { createPublicClient, createWalletClient, http, parseAbi } from 'viem'
import { sepolia } from 'viem/chains'
import { injected } from '@wagmi/connectors'

export const tokenAddress = '0xC11F23eC3A64FBA5C47b3F3d5D2a3B987A7bE4b7'

export const tokenAbi = parseAbi([
  'function balanceOf(address) view returns (uint256)',
  'function mint(address to, uint256 amount)'
])

export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http()
})
