import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Lottery } from '../../Lottery';
import { toCurrency } from '../../helper';

export interface WinningsTableProps {
    lottery: Lottery;
    tickets: number;
}

export const WinningsTable: React.FC<WinningsTableProps> = (props: WinningsTableProps) => {
  return (
        <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Times won</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Prize</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Odds of winning</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Odds</TableCell>
            </TableRow>
          </TableHead>
          
        </Table>
      </TableContainer>
  );
};
