import { Player } from '../player.ts'

const player = new Player()

const file = await Deno.open('audio.bin')

for await (const chunk of Deno.iter(file)) {
  if (Math.random() < 0.5) continue
  await player.write(chunk)
}

file.close()

await player.ffplay.status()
