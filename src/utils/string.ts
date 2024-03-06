import { ONE_HOUR, ONE_MINUTE } from '.';

export function toTimeString(milliseconds: number) {
  const hours = Math.floor(milliseconds / ONE_HOUR);
  const minutes = Math.floor(milliseconds / ONE_MINUTE) - hours * ONE_MINUTE;
  const seconds = milliseconds % 60;

  return { hours: paddingZero(hours, 2), minutes: paddingZero(minutes, 2), seconds: paddingZero(seconds, 2) };
}

export function paddingZero(value: string | number, length: number): string {
  const stringValue = String(value);
  return stringValue.padStart(length, '0');
}
