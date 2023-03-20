import { Component } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from '../models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {
  constructor(
    private firestore: Firestore,
    private router: Router) {}

  startNewGame() {
    const game = new Game();
    const coll = collection(this.firestore, 'games');
    addDoc(coll, game.toJSON()).then(gameRef => {
      this.router.navigateByUrl(`/game/${gameRef.id}`);
    });
  }
}
