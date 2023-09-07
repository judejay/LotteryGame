import React from 'react';
import { Alert, Card, CardContent, CardHeader, Divider, Stack, Typography } from '@mui/material';
import { LotteryDraw } from '../../LotteryDraw';
import { WinningDrawNumber } from './WinningDrawNumber';
import { Ticket } from '../../Ticket';
import sortBy from 'lodash/sortBy';

export interface WinningDrawProps {
  
    draw: LotteryDraw | null;
    ticket: Ticket;
    winnings: number;
    played: Boolean;
}

export const WinningDraw: React.FC<WinningDrawProps> = (props: WinningDrawProps) => {
  console.log("props.draw", props.draw)
  return (
    <Card>
        <CardHeader title="Winning draw"></CardHeader>
        <Divider />
        <CardContent>
        {props.played 
          ? (
            <><Stack direction="column" alignItems="center" gap={2} flexWrap="wrap">
              <Stack direction="row" gap={2} alignItems="center">
                {sortBy(props.draw?.numbers).map((number) => (
                  <WinningDrawNumber key={number} number={number} isWinner={props.ticket.numbers.includes(number)} />
                ))}
              </Stack>

            </Stack>
           
              </>
            )
          : (
            <Typography variant='body1'>Play game to draw</Typography>
            )}
            {props.played ? (
              <Stack sx={{ marginTop: '20px' }} alignItems="center" direction="column" gap={2} flexWrap="wrap">
                <><Divider light /><Alert severity="success">Won: £{props.winnings}</Alert></>
                </Stack>
            ):(
              <Stack sx={{ marginTop: '20px' }} alignItems="center" direction="column" gap={2} flexWrap="wrap">
                <><Divider light /><Alert severity="info">No Winnings</Alert></>
                </Stack>
            )
            

            }
        </CardContent>
    </Card>
  );
};
