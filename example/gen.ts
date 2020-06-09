import { Track } from '../track.ts'
import { Sheet } from '../sheet.ts'
import { Instrument } from '../instrument.ts'
import * as Shape from '../shapes.ts'
import { ADSR } from '../envelope.ts'

const instrument = new Instrument({
  shape: Shape.triangle,
  envelope: ADSR(0.1, 0.1, 0.8, 0.6)
  // envelope : {
  //   intensity (t: number, duration: number) {
  //     const attack = 0.1
  //     const decay = 0.1
  //     const sustain = 0.8
  //     if (t <= attack) {
  //       return t / attack
  //     } else if (t <= duration) {
  //       return 1 + (1 - sustain) * (t - attack) / (duration - attack)
  //     } else {
  //       return (1 + Math.cos(50 * t)) / 2 * sustain * (1 - (t - duration) / this.release)
  //     }
  //   },
  //   release: 1
  // }
})

const sheetFile = './sheets/au_clair_de_la_lune.sheet'
// const sheetFile = './sheets/lol.sheet'
const sheet = Sheet.fromSheetString(instrument, 120, await Deno.readTextFile(sheetFile))

const track: Track = new Track({
  volume: 0.2,
  sheet
})

await track.export('audio.bin')
