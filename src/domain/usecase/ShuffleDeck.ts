import { GameState } from "../entity/GameState";
import { InitialState } from "./InitialState";
import { CardDeck } from "../../data/CardDeck";

export const ShuffleDeck = (): GameState => ({
    ...InitialState,
    CardDeck: CardDeck.getShuffledCardDeck(),
    ShuffledCardDeckCount: 1
});