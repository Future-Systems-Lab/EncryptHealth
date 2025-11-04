// Rights Reserved, Unlicensed
import crypto from 'crypto'

export interface FHIRPatient {
  resourceType: string
  id: string
  name?: { given?: string[]; family?: string }[]
  gender?: string
  birthDate?: string
}

export function parseFHIRPatient(json: any): FHIRPatient | null {
  if (json.resourceType !== 'Patient' || !json.id) return null
  return {
    resourceType: json.resourceType,
    id: json.id,
    name: json.name,
    gender: json.gender,
    birthDate: json.birthDate
  }
}

export function hashIdentifier(id: string): string {
  return crypto.createHash('sha256').update(id).digest('hex')
}

export function verifyFHIRPatient(json: any): { valid: boolean; hash?: string } {
  const patient = parseFHIRPatient(json)
  if (!patient) return { valid: false }
  return { valid: true, hash: hashIdentifier(patient.id) }
}
