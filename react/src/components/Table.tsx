import React from "react";
import  { RobotPosition } from './types'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import SmartToyIcon from '@mui/icons-material/SmartToy';

type TableProps = {
  robot?: RobotPosition
}


const TableColumn = ({x, y, key, robot}: {y: number, x: number,  key: string, robot?: RobotPosition}) => {
  if(robot?.x === x && robot?.y === y) {
    return <SmartToyIcon></SmartToyIcon>;
  } else {
    return <div key={key}>{x},{y}</div>;
  }
};

const TableRow = ({y, columns, key, robot}: {y: number, key: string, columns: number, robot?: RobotPosition}) => {
  const rowKey = `${key}_${y}`;
  let columnArry = [];
  let i = 0;
  for (i; i < columns; i++)   columnArry.push(i);
  let itemList=columnArry.map((column: number)=> <TableColumn key={`${rowKey}_${column}`} y={y} x={columns - column} robot={robot} />);
  return <Grid key={rowKey} spacing={2}className="board-row">{itemList}</Grid>;
};

const Table = ({robot}: TableProps) => {
  const columns = 5;
  const rows = 5;
  console.log('Hello Table');
  let rowsArry = [];
  let i = 0;
  for (i; i < rows; i++) rowsArry.push(i);

  let itemList=rowsArry.map((row: number)=> {
    return <TableRow  key={`${row}`} y={rows - row} columns={columns} robot={robot} />
  }
  );
  return (
  <Container>
    {itemList}
  </Container>
)};

export default Table;