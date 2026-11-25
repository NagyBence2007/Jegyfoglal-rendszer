import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AdminComponent } from './components/admin/admin';
import { BookingCheckoutComponent } from './components/booking-checkout/booking-checkout';
import { CashierComponent } from './components/cashier/cashier';
import { NavbarComponent } from './components/navbar/navbar';
import { ProgramComponent } from './components/program/program';
import { SeatMapComponent } from './components/seat-map/seat-map';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    ProgramComponent,
    SeatMapComponent,
    BookingCheckoutComponent,
    CashierComponent,
    AdminComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly selectedSeats = signal(['A3', 'A4']);
}
