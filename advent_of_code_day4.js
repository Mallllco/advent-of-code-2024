const input = document.getElementsByTagName("pre")[0].innerHTML;
const textMatrix = [];
input.split(/\n/).forEach((element) => {
  if (element !== "") {
    textMatrix.push([element.split("")]);
  }
});

function searchXmas(letters) {
  const text = letters.join("").replace(/\,/g, "");
  const occurrences = [...text.matchAll(/XMAS/g)];
  return occurrences.length;
}

let xmasCount = 0;

// rows & reverse rows
textMatrix.forEach((row) => {
  const reverseRow = [...row[0]].reverse();

  xmasCount = xmasCount + searchXmas(reverseRow) + searchXmas(row);
});

// columns & reverse columns
for (let i = 0; i < textMatrix[0][0].length; i++) {
  let column = [];
  textMatrix.forEach((row) => {
    column.push(row[0][i]);
  });
  const reverseColumn = [...column].reverse();
  xmasCount = xmasCount + searchXmas(column) + searchXmas(reverseColumn);
}

// diagonals
let diagonals = [];
let oppositeDiagonals = [];
for (let i = 0; i < textMatrix.length; i++) {
  let diagonal = [];
  let endDiagonal = [];
  for (let o = i; o >= 0; o--) {
    let p = Math.abs(o - i);
    diagonal.push(textMatrix[p][0][o]);
  }

  for (let o = textMatrix.length - 1; o >= textMatrix.length - i; o--) {
    const delta = Math.abs(textMatrix.length - 1 - o);
    const p = textMatrix.length - i + delta;

    endDiagonal.push(textMatrix[p][0][o]);
  }

  diagonals.push(diagonal);
  if (endDiagonal.length) diagonals.push(endDiagonal);
}
for (let i = 0; i < textMatrix.length; i++) {
  let diagonal = [];
  let endDiagonal = [];

  for (let o = i; o >= 0; o--) {
    const delta = i - o;
    const p = textMatrix.length - 1 - delta;
    diagonal.push(textMatrix[o][0][p]);
  }

  for (let o = textMatrix.length - 1; o >= textMatrix.length - i; o--) {
    const delta = Math.abs(textMatrix.length - o);
    const p = i - delta;

    endDiagonal.push(textMatrix[o][0][p]);
  }

  oppositeDiagonals.push(diagonal);
  if (endDiagonal.length) oppositeDiagonals.push(endDiagonal);
}

diagonals.forEach((diagonal) => {
  const reverseDiagonal = [...diagonal].reverse();
  xmasCount = xmasCount + searchXmas(reverseDiagonal) + searchXmas(diagonal);
});

oppositeDiagonals.forEach((diagonal) => {
  const reverseDiagonal = [...diagonal].reverse();
  xmasCount = xmasCount + searchXmas(reverseDiagonal) + searchXmas(diagonal);
});

console.log("XMAS Count:" + xmasCount);

// part two

function alignMatrix(xIndex, yIndex) {
  const alignedMas = [
    [
      textMatrix[xIndex][0][yIndex],
      textMatrix[xIndex + 1][0][yIndex + 1],
      textMatrix[xIndex + 2][0][yIndex + 2],
    ],
    [
      textMatrix[xIndex][0][yIndex + 2],
      textMatrix[xIndex + 1][0][yIndex + 1],
      textMatrix[xIndex + 2][0][yIndex],
    ],
  ];
  return alignedMas;
}

function searchMas(letters) {
  const text = letters.join("").replace(/\,/g, "");
  return text.includes("MAS") || text.includes("SAM");
}

let masCount = 0;
let alignedMatrixes = [];

for (let i = 0; i < textMatrix.length - 2; i++) {
  for (let o = 0; o < textMatrix.length - 2; o++) {
    alignedMatrixes.push(alignMatrix(i, o));
  }
}

alignedMatrixes.forEach((pair) => {
  if (searchMas(pair[0]) && searchMas(pair[1])) {
    masCount++;
  }
});

console.log(masCount);
