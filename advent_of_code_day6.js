const input = document.getElementsByTagName("pre")[0].innerHTML.split(/\n/g);
input.pop();

let xCount = 0;
let obstructions = [];
let initialPosition = [];

function printMap(mapTemplate) {
  console.log("Mappa: ");
  mapTemplate.forEach((line) => console.log(line.join("")));
  console.log("\n");
}

function checkSymbol(symbol, position, mapTemplate) {
  let nextSymbol = "";
  switch (symbol) {
    case "^":
      if (position[0] - 1 >= 0)
        nextSymbol = mapTemplate[position[0] - 1][position[1]];
      break;
    case ">":
      if (position[1] + 1 < mapTemplate.length)
        nextSymbol = mapTemplate[position[0]][position[1] + 1];
      break;
    case "<":
      if (position[1] - 1 >= 0)
        nextSymbol = mapTemplate[position[0]][position[1] - 1];
      break;
    case "v":
      if (position[0] + 1 < mapTemplate.length)
        nextSymbol = mapTemplate[position[0] + 1][position[1]];
      break;
    default:
      break;
  }

  return nextSymbol;
}

function changeGuard(symbol) {
  let guardSymbol = symbol;
  switch (guardSymbol) {
    case "^":
      guardSymbol = ">";
      break;
    case ">":
      guardSymbol = "v";
      break;
    case "<":
      guardSymbol = "^";
      break;
    case "v":
      guardSymbol = "<";
      break;
    default:
      break;
  }

  return guardSymbol;
}

function moveGuard(symbol, position, mapTemplate, nextSymbol) {
  guardPosition = [...position];
  const originalMap = JSON.stringify(mapTemplate);
  let map = JSON.parse(originalMap);
  let next = nextSymbol;
  switch (symbol) {
    case "^":
      while (next === "X") {
        [
          map[guardPosition[0]][guardPosition[1]],
          map[guardPosition[0] - 1][guardPosition[1]],
        ] = ["X", symbol];
        guardPosition[0] -= 1;
        next = checkSymbol(symbol, guardPosition, map);
      }
      break;
    case ">":
      while (next === "X") {
        [
          map[guardPosition[0]][guardPosition[1]],
          map[guardPosition[0]][guardPosition[1] + 1],
        ] = ["X", symbol];
        guardPosition[1] += 1;
        next = checkSymbol(symbol, guardPosition, map);
      }
      break;
    case "<":
      while (next === "X") {
        [
          map[guardPosition[0]][guardPosition[1]],
          map[guardPosition[0]][guardPosition[1] - 1],
        ] = ["X", symbol];
        guardPosition[1] -= 1;
        next = checkSymbol(symbol, guardPosition, map);
      }
      break;
    case "v":
      while (next === "X") {
        [
          map[guardPosition[0]][guardPosition[1]],
          map[guardPosition[0] + 1][guardPosition[1]],
        ] = ["X", symbol];
        guardPosition[0] += 1;
        next = checkSymbol(symbol, guardPosition, map);
      }
      break;
    default:
      break;
  }
  return [JSON.stringify(map), [...guardPosition]];
}

function guardMovement(symbol, currentPosition, mapTemplate) {
  let guardSymbol = symbol;
  let isInMap = true;
  const originalMap = JSON.stringify(mapTemplate);
  let map = JSON.parse(originalMap);
  let position = [...currentPosition];

  while (isInMap) {
    const nextSymbol = checkSymbol(guardSymbol, position, map);
    switch (nextSymbol) {
      case "#":
        guardSymbol = changeGuard(guardSymbol);
        break;
      case ".":
      case "X":
        checkLoop(guardSymbol, position, map);
        let returnedMapCopy = "";
        [returnedMapCopy, position] = moveGuard(
          guardSymbol,
          position,
          map,
          nextSymbol
        );
        map = JSON.parse(returnedMapCopy);

        break;
      default:
        map[position[0]][position[1]] = "X";
        isInMap = false;
        break;
    }
  }
  return map;
}

function checkGuard(symbol, mapTemplate) {
  let position = [0, 0];
  mapTemplate.forEach((line, index) => {
    const includes = line.includes(symbol);
    if (includes) [position[0], position[1]] = [index, line.indexOf(symbol)];
  });
  return position;
}

function checkObstructions(symbol, position) {
  let isInArray = false;
  let newObstruction = [];
  switch (symbol) {
    case "^":
      newObstruction.push(position[0] - 1, position[1]);
      break;
    case ">":
      newObstruction.push(position[0], position[1] + 1);
      break;
    case "<":
      newObstruction.push(position[0], position[1] - 1);
      break;
    case "v":
      newObstruction.push(position[0] + 1, position[1]);
      break;
    default:
      break;
  }
  obstructions.forEach((obstruction) => {
    if (
      obstruction[0] === newObstruction[0] &&
      obstruction[1] === newObstruction[1] &&
      newObstruction[0] !== initialPosition[0] &&
      newObstruction[1] !== initialPosition[1]
    ) {
      isInArray = true;
    }
  });
  return isInArray;
}

function checkLoop(symbol, position, mapTemplate) {
  const originalMap = JSON.stringify(mapTemplate);
  let map = JSON.parse(originalMap);
  const isInArray = checkObstructions(symbol, position);
  let loopFound = false;
  if (isInArray) {
    return;
  } else
    switch (symbol) {
      case "^":
        map[position[0] - 1][position[1]] = "O";
        loopFound = tryLoop(symbol, position, map);
        if (loopFound) {
          obstructions.push([position[0] - 1, position[1]]);
          printMap(map);
        }
        break;
      case ">":
        map[position[0]][position[1] + 1] = "O";
        loopFound = tryLoop(symbol, position, map);
        if (loopFound) {
          obstructions.push([position[0], position[1] + 1]);
          printMap(map);
        }
        break;
      case "<":
        map[position[0]][position[1] - 1] = "O";
        loopFound = tryLoop(symbol, position, map);
        if (loopFound) {
          obstructions.push([position[0], position[1] - 1]);
          printMap(map);
        }

        break;
      case "v":
        map[position[0] + 1][position[1]] = "O";
        loopFound = tryLoop(symbol, position, map);
        if (loopFound) {
          obstructions.push([position[0] + 1, position[1]]);
          printMap(map);
        }
        break;
      default:
        break;
    }
}

function lastHitCheck(lastHitPositions, lasthitSymbols, position, symbol) {
  let hitCheck = false;
  lastHitPositions.forEach((hitPosition, index) => {
    if (
      hitPosition[0] === position[0] &&
      hitPosition[1] === position[1] &&
      lasthitSymbols[index] === symbol
    ) {
      hitCheck = true;
    }
  });
  return hitCheck;
}

function tryLoop(symbol, position, mapTemplate) {
  let guardSymbol = symbol;
  let guardPosition = [...position];
  const originalMap = JSON.stringify(mapTemplate);
  let map = JSON.parse(originalMap);
  let isInMap = true;
  let lastHitPositions = [];
  let lasthitSymbols = [];
  let loopFound = false;

  while (isInMap) {
    const nextSymbol = checkSymbol(guardSymbol, guardPosition, map);
    const hitCheck = lastHitCheck(
      lastHitPositions,
      lasthitSymbols,
      guardPosition,
      guardSymbol
    );
    switch (nextSymbol) {
      case "O":
      case "#":
        if (hitCheck) {
          loopFound = true;
          isInMap = false;
        } else {
          lastHitPositions.push(guardPosition);
          lasthitSymbols.push(guardSymbol);
          guardSymbol = changeGuard(guardSymbol);
        }
        break;
      case ".":
      case "X":
        let returnedMapCopy = "";
        [returnedMapCopy, guardPosition] = moveGuard(
          guardSymbol,
          guardPosition,
          map
        );
        map = JSON.parse(returnedMapCopy);

        break;
      default:
        map[position[0]][position[1]] = "X";
        isInMap = false;
        break;
    }
  }
  return loopFound;
}

function findX() {
  let map = [];
  let guardSymbol = "^";
  let guardPosition = [0, 0];

  input.forEach((line) => {
    map.push(line.split(""));
  });

  guardPosition = [...checkGuard(guardSymbol, map)];
  initialPosition = [...guardPosition];

  const returnedMap = guardMovement(guardSymbol, guardPosition, map);
  const returnedMapCopy = JSON.stringify(returnedMap);
  map = JSON.parse(returnedMapCopy);

  map.forEach((line) => {
    xCount += line.filter((item) => item === "X").length;
  });
}

findX();

console.log(xCount);
console.log(obstructions.length);
