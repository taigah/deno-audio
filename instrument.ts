import { Note } from './sheet.ts'
import { Envelope, ADSR } from './envelope.ts'

type Shape = (t: number) => number

interface InstrumentOptions {
  shape: Shape
  envelope?: Envelope
}

export class Instrument {
  shape: Shape
  envelope: Envelope
  

  constructor (options: InstrumentOptions) {
    this.shape = options.shape
    this.envelope = options.envelope ?? ADSR(0, 0, 1, 0)
  }

  intensity (t: number, note: Note): number {
    const t0 = t - note.start
    const duration = note.duration
    const envelopeIntensity = this.envelope.intensity(t0, duration) 
    return envelopeIntensity * this.shape(note.frequency * t)
  }
}
