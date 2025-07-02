import { Card } from "../entity/Card";

export function CalculateScore(hand: Card[]): number{
    let TotalScore = 0;

    hand.forEach((CardInHand) => {
        if(CardInHand.isCardHidden) return;

        if (CardInHand.CardValue === 'A'){
            Aces.push(CardInHand)
        } else if (['K', 'Q', 'J'].includes(CardInHand.CardValue)){
            TotalScore += 10;
        } else {
            TotalScore += Number(CardInHand.CardValue);
        }
    });

    const Aces: Card[] = [];

    Aces.forEach(() =>{
        if (TotalScore + 11 > 21){
            TotalScore += 1;
        } else {
            TotalScore += 11;
        }
    });

    return TotalScore;
}