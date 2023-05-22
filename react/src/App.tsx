import React from 'react';
import Game from "./components/Game";
import Container from '@mui/material/Container';

const App = () => {
  return (
    <Container>
          <h1 className="display-4">Toy Robot</h1>
              <p className="lead">
          Welcome to toy robot game.
        </p>
      <Game />
    </Container>
  );
}

export default App;
