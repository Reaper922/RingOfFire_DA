import { Component } from '@angular/core';
import { Game } from '../models/game';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.scss']
})
export class GameScreenComponent {
  cardAnimation: boolean = false;
  drawnCard: string = '';
  playedCardNumber: number = -1;
  game: Game;

  constructor() {
    this.game = new Game();
  }

  drawCard() {
    if (!this.cardAnimation) {
      this.drawnCard = this.game.drawCard();
      this.playedCardNumber = Number(this.drawnCard.split('_')[1]) - 1;
      this.game.nextPlayer()

      this.cardAnimation = true;

      setTimeout(() => {
        this.game.setDrawnCard(this.drawnCard);
      }, 1980)
      setTimeout(() => {
        this.cardAnimation = false;
      }, 2000)
    }
  }

  newGame() {
    this.game = new Game();
    this.drawnCard = '';
    this.playedCardNumber = -1;
  }
}
