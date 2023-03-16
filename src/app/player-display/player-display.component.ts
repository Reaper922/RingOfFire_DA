import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPlayerDialogComponent } from '../add-player-dialog/add-player-dialog.component';

@Component({
  selector: 'app-player-display',
  templateUrl: './player-display.component.html',
  styleUrls: ['./player-display.component.scss']
})
export class PlayerDisplayComponent {
  @Input() players!: string[];
  @Input() currentPlayer!: number;
  @Output() newPlayer = new EventEmitter<string>();

  constructor(private dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPlayerDialogComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name?.length > 0 && name?.length <= 12) {
        this.newPlayer.emit(name);
      }
    });
  }
}
