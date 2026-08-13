let scores = [0, 100, 40, 60];
let averageScore = sum(scores) / scores.length;
console.log(averageScore);

function average(array) {
  return sum(array) / array.length;
}

function sum(array) {
  let sum_ = 0;
  for (const elem of array) {
    sum_ += elem;
  }
  return sum_;
}
