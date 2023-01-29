/**
  * fetches commands txt file, splits it by line and returns an array of commands
  * @return {any} Array of commands
  */
export const retrieveCommands = async (): Promise<string[][]> => {
    return fetch('commands.txt')
    .then((r) => r.text())
    .then(text  => {
      const commands:string[][] = text.split('\n').filter((line) => line.length).map((line) => line.split(' '))
      return commands
    })
}

interface IPacPosition {
  xPos: number;
  yPos: number;
  direction: number;
}

enum COMMAND_TYPES {
  PLACE = 'PLACE',
  MOVE = 'MOVE',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT', 
  REPORT = 'REPORT'
}

const getKeyByValue = (object: { [x: string]: number; }, value: number) => {
  return Object.keys(object).find(key => object[key] === value);
}

/**
  * breaks down and executes commands line by line
  * @param {string[][]} commands The array of string array commands
  */
export const executeCommands = (commands: string[][]) => {
  let pacPosition:IPacPosition | undefined
  let hasPacMoved = false

  for (const command of commands) {
    if (!hasPacMoved && command[0].toUpperCase() !== COMMAND_TYPES.PLACE) {
      continue;
    }
    switch(command[0].toUpperCase()) {
      case COMMAND_TYPES.PLACE:
          //place util
          if (command.length > 1) {
            const placePosition = command[1].split(',')
            if (placePosition.length === 3) {
              pacPosition = placePac(placePosition)
              if (pacPosition) {
                hasPacMoved = true
              }
            }
          }
        break;
      case COMMAND_TYPES.MOVE:
        //move util
        break;
      case COMMAND_TYPES.LEFT || COMMAND_TYPES.RIGHT:
        //rotate
        break;
      case COMMAND_TYPES.REPORT:
        if (pacPosition !== undefined) {
          alert(`${pacPosition.xPos},${pacPosition.yPos},${getKeyByValue(DirectionDegrees, pacPosition.direction)}`)
        }
    }
  }
}

const DirectionDegrees: Record<string, number> = {
  "NORTH": 0,
  "EAST": 90,
  "SOUTH": 180,
  "WEST": 270
}

/**
  * breaks down and executes commands line by line
  * @param {string[][]} commands The array of string array commands
  */
const placePac = (command: string[]): IPacPosition | undefined => {
  let isValidPos = true

  const convertStrToNum = (pos: string): number | undefined => {
    if (/^\d+$/.test(pos)) {
      const num = Number(pos)
      if (Number.isInteger(num) && num >= 0 && num <= 5) {
        return num
      }
    } 
    isValidPos = false
    return undefined
  }

  const convertDirToDegree = (direction: string): number | undefined => {
    if (['NORTH', 'SOUTH', 'EAST', 'WEST'].includes(command[2])) {
      return DirectionDegrees[command[2].toUpperCase()]
    }
    isValidPos = false
    return undefined
  }

  const x = convertStrToNum(command[0])
  const y = convertStrToNum(command[1])
  const direction = convertDirToDegree(command[2])

  return isValidPos ? {xPos: x, yPos: y, direction: direction} as IPacPosition : undefined
}