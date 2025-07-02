import { Card } from "../entity/Card";
import { CalculateScore } from "./CalculateScore";

export function DealerLogic(DealerHand: Card[], deck: Card[]): { FinalHand: Card[], UpdatedDeck: Card[] }{
    let CurrentHand = [...DealerHand];
    let CurrentDeck = [...deck];
    let DealerScore = CalculateScore(CurrentHand);

    while (DealerScore < 17) {
        const card = CurrentDeck.pop();
        if (card) {
            CurrentHand.push(card);
            DealerScore = CalculateScore(CurrentHand);
        } else {
            break;
        }
    }

    return {
        FinalHand: CurrentHand,
        UpdatedDeck: CurrentDeck,
    };
}