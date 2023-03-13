export class Game {
    public players: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = -1;

    constructor() {
        this.addCards();
        this.shuffleCards();
    }

    addCards() {
        const colors: string[] = ['spades', 'hearts', 'clubs', 'diamonds'];

        for (let color of colors) {
            for (let i = 1; i <= 13; i++) {
                this.stack.push(`${color}_${i}`);
            }
        }
    }

    shuffleCards(cardStack: string[] = this.stack) {
        for (let i = cardStack.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [cardStack[i], cardStack[j]] = [cardStack[j], cardStack[i]];
        }
    }
}