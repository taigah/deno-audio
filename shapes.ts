export function sine (t: number): number {
  return Math.sin(2 * Math.PI * t)
}

export function square (t: number): number {
  return Math.sign(t % 1 - 0.5)
}

export function triangle (t: number): number {
  return 4 * (Math.abs(t % 1 - 0.5) - 0.25)
}

export function sawtooth (t: number): number {
  return 2 * (t % 1 - 0.5)
}

export function whitenoise (t: number): number {
  return 2 * Math.random() - 1
}
