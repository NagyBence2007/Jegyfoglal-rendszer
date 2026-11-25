import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CashierComponent {}
