import Game from './game'
import { Table, Facing } from '../../core'

describe('Game', () => {
  const gameTable: Table = {
    length: 5,
    width: 5
  }
  test('place robot', () => {
    const game =  new Game(gameTable);
    const expectedPosition = {
      x: 0,
      y: 0,
      orientation: Facing.NORTH
    }
      game.executeInstruction('PLACE 0,0,NORTH');
      expect(game.robotPosition).toEqual(expectedPosition);
  });

  test('report robot', () => {
    const logSpy = jest.spyOn(global.console, 'log');
    const game =  new Game(gameTable);
    game.executeInstruction('PLACE 0,0,NORTH');
    game.executeInstruction('REPORT');
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith('0,0,NORTH');
  
    logSpy.mockRestore();
  });
})
