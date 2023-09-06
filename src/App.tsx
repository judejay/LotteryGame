import { PageLayout } from './components/Layout/PageLayout';
import { Lottery } from './Lottery';
import React, { useState } from 'react';
import { Ticket } from './Ticket';
import { Game } from './views/Game';


export const App: React.FC = () => {
  const [ticket, setTicket] = useState<Ticket>(Ticket.generateRandomTicket());
  const [lottery, setLottery] = useState<Lottery>(new Lottery());


  const resetSimulator = () => {
    setTicket(Ticket.generateRandomTicket());
    setLottery(new Lottery());
  };

  return (
   
      <PageLayout>
        <Game ticket={ticket}  lottery={lottery} reset={resetSimulator} setTicket={setTicket}/>
      </PageLayout>
  );
};
