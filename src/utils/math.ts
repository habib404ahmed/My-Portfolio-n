/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Linear interpolation
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

/**
 * Map a value from one range to another
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin
}

/**
 * Generate random float in range
 */
export function randomRange(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

/**
 * Format a number with leading zero
 */
export function padZero(n: number): string {
  return n.toString().padStart(2, '0')
}
