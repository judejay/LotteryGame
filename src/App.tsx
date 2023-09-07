import { PageLayout } from './components/Layout/PageLayout';
import { Lottery } from './Lottery';
import React, { useState } from 'react';
import { Ticket } from './Ticket';
import { Game } from './views/Game';


export const App: React.FC = () => {
  const [ticket, setTicket] = useState<Ticket>(Ticket.generateRandomTicket());
  const [lottery, setLottery] = useState<Lottery>(new Lottery());
  const [ played, setPlayed ] = useState<boolean>(false)


  const resetGame = () => {
    setTicket(Ticket.generateRandomTicket());
    setLottery(new Lottery());
    setPlayed(false);

  };

  return (
   
      <PageLayout>
        <Game ticket={ticket} setPlayed={setPlayed} played={played} lottery={lottery} reset={resetGame} setTicket={setTicket}/>
      </PageLayout>
  );
};
