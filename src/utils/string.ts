import { ONE_HOUR, ONE_MINUTE } from '.';

export function toTimeString(milliseconds: number): string {
  const hours = Math.floor(milliseconds / ONE_HOUR);
  const minutes = Math.floor(milliseconds / ONE_MINUTE) - hours * ONE_MINUTE;
  const seconds = milliseconds % 60;

  if (hours) {
    return `${paddingZero(hours, 2)}:${paddingZero(minutes, 2)}:${paddingZero(seconds, 2)}`;
  }
  return `${paddingZero(minutes, 2)}:${paddingZero(seconds, 2)}`;
}

export function paddingZero(value: string | number, length: number): string {
  const stringValue = String(value);
  return stringValue.padStart(length, '0');
}
