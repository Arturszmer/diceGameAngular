import {Dice} from "../../../model/dice";

export const count = (dices: Dice[]) => {
  let points: number = 0;
  console.log('LICZĘ SOBIE ', dices )

  let multiplesArray = dices.filter((d) => d.isMultiple && d.isChecked);
  console.log(multiplesArray, ' TABLI MULTIPLI')
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
  console.log(points, ' PUNKTÓW')

  return points++;
}

function countMultiples(multiplesArray: Dice[]) {
  if (multiplesArray[0].value != 1){
    return multiplesArray[0].value * 10 * (multiplesArray.length - 2);
  } else {
    return 10 * (multiplesArray.length - 2) * 10;
  }
}
