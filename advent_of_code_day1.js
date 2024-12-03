const input = document.getElementsByTagName("pre")[0].innerHTML;
let column1Strings = [];
let column2Strings = [];

const stringsArray = input.split(/\r?\n/).forEach((element) => {
  array = element.split("   ");
  if (array[0] !== "") {
    column1Strings.push(array[0]);
    column2Strings.push(array[1]);
  }
});
column1Strings = column1Strings.sort((num1, num2) => num1 - num2);
column2Strings = column2Strings.sort((num1, num2) => num1 - num2);

let sum = 0;
for (let i = 0; i < column1Strings.length; i++) {
  sum = sum + Math.abs(+column1Strings[i] - +column2Strings[i]);
}

console.log(sum);

let sum2 = 0;
column1Strings.forEach((element1) => {
  let appearance = 0;
  column2Strings.forEach((element2) => {
    if (element1 === element2) {
      appearance++;
    }
  });
  sum2 = sum2 + appearance * element1;
});

console.log(sum2);
