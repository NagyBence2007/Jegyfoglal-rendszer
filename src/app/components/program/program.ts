import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-program',
  templateUrl: './program.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgramComponent {}
