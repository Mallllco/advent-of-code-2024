const input = document.getElementsByTagName("pre")[0].innerHTML;
let the_list = [];
let safe_count = 0;

input.split(/\r?\n/).forEach((e) => {
  if (e !== "") {
    const cleanRows = e.split(" ");
    let intRows = [];
    cleanRows.forEach((element) => intRows.push(parseInt(element)));

    the_list.push(intRows);
  }
});

function rowChecker(row) {
  let last_value = 0;
  let last_tendency = "";
  let row_valid = "";
  row.forEach((value) => {
    let current_tendency = "";
    if (row_valid !== "unsafe") {
      if (last_value !== 0) {
        if (
          value > last_value &&
          value - last_value <= 3 &&
          value - last_value >= 1
        ) {
          current_tendency = ">";
          last_value = value;
        } else if (
          value < last_value &&
          last_value - value <= 3 &&
          last_value - value >= 1
        ) {
          current_tendency = "<";
          last_value = value;
        } else {
          row_valid = "unsafe";
        }
      } else {
        last_value = value;
      }

      if (last_tendency !== "") {
        if (last_tendency === current_tendency) {
          row_valid = "safe";
          last_tendency = current_tendency;
        } else {
          row_valid = "unsafe";
        }
      } else {
        last_tendency = current_tendency;
      }
    }
  });

  return row_valid;
}

the_list.forEach((row) => {
  let isSafe = false;

  for (let i = 0; i < row.length; i++) {
    if (!isSafe) {
      let rowCopy = Array.of(...row);
      console.log(rowCopy);
      rowCopy.splice(i, 1);
      if (rowChecker(rowCopy) === "safe") {
        isSafe = true;
      }
    }
  }

  if (isSafe) {
    safe_count++;
  }
});

console.log(safe_count);
