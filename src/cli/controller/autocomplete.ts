const options = ['PLACE ', 'MOVE', 'LEFT', 'RIGHT', 'REPORT', 'EXIT', 'HELP']
const cords = ['NORTH', 'SOUTH', 'EAST', 'WEST']

const placePrompt = (prefix: string, places: string[]) => {
  return prefix + ' ' + places.join(',')
}

const autocomplete = (instruction: string): string[] => {
  const instructionsUpper = instruction.toUpperCase()
  if (instructionsUpper.startsWith('PLACE')) {
    // PLACE 0,0,NORTH
    const parts = instructionsUpper.split(' ')
    const prefix = parts[0]
    if (parts.length === 1) {
      return [placePrompt(prefix, [])]
    } else {
      const places = parts[1].split(',')
      if (places.length === 1 && places[0].length > 0) {
        return [placePrompt(prefix, places) + ',']
      } else if (places.length === 2 && places[1].length > 0) {
        return [placePrompt(prefix, places) + ',']
      } else if (places.length === 3) {
        const facing = places[2]
        const cordsFilter = cords.filter(command => command.startsWith(facing))
        if (cordsFilter.length > 0) {
          return cordsFilter.map(cord => {
            return placePrompt(prefix, [places[0], places[1]]) + ',' + cord
          })
        }
        return cords.map(cord => {
          return placePrompt(prefix, [places[0], places[1]]) + ',' + cord
        })
      }
    }
    return [instructionsUpper]
  } else {
    const optionsFilter = options.filter(command => command.startsWith(instructionsUpper))
    if (optionsFilter.length > 0) {
      return optionsFilter
    }
  }
  return options
}

export default autocomplete
