import { ONE_HOUR, ONE_MINUTE } from '../constants/time';

export function toTimeString(milliseconds: number) {
  const hours = Math.floor(milliseconds / ONE_HOUR);
  const minutes = Math.floor(milliseconds / ONE_MINUTE) - hours * ONE_MINUTE;
  const seconds = milliseconds % 60;

  return { hours: paddingZero(hours, 2), minutes: paddingZero(minutes, 2), seconds: paddingZero(seconds, 2) };
}

export function timeStringToKorean(time: string) {
  const splitedTime = time.split(':');

  if (splitedTime.length === 3) {
    return `${splitedTime[0]}시간 ${splitedTime[1]}분 ${splitedTime[2]}초`;
  }

  return `${splitedTime[0]}분 ${splitedTime[1]}초`;
}

export function paddingZero(value: string | number, length: number): string {
  const stringValue = String(value);
  return stringValue.padStart(length, '0');
}

export function circledNumber(number: number) {
  return `${String.fromCharCode(9311 + number)}`;
}
