function reduceToSingleDigit(number) {
  if (number > 9) {
    return reduceToSingleDigit((number - (number % 10)) / 10 + (number % 10));
  } else {
    return number;
  }
}

function canDivideWith10(number) {
  return number % 10 === 0;
}

function toArray(string) {
  return [...string];
}

function sumAllAndDoubleEverySecondElement(array) {
  return array.reduce((acc, item, idx) => {
    if ((idx + 1) % 2 === 0) {
      return acc + reduceToSingleDigit(item * 2);
    } else {
      return acc + item;
    }
  }, 0);
}

function toInt(x) {
  return parseInt(x, 10);
}

function turnToIntegers(arr) {
  return arr.map(toInt);
}

function toJSON(res) {
  return function (valid) {
    return res.json({ valid });
  };
}

export {
  canDivideWith10,
  toArray,
  sumAllAndDoubleEverySecondElement,
  turnToIntegers,
  toJSON,
};
