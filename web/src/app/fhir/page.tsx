// Rights Reserved, Unlicensed
'use client'

import { useEffect, useState } from 'react'
import { verifyFHIRPatient } from '@/lib/fhirAdapter'

export default function FHIRTest() {
  const [result, setResult] = useState<{ valid: boolean; hash?: string } | null>(null)

  useEffect(() => {
    async function loadAndVerify() {
      const res = await fetch('/patient.json')
      const json = await res.json()
      const output = verifyFHIRPatient(json)
      setResult(output)
    }
    loadAndVerify()
  }, [])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-2xl font-bold">FHIR Mock Adapter</h1>
      {result ? (
        result.valid ? (
          <p className="text-green-600">Valid Patient Resource. Hash: {result.hash}</p>
        ) : (
          <p className="text-red-600">Invalid Resource</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </main>
  )
}
