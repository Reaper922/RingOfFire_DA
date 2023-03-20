import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameScreenComponent } from './game-screen/game-screen.component';
import { StartScreenComponent } from './start-screen/start-screen.component';

const routes: Routes = [
  {path: '', component: StartScreenComponent},
  {path: 'game/:id', component: GameScreenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
