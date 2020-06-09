export type Envelope = {
  intensity: (t: number, duration: number) => number,
  release: number
}

export function ADSR (attack: number, decay: number, sustain: number, release: number) {
  return {
    release,
    intensity (t: number, duration: number) {
      const t0 = 0
      const t1 = t0 + attack
      const t2 = t1 + decay
      const t3 = t0 + duration
      const t4 = t3 + release
      let envelope
      if (t <= t1) {
        envelope = (t - t0) / (t1 - t0)
      } else if (t <= t2) {
        envelope = 1 + (sustain - 1) * (t - t1) / (t2 - t1)
      } else if (t <= t3) {
        envelope = sustain
      } else {
        envelope = sustain - sustain * (t - t3) / (t4 - t3)
      }
      return envelope
    }
  }
}
