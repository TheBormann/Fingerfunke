/* eslint-disable require-jsdoc */
export function dateToJson(date: Date): number {
  return date.getTime();
}

export function dateFromJson(millisecondsSinceEpoch: number): Date {
  return new Date(millisecondsSinceEpoch);
}
