import { BankAccount } from './BankAccount';
import { PageLayout } from './components/Layout/PageLayout';
import { Lottery } from './Lottery';
import React, { useState } from 'react';
import { Ticket } from './Ticket';
import { Game } from './views/Game';
//import { createAppTheme } from 'theme';
//import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

export const App: React.FC = () => {
  const [ticket, setTicket] = useState<Ticket>(Ticket.generateRandomTicket());
  const [bankAccount, setBankAccount] = useState<BankAccount>(new BankAccount());
  const [lottery, setLottery] = useState<Lottery>(new Lottery());

  //const theme = createTheme(createAppTheme('light'));

  const resetSimulator = () => {
    setTicket(Ticket.generateRandomTicket());
    setBankAccount(new BankAccount());
    setLottery(new Lottery());
  };

  return (
   
      <PageLayout>
        <Game ticket={ticket} bankAccount={bankAccount} lottery={lottery} reset={resetSimulator} setTicket={setTicket}/>
      </PageLayout>
  );
};
