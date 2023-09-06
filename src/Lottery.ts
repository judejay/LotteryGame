import { Ticket } from './Ticket';
import uniq from 'lodash/uniq';
import intersection from 'lodash/intersection';
import { LotteryDraw } from './LotteryDraw';

export class Lottery {
  //readonly categories = ['2/6', '2/6+B', '3/6', '4/6', '5/6', '5/6+B', '6/6'];
  //readonly payouts = [3, 5, 10, 78, 2199, 110841, 8811827];
 // readonly odds = [8.3, 81.2, 56.7, 1033, 55492, 2330636, 13983816];
 // readonly ticketPrice = 3;

  totalWinnings: number;
  result: LotteryDraw | null;
  //wins: number[];

  constructor () {
    //this.wins = [0, 0, 0, 0, 0, 0];
    this.result = null;
    this.totalWinnings = 0;
  }

  draw () {
    const numbers = Lottery.getRandomNumbers(6);
    this.result = new LotteryDraw([numbers[0], numbers[1], numbers[2], numbers[3], numbers[4], numbers[5]]);
  }

  validateTicket (ticket: Ticket) : number {
    let prize = 0;

    if (this.result) {
      const result = intersection(ticket.numbers, this.result.numbers);

      let prizePool = -1;
      switch (result.length) {
      
        case 3:
          prizePool = 50;
          break;
        case 4:
          prizePool = 100;
          break;
        case 5:
          prizePool =  200;
          break;
        case 6:
          prizePool = 500;
          break;
      }

      if (prizePool > 0) {
        prize = prizePool;
       // this.wins[prizePool]++;
        this.totalWinnings += prize;
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
