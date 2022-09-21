//Given two series:
//y0 = 1/x * 99
//y1=x^1.25
//
//please calculate the following 3 floating point numbers, for each integer value of x from 1 to 99
//1. values of y0 and y1
//2. Product of y0 * y1
//3. the running total sum of y0*y1 (the product from step 2) at each value of x

function calculate(exponent = 1.25) {
  //returns a json array of 99 elements where each element is an object of the form {x, y0, y1, y0y1, sumy0y1}
  let result = [],
    sum = 0;
  for (let x = 1; x <= 99; x++) {
    let y0 = (1 / x) * 99;
    let y1 = x ** exponent;
    let y0y1 = y0 * y1;
    sum += y0y1;
    let profit = y0y1 - sum;
    result.push({ x, y0, y1, y0y1, sumy0y1: sum, profit });
  }
  return result;
}

console.log(JSON.stringify(calculate(), null, 2));
