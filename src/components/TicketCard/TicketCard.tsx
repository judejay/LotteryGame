import React from 'react';
import { Button, Card, CardContent, CardHeader, Divider, Stack } from '@mui/material';
import { Ticket } from '../../Ticket';
import { TicketCardNumber } from './TicketCardNumber';
import EditIcon from '@mui/icons-material/Edit';
import { PickTicketDialog } from './PickTicketDialog';
import { FixedLengthArray } from './../../types';

export interface TicketCardProps {
    ticket: Ticket;
    onTicketChange: (ticket: Ticket) => void;
}

export const TicketCard: React.FC<TicketCardProps> = (props: TicketCardProps) => {
const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleSave = (numbers: FixedLengthArray<[number, number, number, number, number, number]>) => {
    props.onTicketChange(new Ticket(numbers));
  };

  return (
        <Card>
            <CardHeader
            title="Your numbers"
            action={
              
          <Button color="info" variant="contained" onClick={handleClickOpen} endIcon={<EditIcon />}>Pick Numbers</Button>
            }
            />
            <Divider />
            <CardContent>
                <Stack direction="row" gap={2} justifyContent="space-around">
                    {props.ticket.numbers.map((number) => (
                        <TicketCardNumber key={number} number={number} />
                    ))}
                </Stack>
            </CardContent>
            <PickTicketDialog open={openDialog} onClose={handleClose} save={handleSave} />
        </Card>
  );
};
