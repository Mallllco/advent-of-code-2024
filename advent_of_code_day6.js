const input = document.getElementsByTagName("pre")[0].innerHTML.split(/\n/g);
input.pop();

let map = [];
let guardSymbol = "^";
let guardPosition = [0, 0];
let guardIsInMap = true;
let xCount = 0;

input.forEach((line) => {
  map.push(line.split(""));
});

function checkSymbol() {
  let nextSymbol = "";
  switch (guardSymbol) {
    case "^":
      if (guardPosition[0] - 1 >= 0)
        nextSymbol = map[guardPosition[0] - 1][guardPosition[1]];
      break;
    case ">":
      if (guardPosition[1] - 1 >= 0)
        nextSymbol = map[guardPosition[0]][guardPosition[1] - 1];
      break;
    case "<":
      if (guardPosition[1] + 1 < map.length)
        nextSymbol = map[guardPosition[0]][guardPosition[1] + 1];
      break;
    case "v":
      if (guardPosition[0] + 1 < map.length)
        nextSymbol = map[guardPosition[0] + 1][guardPosition[1]];
      break;
    default:
      break;
  }
  return nextSymbol;
}

function changeGuard() {
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
}

function moveGuard() {
  switch (guardSymbol) {
    case "^":
      [
        map[guardPosition[0]][guardPosition[1]],
        map[guardPosition[0] - 1][guardPosition[1]],
      ] = ["X", guardSymbol];
      guardPosition[0] -= 1;
      break;
    case ">":
      [
        map[guardPosition[0]][guardPosition[1]],
        map[guardPosition[0]][guardPosition[1] - 1],
      ] = ["X", guardSymbol];
      guardPosition[1] -= 1;
      break;
    case "<":
      [
        map[guardPosition[0]][guardPosition[1]],
        map[guardPosition[0]][guardPosition[1] + 1],
      ] = ["X", guardSymbol];
      guardPosition[1] += 1;

      break;
    case "v":
      [
        map[guardPosition[0]][guardPosition[1]],
        map[guardPosition[0] + 1][guardPosition[1]],
      ] = ["X", guardSymbol];
      guardPosition[0] += 1;

      break;
    default:
      break;
  }
}

function guardMovement() {
  const symbol = checkSymbol();
  switch (symbol) {
    case "#":
      changeGuard();
      break;
    case ".":
    case "X":
      moveGuard();
      break;
    default:
      map[guardPosition[0]][guardPosition[1]] = "X";
      guardIsInMap = false;
      break;
  }
}

function checkGuard() {
  map.forEach((line, index) => {
    const includes = line.includes(guardSymbol);
    if (includes)
      [guardPosition[0], guardPosition[1]] = [index, line.indexOf(guardSymbol)];
  });
}

checkGuard();
while (guardIsInMap) {
  guardMovement();
  map.forEach((line) => console.log(line.join("")));
  console.log("\n");
}

map.forEach((line) => {
  xCount += line.filter((item) => item === "X").length;
});

console.log(xCount);
