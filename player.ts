import { BufWriter } from 'https://deno.land/std/io/mod.ts'

export class Player implements Deno.Closer, Deno.Writer {
  ffplay: Deno.Process
  bufwriter: BufWriter

  constructor () {
    this.ffplay = Deno.run({
      cmd: ['ffplay', '-showmode', '0', '-f', 'f32le', '-ar', '44100', '-i', '-' ],
      stdin: 'piped',
      stdout: 'null',
      stderr: 'null'
    })
    this.bufwriter = new BufWriter(this.ffplay.stdin!)
  }
  
  close () {
    this.ffplay.close()
  }

  async write (p: Uint8Array) {
    return this.bufwriter.write(p)
  }
}
