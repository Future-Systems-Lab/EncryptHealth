// Rights Reserved, Unlicensed
'use client'

import { useState } from 'react'
import { useConnect } from 'wagmi'
import { injected } from '@wagmi/connectors'

export default function Dashboard() {
  const { connectAsync } = useConnect({ connector: injected() })
  const [userConnected, setUserConnected] = useState(false)
  const [practitionerLogged, setPractitionerLogged] = useState(false)
  const [consent, setConsent] = useState(false)

  async function handleWalletConnect() {
    try {
      await connectAsync({ connector: injected() })
      setUserConnected(true)
    } catch (err) {
      console.error(err)
    }
  }

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
        <div className="flex flex-col items-center gap-2">
          <p>Consent Status: {consent ? 'Granted' : 'Revoked'}</p>
          <button
            onClick={() => setConsent(!consent)}
            className={`px-4 py-2 rounded ${consent ? 'bg-red-600' : 'bg-blue-600'} text-white`}
          >
            {consent ? 'Revoke Consent' : 'Grant Consent'}
          </button>
        </div>
      )}
    </main>
  )
}
