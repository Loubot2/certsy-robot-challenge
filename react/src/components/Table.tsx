import React from "react";
import  { Robot } from './types'

type TableProps = {
  robot?: Robot
}

const Table = ({robot}: TableProps) => {
  console.log('Hello Table');
  return (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h1 className="display-4">Toy Robot</h1>
        <p className="lead">
          Welcome to toy robot game.
        </p>
        <p>
        {robot? 'robot placed' : 'place a robot to begin'}
        </p>
        
        <hr className="my-4" />
      </div>
    </div>
  </div>
)};

export default Table;