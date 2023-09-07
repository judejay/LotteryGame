import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button, Grid, Stack } from '@mui/material';
import { Ticket } from '../Ticket';
import { TicketCard } from '../components/TicketCard';
import { Lottery } from '../Lottery';
import { WinningDraw } from '../components/WinningDraw';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { LotteryDraw } from '../LotteryDraw';

export interface GameProps {
    ticket: Ticket;
    lottery: Lottery;
    reset: () => void;
    setTicket: Dispatch<SetStateAction<Ticket>>;
}

export const Game: React.FC<GameProps> = (props: GameProps) => {
  const [tickets, setTickets] = useState(0);
  const [winnings, setWinnings] = useState(0);
  const [result, setResult] = useState<Lottery>()
  
  // useEffect(() => {
     

  //     setResult( props.lottery.result);
     
  // }, [props.lottery.result]);

  const resetGame = () => {
    props.reset();
    setTickets(0);
  };

  const handleLuckyDip = (ticket: Ticket) => {
    resetGame();
    props.setTicket(ticket);
  };

  function playGame(ticket: Ticket) {
    props.lottery.draw();

    setWinnings(  props.lottery.validateTicket(props.ticket));
    console.log(winnings )
  }
  

  const handlePlayGame = ( ): any => {
    playGame(props.ticket);
  }


  return (
    <Grid container direction="column">
      <Grid item xs lg={3} sx={{ backgroundColor: 'grey.200' }} padding={2}>
        <Stack direction="row" marginY={2} justifyContent="space-between">    
          <Button color="info" variant="contained" onClick={resetGame} endIcon={<RestartAltIcon />}>LuckyDip</Button>
          <Button color="success" variant="contained" onClick={handlePlayGame} endIcon={<PlayArrowIcon />}>Play</Button>
          <Button color="error" variant="contained" onClick={resetGame} endIcon={<RestartAltIcon />}>Reset</Button>
        </Stack>
        <TicketCard ticket={props.ticket} onTicketChange={handleLuckyDip}/>
      </Grid>
      <Grid container item xs lg={9} rowGap={2} padding={2}>
        <Grid container direction="row" gap={2}>
          <Grid direction="column" justifyContent="space-between" container item xs gap={2}>
              <WinningDraw draw={props.lottery.result} ticket={props.ticket} winnings={winnings} />
          </Grid>       
        </Grid>       
      </Grid>
    </Grid>
  );
};

