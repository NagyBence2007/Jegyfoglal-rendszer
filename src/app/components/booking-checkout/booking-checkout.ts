import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-booking-checkout',
  templateUrl: './booking-checkout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingCheckoutComponent {
  readonly selectedSeats = input.required<string[]>();
  protected readonly total = computed(() =>
    this.selectedSeats().reduce((sum, id) => sum + this.priceForSeat(id), 0),
  );

  protected priceForSeat(id: string): number {
    if (id === 'A3') {
      return 3000;
    }

    return id.startsWith('A') || id.startsWith('B') ? 2500 : 2000;
  }

  protected formatPrice(price: number): string {
    return `${price.toLocaleString('hu-HU')} Ft`;
  }
}
