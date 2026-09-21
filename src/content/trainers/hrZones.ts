export function hrMax(age: number): number {
  return 220 - age
}

export function hrMaxAlt(age: number): number {
  return 208 - 0.7 * age
}

export function karvonenTarget(age: number, restingHr: number, pct: number, useAlt = false): number {
  const max = useAlt ? hrMaxAlt(age) : hrMax(age)
  const reserve = max - restingHr
  return Math.round(reserve * pct + restingHr)
}

export type ZoneDef = {
  zone: 1 | 2 | 3
  pctHrMaxRange: [number, number]
  label: string
  talkTest: string
  fuel: string
  stage: string
}

export const ZONES: ZoneDef[] = [
  { zone: 1, pctHrMaxRange: [0.65, 0.75], label: 'Zone 1 — below VT1', talkTest: 'Can talk comfortably in full sentences', fuel: 'Mostly fat', stage: 'Stage I (all levels)' },
  { zone: 2, pctHrMaxRange: [0.76, 0.85], label: 'Zone 2 — VT1 to VT2', talkTest: 'Talking becomes difficult', fuel: 'Mixed fat + carbohydrate', stage: 'Stage II (intervals)' },
  { zone: 3, pctHrMaxRange: [0.86, 0.95], label: 'Zone 3 — above VT2', talkTest: 'Cannot talk', fuel: 'Mostly carbohydrate', stage: 'Stage III (advanced)' },
]

export function zoneForPct(pct: number): ZoneDef {
  return ZONES.find((z) => pct >= z.pctHrMaxRange[0] && pct <= z.pctHrMaxRange[1]) ?? ZONES[0]
}
