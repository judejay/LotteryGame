import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button, Grid, Stack } from '@mui/material';
//import { useInterval } from 'hooks/useInterval';
//import { TimePassed } from 'components/TimePassed/TimePassed';
import { Ticket } from '../Ticket';
import { TicketCard } from '../components/TicketCard';
import { BankAccount } from '../BankAccount';
import { Lottery } from '../Lottery';
//import { EarningStats } from 'components/EarningStats';
import { WinningDraw } from '../components/WinningDraw';
import { WinningsTable } from '../components/WinningsTable';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
//import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { TicketPrice } from '../components/TicketPrice';
//import { TicketCounter } from 'components/TicketCounter';
//import { DateCard } from 'components/DateCard';

export interface GameProps {
    ticket: Ticket;
    bankAccount: BankAccount;
    lottery: Lottery;
    reset: () => void;
    setTicket: Dispatch<SetStateAction<Ticket>>;
}

export const Game: React.FC<GameProps> = (props: GameProps) => {
  const [tickets, setTickets] = useState(0);
  //const { start, stop, isRunning } = useInterval({ callBack: () => setTickets(x => x + 1), ms: 1 });

  useEffect(() => {
    if (tickets > 0) {
      props.bankAccount.withdraw(props.lottery.ticketPrice);
      props.lottery.draw();

      const winnings = props.lottery.validateTicket(props.ticket);
      props.bankAccount.deposit(winnings);
    }
  }, [props.bankAccount,props.lottery, props.ticket, tickets]);

  const resetGame = () => {
    //stop();
    props.reset();
    setTickets(0);
  };

  const handleLuckyDip = (ticket: Ticket) => {
    resetGame();
    props.setTicket(ticket);
  };

 // const days = tickets * 7;

  return (
    <Grid container direction="column">
      <Grid item xs lg={3} sx={{ backgroundColor: 'grey.200' }} padding={2}>
        <Stack direction="row" marginY={2} justifyContent="space-between">
    
          <Button color="info" variant="contained" onClick={resetGame} endIcon={<RestartAltIcon />}>Pick Numbers</Button>
          <Button color="secondary" variant="contained" onClick={resetGame} endIcon={<RestartAltIcon />}>Lucky Dip</Button>
          <Button color="success" variant="contained" onClick={resetGame} endIcon={<RestartAltIcon />}>Play</Button>
          <Button color="error" variant="contained" onClick={resetGame} endIcon={<RestartAltIcon />}>Reset</Button>

        </Stack>
        <TicketCard ticket={props.ticket} onTicketChange={handleLuckyDip}/>
      </Grid>
      <Grid container item xs lg={9} rowGap={2} padding={2}>
        <Grid container direction="row" gap={2}>
          <Grid direction="column" justifyContent="space-between" container item xs gap={2}>
              <WinningDraw draw={props.lottery.result} ticket={props.ticket} />
          </Grid>
       
        </Grid>
       
      </Grid>
    </Grid>
  );
};
