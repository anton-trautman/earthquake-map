export const normalizeLatLng = (number: number): number => {
  if (number > 180) {
    return number - 360;
  }
  if (number < -180) {
    return number + 360;
  }
  return number;
};
