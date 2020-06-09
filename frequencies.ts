const keyMap = new Map(Object.entries({
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.00,
  A4: 440.00,
}))

export function keyToFrequency (key: string): number | undefined {
  return keyMap.get(key)
}
