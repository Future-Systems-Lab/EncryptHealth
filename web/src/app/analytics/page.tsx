// Rights Reserved, Unlicensed
'use client'

import { useState } from 'react'

interface ConsentEvent {
  id: number
  user: string
  action: 'Granted' | 'Revoked'
  tokens: number
  date: string
}

const mockData: ConsentEvent[] = [
  { id: 1, user: '0xA1B2...', action: 'Granted', tokens: 3, date: '2025-10-01' },
  { id: 2, user: '0xC3D4...', action: 'Granted', tokens: 6, date: '2025-10-10' },
  { id: 3, user: '0xE5F6...', action: 'Revoked', tokens: 0, date: '2025-10-20' },
  { id: 4, user: '0xG7H8...', action: 'Granted', tokens: 9, date: '2025-11-01' }
]

export default function AnalyticsPage() {
  const [data] = useState(mockData)
  const totalGranted = data.filter(e => e.action === 'Granted').length
  const totalRevoked = data.filter(e => e.action === 'Revoked').length
  const totalTokens = data.reduce((sum, e) => sum + e.tokens, 0)

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 gap-6">
      <h1 className="text-2xl font-bold">EncryptHealth Analytics</h1>
      <div className="text-center">
        <p>Total Consents Granted: {totalGranted}</p>
        <p>Total Consents Revoked: {totalRevoked}</p>
        <p>Total Tokens Earned: {totalTokens}</p>
      </div>

      <table className="border border-gray-400 mt-4 text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-2 py-1 border">User</th>
            <th className="px-2 py-1 border">Action</th>
            <th className="px-2 py-1 border">Tokens</th>
            <th className="px-2 py-1 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map(e => (
            <tr key={e.id}>
              <td className="px-2 py-1 border">{e.user}</td>
              <td className="px-2 py-1 border">{e.action}</td>
              <td className="px-2 py-1 border">{e.tokens}</td>
              <td className="px-2 py-1 border">{e.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
