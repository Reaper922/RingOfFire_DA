import { Component, Input } from '@angular/core';
import { Instruction } from '../models/instruction';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent {
  @Input() instructions!: Instruction[];
  @Input() cardNumber!: number;
}
