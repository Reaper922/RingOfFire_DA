import { Instruction } from "./instruction";

export class Game {
    cardSuits: string[] = ['spades', 'hearts', 'clubs', 'diamonds'];
    numberOfCardsInSuit: number = 13;
    cardStack: string[] = [];
    playedCard: string = '';
    drawnCard: string = '';
    playedCardNumber: number = -1;
    cardAnimation: boolean = false;
    player: string[] = [];
    currentPlayer: number = -1;
    instructions: Instruction[] = [
        {title: 'Waterfall:', instruction: 'Starting with the player who drew the card, every player has to continually drink their drink. You can only stop when the person to their right has stopped drinking.'},
        {title: 'Pick someone:', instruction: 'You, the player who drew the card picks someone to drink.'},
        {title: 'Treat yourself:', instruction: 'The player who drew the card drinks.'},
        {title: 'All females drink:', instruction: 'All those who identify as female drink.'},
        {title: 'Thumbmaster:', instruction: 'The player who drew the card must put their thumb on the table at a chosen time (before the next five gets picked though, or they lose the right). The last person to put their thumb on the table must drink.'},
        {title: 'All males drink:', instruction: 'All those who identify as male drink.'},
        {title: 'Heaven:', instruction: 'The player who drew the card must point to the sky (at any chosen time before the next 7 is drawn). The last person who points to the sky must drink.'},
        {title: 'Mate:', instruction: 'The player who drew the card picks a drinking mate, who must drink every time they drink.'},
        {title: 'Rhyme:', instruction: 'The player who drew the card says a word, and you go around the circle rhyming with that word until someone messes up, and has to drink.'},
        {title: 'Categories:', instruction: 'The player who drew the card thinks of a category (e.g. dogs, cars, types of alcohol), and you go around the circle naming words in that category until someone messes up, and has to drink.'},
        {title: 'Rule Master:', instruction: 'Make a rule. The player who drew the card makes a new rule (e.g. you can\'t say the word \'yes\' or you can\'t put your drink down) and anyone who breaks the rule at any time throughout the rest of the game has to drink.'},
        {title: 'Question Master:', instruction: 'You become the question master, and if anybody answers a question asked by you (the player who drew the card), they have to drink. This applies to ANY question.'},
        {title: 'King of the Drink:', instruction: 'The player who drew the card must pour some of their drink into the cup in the middle. The person to draw the last King has to drink whatever is in the cup in the middle.'},
    ]

    constructor() {
        this.cardStack = this.createNewCardStack(this.cardSuits, this.numberOfCardsInSuit);
        this.cardStack = this.shuffleCardStack(this.cardStack);
    }

    createNewCardStack(cardSuits: string[], numberOfCards: number): string[] {
        const newCardStack: string[] = [];

        for (let suit of cardSuits) {
            for (let number = 1; number <=  numberOfCards; number++) {
                newCardStack.push(`${suit}_${number}`);
            }
        }

        return newCardStack;
    }

    shuffleCardStack(cardStack: string[]): string[] {
        const shuffledCardStack = [...cardStack];

        for (let i = shuffledCardStack.length - 1; i > 0; i--) {
            const r = Math.floor(Math.random() * (i + 1));
            [shuffledCardStack[i], shuffledCardStack[r]] = [shuffledCardStack[r], shuffledCardStack[i]];
        }

        return shuffledCardStack;
    }

    drawCard(): string {
        return this.cardStack.pop()!;
    }

    setDrawnCard(card: string) {
        this.drawnCard = card; 
    }

    setPlayedCard(card: string) {
        this.playedCard = card; 
    }
 
    addPlayer(name: string) {
        this.player.push(name);
    }

    nextPlayer() {
        this.currentPlayer = (this.currentPlayer + 1) % this.player.length;
    }

    toJSON() {
        return {
            cardStack: this.cardStack,
            playedCard: this.playedCard,
            playedCardNumber: this.playedCardNumber,
            player: this.player,
            currentPlayer: this.currentPlayer,
            cardAnimation: this.cardAnimation,
            drawnCard: this.drawnCard
        }
    }
}