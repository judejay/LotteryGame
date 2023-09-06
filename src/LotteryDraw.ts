import { FixedLengthArray } from './types';

export class LotteryDraw {
  numbers: FixedLengthArray<[number, number, number, number, number, number]>;

  constructor (numbers: FixedLengthArray<[number, number, number, number, number, number]>) {
    this.numbers = numbers;
  }
}
