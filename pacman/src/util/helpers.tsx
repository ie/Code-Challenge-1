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
      case COMMAND_TYPES.LEFT:
      case COMMAND_TYPES.RIGHT:
        //rotate
        if (pacPosition?.direction !== undefined) {
          const newDirection = rotatePac(command[0], pacPosition.direction)
          pacPosition = {...pacPosition, direction: newDirection}
        }
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
    if (['NORTH', 'SOUTH', 'EAST', 'WEST'].includes(direction.toUpperCase())) {
      return DirectionDegrees[direction.toUpperCase()]
    }
    isValidPos = false
    return undefined
  }

  const x = convertStrToNum(command[0])
  const y = convertStrToNum(command[1])
  const direction = convertDirToDegree(command[2])

  return isValidPos ? {xPos: x, yPos: y, direction: direction} as IPacPosition : undefined
}

const rotatePac = (rotationCommand: string, currentDirection: number): number => {
  let newDirection = currentDirection
  if (rotationCommand.toUpperCase() === 'RIGHT') {
      // North is represented by 0 and 360
      if (currentDirection >= 270) {
        newDirection = 0
      } else {
        newDirection += 90
      }
  }
  if (rotationCommand.toUpperCase() === 'LEFT') {
    if (currentDirection === 0) {
      newDirection = 270
    } else {
      newDirection -= 90
    }
}
  return newDirection
}