const input = document.getElementsByTagName("pre")[0].innerHTML.split(/\n\n/);

const instructions = [];
const pageLists = [];

input[0].split(/\n/g).forEach((pair) => {
  instructions.push(pair.split(/\|/));
});

input[1].split(/\n/g).forEach((line) => {
  pageLists.push(line.split(/,/));
});
pageLists.pop();

function isOrdered(list) {
  let inOrder = true;
  list.forEach((value, index) => {
    const relationsForward = [];
    const relationsPrevious = [];
    instructions.forEach((instruction) => {
      if (instruction[0] === value) {
        relationsForward.push(instruction[1]);
      }
      if (instruction[1] === value) {
        relationsPrevious.push(instruction[0]);
      }
    });
    for (let i = index + 1; i < list.length; i++) {
      if (!relationsForward.includes(list[i])) {
        inOrder = false;
      }
    }
    for (let i = index - 1; i >= 0; i--) {
      if (!relationsPrevious.includes(list[i])) {
        inOrder = false;
      }
    }
  });

  return inOrder;
}

function isArrayInArray(item) {
  return instructions.some((ele) => {
    return ele.toString() === item.toString();
  });
}

function orderList(list) {
  return list.sort((a, b) => {
    const indexOfa = list.indexOf(a);
    const indexOfb = list.indexOf(b);
    if (isArrayInArray([a, b])) {
      return indexOfa - indexOfb;
    } else if (isArrayInArray([b, a])) {
      return indexOfb - indexOfa;
    }
  });
}

let middleSum = 0;
let otherMiddleSum = 0;

pageLists.forEach((list) => {
  if (isOrdered(list)) {
    middleSum = middleSum + parseInt(list[Math.round((list.length - 1) / 2)]);
  } else {
    const orderedList = orderList(list);
    otherMiddleSum =
      otherMiddleSum +
      parseInt(orderedList[Math.round((orderedList.length - 1) / 2)]);
  }
});

console.log(middleSum);
console.log(otherMiddleSum);
