import { Ticket } from './Ticket';
import uniq from 'lodash/uniq';
import intersection from 'lodash/intersection';
import { LotteryDraw } from './LotteryDraw';

export class Lottery {
  result: LotteryDraw | null;
  constructor () {
    this.result = null;
  }

  draw (): Boolean {
    const numbers = Lottery.getRandomNumbers(6);
    this.result = new LotteryDraw([numbers[0], numbers[1], numbers[2], numbers[3], numbers[4], numbers[5]]);
    return true
  }

  validateTicket (ticket: Ticket) : number {
    let prize = 0;
    if (this.result) {
      const wins = intersection(ticket.numbers, this.result.numbers);
      switch (wins.length) {              
        case 3:
          prize = 50;
          break;
        case 4:
          prize = 100;
          break;
        case 5:
          prize =  200;
          break;
        case 6:
          prize = 500;
          break;
          default :
          prize = 0;


      }
      
    }

    return prize;
  }

  static isValidNumber (number: number) {
    return number > 0 && number < 60;
  }

  static validateTicket (ticket: Ticket) {
    if (uniq(ticket.numbers).length !== 6) {
      throw new Error('Invalid numbers. Number must be unique');
    }

    ticket.numbers.forEach((value) => {
      if (!Lottery.isValidNumber(value)) {
        throw new Error(`Invalid number. Number ${value} is not valid`);
      }
    });
  }

  static getRandomNumbers (length: number) {
    const numbers: number[] = [];
    while (numbers.length < length) {
      const number = Math.floor(Math.random() * 59) + 1;
      if (numbers.indexOf(number) === -1) {
        numbers.push(number);
      }
    }

    return numbers;
  }
}
