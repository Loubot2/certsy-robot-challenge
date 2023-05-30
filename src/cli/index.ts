import promptSync from 'prompt-sync';
import promptSyncHistory from 'prompt-sync-history';
import { Table } from '../core'
import Game from './controller/game'

  // This variable is used to determine if the app should continue prompting the user for input
  let exit = false;
  const history = promptSyncHistory();

  console.log(`Welcome to toy robot type HELP for help`)
  const options =  ["PLACE ", "MOVE", "LEFT", "RIGHT" , "REPORT", "EXIT", "HELP"];
  const cords = ["NORTH", "SOUTH", "EAST", "WEST"];

  const placePrompt = (prefix: string, places: string[]) => {
    return prefix + " " + places.join(',')
  }

  const autocomplete  = (instruction: string): string[] => {
    const instructionsUpper = instruction.toUpperCase();
    if(instructionsUpper.startsWith('PLACE')) {
      //PLACE 0,0,NORTH
      const parts = instructionsUpper.split(' ');
      const prefix = parts[0];
      if(parts.length === 1) {
        return [placePrompt(prefix, [])];
      } else {
        const places = parts[1].split(',')
        if(places.length === 1 && places[0].length > 0) {
          return [placePrompt(prefix, places) +  ","];
        } else if(places.length === 2 && places[1].length > 0) {
          return [placePrompt(prefix, places) + ","];
        } else if(places.length === 3) {
          const facing = places[2];
          const cordsFilter = cords.filter(command => command.startsWith(facing));
          if(cordsFilter.length > 0) {
            return cordsFilter.map(cord => {
              return placePrompt(prefix, [places[0],places[1]]) +  "," + cord
            });
          }
          return cords.map(cord => {
            return placePrompt(prefix, [places[0],places[1]]) +  "," + cord
          });
        }
      }
      return [instructionsUpper];
    } else {
      const optionsFilter = options.filter(command => command.startsWith(instructionsUpper));
      if(optionsFilter.length > 0) {
        return optionsFilter;
      }
    }
    return options;
  }

  const prompt = promptSync({sigint: true, autocomplete,
  history
});
  const table :Table = {
    length: 5,
    width: 5
  }
  const game = new Game(table);
  let instruction;
  let suggested = '';
  while (!exit) {
    // Get user input
    if(!instruction) {
      instruction = prompt('enter command for robot:', suggested);
    };
    const instructionsUpper = instruction?.toUpperCase();

    if (instructionsUpper === 'EXIT') {
      exit = true;
    } else if (instructionsUpper === 'HELP') {
      console.log("> PLACE will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST. \nThe origin (0,0) can be considered to be the SOUTH WEST most corner.\n"
      +"The first valid command to the robot is a PLACE command, after that, any sequence of commands may be issued, in any order, including another PLACE command. The application should discard all commands in the sequence until a valid PLACE command has been executed.\n" +
      "> MOVE will move the toy robot one unit forward in the direction it is currently facing.\n" + 
      "> LEFT and RIGHT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.\n"+ 
      "> REPORT will announce the X,Y and orientation of the robot.A robot that is not on the table can choose to ignore the MOVE, LEFT, RIGHT and REPORT commands.\n"+
      "> EXIT exit this program.\n"+
      "> you can also exit the program using ctrl-c.\n"+
      "  use tab to autocomplete");
      instruction = undefined;
    } else {
      try {
        game.executeInstruction(instructionsUpper);
        history.save();
        instruction = undefined;
      } catch (error) {
        console.error(error, instruction);
        instruction = undefined;
        suggested = instruction;
      }
    }
  }