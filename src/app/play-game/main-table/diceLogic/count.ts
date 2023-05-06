import {Dice} from "../../../model/dice";

export const count = (dices: Dice[]) => {
  let points: number = 0;

  let multiplesArray = dices.filter((d) => d.isMultiple && d.isChecked);
  if(multiplesArray.length > 0){
    points = countMultiples(multiplesArray);
  }
  let restDices = dices.filter((d) => !d.isMultiple && d.isChecked)
  for (let i = 0; i < restDices.length; i++){
    if (restDices[i].value == 1){
      points += 10;
    } else {
      points += 5;
    }
  }
  return points++;
}

export const countAllGoodNumbers = (dices: Dice[]) => {
  let points: number = 0;

  let multiplesArray = dices.filter((d) => d.isMultiple && !d.isImmutable && !d.isChecked);
  if(multiplesArray.length > 0){
    points = countMultiples(multiplesArray);
  }
  let restDices = dices.filter((d) => !d.isMultiple && !d.isImmutable && !d.isChecked)
  for (let i = 0; i < restDices.length; i++){
    if (restDices[i].value == 1){
      points += 10;
    } else if (restDices[i].value == 5){
      points += 5;
    }
  }
  return points++;
}

function countMultiples(multiplesArray: Dice[]) {
  if (multiplesArray[0].value != 1){
    return multiplesArray[0].value * 10 * (multiplesArray.length - 2);
  } else {
    return 10 * (multiplesArray.length - 2) * 10;
  }
}
