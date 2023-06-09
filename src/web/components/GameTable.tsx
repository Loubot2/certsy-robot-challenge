import React from 'react'
import { RobotPosition } from '../../core'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import { Table, TableContainer, Paper, TableRow, TableCell, TableBody } from '@mui/material'

interface TableProps {
  robot?: RobotPosition
}

const TableColumn = ({ x, yAxis, key, robot }: { yAxis: number, x: number, key: string, robot?: RobotPosition }) => {
  if (robot?.x === x && robot?.y === yAxis) {
    return <TableCell key={key}><SmartToyIcon></SmartToyIcon></TableCell>
  } else {
    return <TableCell key={key}></TableCell>
  }
}

const TableGameRow = ({ yAxis, columns, key, robot }: { yAxis: number, key: string, columns: number, robot?: RobotPosition }) => {
  const rowKey = `${key}_${yAxis}`
  const columnArry = []
  let i = 0
  for (i; i < columns; i++) columnArry.push(i)
  const itemList = columnArry.map((column: number) => {
    const xAxis = column
    return (<TableColumn key={`${rowKey}_${column}`} yAxis={yAxis} x={xAxis} robot={robot} />)
  })
  return <TableRow key={rowKey} className="board-row"><TableCell>{yAxis}</TableCell>{itemList}</TableRow>
}

const GameTable = ({ robot }: TableProps) => {
  const columns = 5
  const rows = 5
  const rowsArry = []
  let i = 0
  for (i; i < rows; i++) rowsArry.push(i)

  const itemList = rowsArry.map((row: number) => {
    return <TableGameRow key={`${row}`} yAxis={rows - row - 1} columns={columns} robot={robot} />
  }
  )

  const columnArry = []
  let x = 0
  for (x; x < rows; x++) columnArry.push(x)

  const xList = columnArry.map((column: number) => {
    return <TableCell>{column}</TableCell>
  }
  )
  return (
    <TableContainer component={Paper}>
  <Table>
        <TableBody>
    {itemList}
    <TableRow>
    <TableCell></TableCell>{xList}
          </TableRow>
    </TableBody>
  </Table>
  </TableContainer>
  )
}

export default GameTable
