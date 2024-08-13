export function getColorForMagnitude(magnitude: number): string {
  // Ensure the magnitude is within the 0-12 range
  const clampedMagnitude = Math.max(0, Math.min(12, magnitude));

  // Normalize the magnitude to a 0-1 range
  const normalizedMagnitude = clampedMagnitude / 12;

  // Define the color components for start (green) and end (red) colors
  const startColor = { r: 0, g: 255, b: 0 };   // Peaceful green
  const endColor = { r: 255, g: 0, b: 0 };     // Doomsday red

  // Interpolate between the start and end colors
  const r = Math.round(startColor.r + normalizedMagnitude * (endColor.r - startColor.r));
  const g = Math.round(startColor.g + normalizedMagnitude * (endColor.g - startColor.g));
  const b = Math.round(startColor.b + normalizedMagnitude * (endColor.b - startColor.b));

  // Return the color as a hex string
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}