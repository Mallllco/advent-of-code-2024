const input = document.getElementsByTagName("pre")[0].innerHTML.split(/\n/g);
input.pop();

let xCount = 0;
let loopCount = 0;

function checkSymbol(symbol, position, mapTemplate) {
  let nextSymbol = "";
  switch (symbol) {
    case "^":
      if (position[0] - 1 >= 0)
        nextSymbol = mapTemplate[position[0] - 1][position[1]];
      break;
    case ">":
      if (position[1] - 1 >= 0)
        nextSymbol = mapTemplate[position[0]][position[1] - 1];
      break;
    case "<":
      if (position[1] + 1 < mapTemplate.length)
        nextSymbol = mapTemplate[position[0]][position[1] + 1];
      break;
    case "v":
      if (position[0] + 1 < mapTemplate.length)
        nextSymbol = mapTemplate[position[0] + 1][position[1]];
      break;
    default:
      break;
  }
  console.log(nextSymbol);
  return nextSymbol;
}

function changeGuard(symbol) {
  let guardSymbol = symbol;
  console.log("guardSymbol " + guardSymbol);
  switch (guardSymbol) {
    case "^":
      guardSymbol = "<";
      break;
    case ">":
      guardSymbol = "^";
      break;
    case "<":
      guardSymbol = "v";
      break;
    case "v":
      guardSymbol = ">";
      break;
    default:
      break;
  }
  console.log("guardSymbol " + guardSymbol);

  return guardSymbol;
}

function moveGuard(symbol, position, mapTemplate) {
  guardPosition = [...position];
  const originalMap = JSON.stringify(mapTemplate);
  let map = JSON.parse(originalMap);
  switch (symbol) {
    case "^":
      [
        map[guardPosition[0]][guardPosition[1]],
        map[guardPosition[0] - 1][guardPosition[1]],
      ] = ["X", symbol];
      guardPosition[0] -= 1;
      break;
    case ">":
      [
        map[guardPosition[0]][guardPosition[1]],
        map[guardPosition[0]][guardPosition[1] - 1],
      ] = ["X", symbol];
      guardPosition[1] -= 1;
      break;
    case "<":
      [
        map[guardPosition[0]][guardPosition[1]],
        map[guardPosition[0]][guardPosition[1] + 1],
      ] = ["X", symbol];
      guardPosition[1] += 1;

      break;
    case "v":
      [
        map[guardPosition[0]][guardPosition[1]],
        map[guardPosition[0] + 1][guardPosition[1]],
      ] = ["X", symbol];
      guardPosition[0] += 1;

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
        checkLoop();
        let returnedMapCopy = "";
        [returnedMapCopy, position] = moveGuard(guardSymbol, position, map);
        map = JSON.parse(returnedMapCopy);
        console.log(position);

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

function checkColumn() {
  includesX = false;
  if (guardSymbol === ">") {
    for (let i = guardPosition[0] + 1; i < map.length; i++) {
      if (!includesX) includesX = map[i][guardPosition[1]] === "X";
    }
  }
  if (guardSymbol === "<") {
    for (let i = guardPosition[0] - 1; i >= 0; i--) {
      if (!includesX) includesX = map[i][guardPosition[1]] === "X";
    }
  }

  return includesX;
}

function checkLoop() {
  const columnX = checkColumn();
  switch (guardSymbol) {
    case "^":
      if (map[guardPosition[0]].includes("X", guardPosition[1] + 1)) {
      }
      break;
    case ">":
      if (columnX) {
      }
      break;
    case "<":
      if (columnX) {
      }
      break;
    case "v":
      if (map[guardPosition[0]].includes("X", guardPosition[1] - 1)) {
      }
      break;
    default:
      break;
  }
}

function tryLoop(symbol, position, mapTemplate) {
  let guardSymbol = symbol;
  let guardPosition = [...position];
  const originalMap = JSON.stringify(mapTemplate);
  let map = JSON.parse(originalMap);
}

function findX() {
  let map = [];
  let guardSymbol = "^";
  let guardPosition = [0, 0];

  input.forEach((line) => {
    map.push(line.split(""));
  });

  guardPosition = [...checkGuard(guardSymbol, map)];
  const returnedMap = guardMovement(guardSymbol, guardPosition, map);
  const returnedMapCopy = JSON.stringify(returnedMap);
  map = JSON.parse(returnedMapCopy);

  map.forEach((line) => {
    xCount += line.filter((item) => item === "X").length;
  });
}

findX();

console.log(xCount);
