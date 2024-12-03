const input = document.getElementsByTagName("pre")[0].innerHTML;
const regexMul = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g;

const matches = [...input.matchAll(regexMul)];
let sum = 0;
let flagDo = true;
matches.forEach((pair) => {
  if (pair[0] === "don't()") {
    flagDo = false;
  } else if (pair[0] === "do()") {
    flagDo = true;
  }

  if (flagDo && pair[0] !== "do()") {
    sum = pair[1] * pair[2] + sum;
  }
});

console.log(sum);
