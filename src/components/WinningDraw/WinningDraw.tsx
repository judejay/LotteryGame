import React from 'react';
import { Card, CardContent, CardHeader, Divider, Stack, Typography } from '@mui/material';
import { LotteryDraw } from '../../LotteryDraw';
import { WinningDrawNumber } from './WinningDrawNumber';
import { Ticket } from '../../Ticket';
import sortBy from 'lodash/sortBy';

export interface WinningDrawProps {
    draw: LotteryDraw | null;
    ticket: Ticket;
}

export const WinningDraw: React.FC<WinningDrawProps> = (props: WinningDrawProps) => {
  return (
    <Card>
        <CardHeader title="Winning draw" />
        <Divider />
        <CardContent>
        {props.draw
          ? (
            <Stack direction="row" gap={2} flexWrap="wrap">
                <Stack direction="row" gap={2} alignItems="center">
                    {sortBy(props.draw.numbers).map((number) => (
                        <WinningDrawNumber key={number} number={number} isWinner={props.ticket.numbers.includes(number)} />
                    ))}
                </Stack>
            </Stack>
            )
          : (
            <Typography variant='body1'>Play game to draw</Typography>
            )}
        </CardContent>
    </Card>
  );
};
