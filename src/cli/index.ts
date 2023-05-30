import promptSync from 'prompt-sync'
import promptSyncHistory from 'prompt-sync-history'
import { type Table } from '../core'
import Game from './controller/game'
import autocomplete from './controller/autocomplete'
import help from './controller/help'

// This variable is used to determine if the app should continue prompting the user for input
let exit = false
// will log history to .prompt_hist.txt
const history = promptSyncHistory()

console.log('Welcome to toy robot type HELP for help')

const prompt = promptSync({
  sigint: true,
  autocomplete,
  history
})
const table: Table = {
  length: 5,
  width: 5
}
const game = new Game(table)
let instruction
let suggested = ''
while (!exit) {
  // Get user input
  if (!instruction) {
    instruction = prompt('Enter command for robot:', suggested)
  };
  const instructionsUpper = instruction?.toUpperCase()

  if (instructionsUpper === 'EXIT') {
    exit = true
  } else if (instructionsUpper === 'HELP') {
    help()
    instruction = undefined
  } else {
    try {
      game.executeInstruction(instructionsUpper)
      history.save()
      instruction = undefined
    } catch (error) {
      console.error(error, instruction)
      instruction = undefined
      suggested = instruction
    }
  }
}
