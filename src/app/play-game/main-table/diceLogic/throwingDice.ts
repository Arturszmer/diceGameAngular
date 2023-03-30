export const rollDice = (throwingDice: number) => {
    const result = [];
    if (throwingDice == 0 || throwingDice == 5){

        for (let i = 0; i < 5; i++){
            let a = Math.floor(Math.random() * 6 + 1);
            result.push(a)
        }
    } else {
        for (let i = 1; i <= 5 - throwingDice; i++){
            let a = Math.floor(Math.random() * 6 + 1);
            result.push(a)
        }
    }
    return result;
  // return [2, 2, 2, 3, 5]
}

