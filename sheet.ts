import { Instrument } from './instrument.ts'
import { keyToFrequency } from './frequencies.ts'

export interface Note {
  frequency: number,
  start: number,
  duration: number
}

export interface SheetOptions {
  instrument: Instrument,
  notes: Note[]
}

export class Sheet {
  instrument: Instrument
  notes: Note[]

  constructor (options: SheetOptions) {
    this.instrument = options.instrument
    this.notes = options.notes
  }

  intensity (t: number): number {
    const notes = this.notes.filter(note => {
      return note.start <= t && t < note.start + note.duration + this.instrument.envelope.release
    })
    return notes.map(note => {
      return this.instrument.intensity(t, note)
    }).reduce((acc, v) => acc + v, 0)
  }

  duration (): number {
    return Math.max(0, ...this.notes.map(note => note.start + note.duration + this.instrument.envelope.release))
  }

  static fromSheetString (instrument: Instrument, bpm: number, sheet: string) {
    const bps = bpm / 60

    const tempi = sheet.split('\n')

    const options: SheetOptions = {
      instrument,
      notes: [] as Note[]
    }

    for (let beat = 0; beat < tempi.length; ++beat) {
      const tempo = tempi[beat]
      const start = beat / bps
      const notes = tempo.split(';').filter(part => part !== '').map(noteString => {
        noteString = noteString.trim()
        const [ frequencyString, durationString ] = noteString.split(' ')
        const frequency = keyToFrequency(frequencyString) ?? parseFloat(frequencyString)
        const duration = parseFloat(durationString)
        return { start, frequency, duration: duration / bps } as Note
      })

      for (const note of notes) {
        options.notes.push(note)
      }
    }
    
    return new Sheet(options)
  }
}
