// Rights Reserved, Unlicensed
'use client'

import { useState, useEffect } from 'react'
import { useAccount, useConnect, useWalletClient } from 'wagmi'
import { injected } from '@wagmi/connectors'
import { publicClient, tokenAddress, tokenAbi } from '@/lib/contracts/encryptHealthToken'
import { formatEther, parseEther } from 'viem'

export default function Dashboard() {
  const { connectAsync } = useConnect({ connector: injected() })
  const { address } = useAccount()
  const { data: walletClient } = useWalletClient()
  const [userConnected, setUserConnected] = useState(false)
  const [practitionerLogged, setPractitionerLogged] = useState(false)
  const [consent, setConsent] = useState(false)
  const [balance, setBalance] = useState('0')

  async function handleWalletConnect() {
    try {
      await connectAsync({ connector: injected() })
      setUserConnected(true)
    } catch (err) {
      console.error(err)
    }
  }

  async function fetchBalance() {
    if (!address) return
    const result = await publicClient.readContract({
      address: tokenAddress,
      abi: tokenAbi,
      functionName: 'balanceOf',
      args: [address]
    })
    setBalance(formatEther(result))
  }

  async function handleConsentToggle() {
    if (!walletClient || !address) return
    const newConsent = !consent
    setConsent(newConsent)
    if (newConsent) {
      await walletClient.writeContract({
        address: tokenAddress,
        abi: tokenAbi,
        functionName: 'mint',
        args: [address, parseEther('1')]
      })
      await fetchBalance()
    }
  }

  useEffect(() => {
    if (address) fetchBalance()
  }, [address])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-2xl font-bold">EncryptHealth Dashboard</h1>

      {!userConnected && (
        <button onClick={handleWalletConnect} className="px-4 py-2 bg-blue-600 text-white rounded">
          Connect MetaMask
        </button>
      )}

      {userConnected && !practitionerLogged && (
        <button onClick={() => setPractitionerLogged(true)} className="px-4 py-2 bg-green-600 text-white rounded">
          Practitioner Login
        </button>
      )}

      {userConnected && practitionerLogged && (
        <div className="flex flex-col items-center gap-3">
          <p>Consent Status: {consent ? 'Granted' : 'Revoked'}</p>
          <button
            onClick={handleConsentToggle}
            className={`px-4 py-2 rounded ${consent ? 'bg-red-600' : 'bg-blue-600'} text-white`}
          >
            {consent ? 'Revoke Consent' : 'Grant Consent'}
          </button>
          <p className="mt-3">Token Balance: {balance} EHT</p>
        </div>
      )}
    </main>
  )
}
