import { Component } from '@angular/core';
import { Game } from '../models/game';
import { Firestore, doc, docData, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.scss']
})
export class GameScreenComponent {
  game!: Game;
  gameId!: Params;
  games$!: Observable<any>;

  constructor(
    private firestore: Firestore,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.game = new Game();
    this.getGameId();
    this.loadGame();
  }

  addNewPlayer(name: string) {
    this.game.addPlayer(name);
    this.saveGame();
  }

  drawCard() {
    if (!this.game.cardAnimation) {
      this.game.setDrawnCard(this.game.drawCard());
      this.game.playedCardNumber = Number(this.game.drawnCard.split('_')[1]) - 1;
      this.game.nextPlayer();
      this.game.cardAnimation = true;
      console.log(this.game.drawnCard, this.game.playedCardNumber)
      this.saveGame();

      setTimeout(() => {
        this.game.setPlayedCard(this.game.drawnCard);
        this.game.cardAnimation = false;
        this.saveGame();
      }, 1800);
    }
  }

  getGameId() {
    this.route.params.subscribe(params => {
      this.gameId = params['id'];
    });
  }

  newGame() {
    this.game = new Game();
    this.saveGame();
  }

  loadGame() {
    const gameRef = doc(this.firestore, `games/${this.gameId}`);
    const gameDB = docData(gameRef);
    gameDB.subscribe(gameData => {
      this.game.cardStack = gameData['cardStack'];
      this.game.playedCard = gameData['playedCard'];
      this.game.playedCardNumber = gameData['playedCardNumber'];
      this.game.player = gameData['player'];
      this.game.currentPlayer = gameData['currentPlayer'];
      this.game.cardAnimation = gameData['cardAnimation'];
      this.game.drawnCard = gameData['drawnCard'];
    })
  }

  saveGame() {
    const gameRef = doc(this.firestore, `games/${this.gameId}`);
    updateDoc(gameRef, this.game.toJSON());
  }
}
