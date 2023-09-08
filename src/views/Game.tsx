import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button, Grid, Stack } from '@mui/material';
import { Ticket } from '../Ticket';
import { TicketCard } from '../components/TicketCard/TicketCard';
import { Lottery } from '../Lottery';
import { WinningDraw } from '../components/WinningDraw/WinningDraw';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Casino from '@mui/icons-material/Casino'; 

export interface GameProps {
    setPlayed: Dispatch<SetStateAction<boolean>>;
    played: boolean;
    ticket: Ticket;
    lottery: Lottery;
    reset: () => void;
    setTicket: Dispatch<SetStateAction<Ticket>>;
    luckyDip: () => void;
}

export const Game: React.FC<GameProps> = (props: GameProps) => {
  const [winnings, setWinnings] = useState(0);

  const resetGame = () => {
    props.reset();
  };

  const handleLuckyDip = (ticket: Ticket) => {
    resetGame();
    props.setTicket(ticket);
  };

  function playGame(ticket: Ticket) {
    props.lottery.draw();
    setWinnings(  props.lottery.validateTicket(props.ticket));
    props.setPlayed(true);

  }
  

  const handlePlayGame = ( ) => {
    playGame(props.ticket);
  }


  function LuckyDipGame() {
    props.luckyDip() ;
  }

  return (
    <Grid container direction="column">
      <Grid item xs lg={3} sx={{ backgroundColor: 'grey.200' }} padding={2}>
        <Stack direction="row" marginY={2} justifyContent="space-between">    
          <Button color="secondary" variant="contained" onClick={LuckyDipGame} endIcon={<Casino />}>LuckyDip</Button>
          <Button color="success" variant="contained" disabled={props.played} onClick={handlePlayGame} endIcon={<PlayArrowIcon />}>Play</Button>
          <Button color="error" variant="contained" onClick={resetGame} endIcon={<RestartAltIcon />}>Reset</Button>
        </Stack>
        <TicketCard ticket={props.ticket} onTicketChange={handleLuckyDip}/>
      </Grid>
      <Grid container item xs lg={9} rowGap={2} padding={2}>
        <Grid container direction="row" gap={2}>
          <Grid direction="column" justifyContent="space-between" container item xs gap={2}>
              <WinningDraw played={props.played} draw={props.lottery.result} ticket={props.ticket} winnings={winnings} />
          </Grid>       
        </Grid>       
      </Grid>
    </Grid>
  );
};

