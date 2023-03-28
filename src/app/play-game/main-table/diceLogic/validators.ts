import {Dices} from "../../../model/dices";

export const checkMultipleNumbers =(numbers: number[], muiltipleDices: Dices[]) => {
  let diceProperties = muiltipleDices.filter(dices => !dices.isImmutable);

  for (let i = 0; i < diceProperties.length; i++){
    let filter = filterDice(numbers[i], diceProperties);
    if(filter.length >= 3){
      muiltipleDices[i].isMultiple = true;
      muiltipleDices[i].isGoodNumber = true;
    }
  }
}

const filterDice = (value: number, arr: Dices[]) => {
  const newArr: number[] = [];
  for (let v of arr){
    if (value == v.value){
      newArr.push(value)
    }
  }
  return newArr;
}

export const checkGoodNumbers = (numbers: number[], dicesToPush: Dices[]) => {
  for (let i = 0; i < dicesToPush.length; i++){
    if(numbers[i] == 1 || numbers[i] == 5){
      dicesToPush[i].isGoodNumber = true;
    }
  }
}
