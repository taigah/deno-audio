import { Sheet } from './sheet.ts'

export interface TrackOptions {
  sampleRate?: number
  volume?: number,
  sheet: Sheet
}

export class Track {
  sampleRate: number
  volume: number
  sheet: Sheet

  constructor(options: TrackOptions) {
    this.sampleRate = options.sampleRate ?? 44100
    this.volume = options.volume ?? 1
    this.sheet = options.sheet
  }

  intensity (t: number): number {
    return this.sheet.intensity(t)
  }

  async export (file: string) {
    const sampleRate = this.sampleRate
    const volume = this.volume
    const duration = this.sheet.duration()
    const track = new Float32Array(duration * this.sampleRate)

    const dt = 1 / sampleRate
    for (let t = 0; t < duration; t += dt) {
      const i = Math.floor(t / dt)
      track[i] = volume * this.intensity(t)
    }

    await Deno.writeFile(file, new Uint8Array(track.buffer))
  }
}
