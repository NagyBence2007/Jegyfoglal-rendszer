import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

type SeatStatus = 'available' | 'reserved' | 'sold' | 'blocked';

interface Seat {
  id: string;
  price: number;
  status: SeatStatus;
}

interface SeatRow {
  label: string;
  seats: Seat[];
}

@Component({
  selector: 'app-seat-map',
  templateUrl: './seat-map.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeatMapComponent {
  readonly selectedSeats = input.required<string[]>();
  readonly selectedSeatsChange = output<string[]>();

  protected readonly rows: SeatRow[] = [
    {
      label: 'A sor',
      seats: [
        { id: 'A1', price: 2500, status: 'available' },
        { id: 'A2', price: 2500, status: 'reserved' },
        { id: 'A3', price: 3000, status: 'available' },
        { id: 'A4', price: 2500, status: 'available' },
        { id: 'A5', price: 2500, status: 'sold' },
        { id: 'A6', price: 2500, status: 'available' },
      ],
    },
    {
      label: 'B sor',
      seats: [
        { id: 'B1', price: 2500, status: 'available' },
        { id: 'B2', price: 2500, status: 'available' },
        { id: 'B3', price: 2500, status: 'sold' },
        { id: 'B4', price: 2500, status: 'available' },
        { id: 'B5', price: 2500, status: 'reserved' },
        { id: 'B6', price: 2500, status: 'available' },
      ],
    },
    {
      label: 'C sor',
      seats: [
        { id: 'C1', price: 2000, status: 'available' },
        { id: 'C2', price: 2000, status: 'available' },
        { id: 'C3', price: 2000, status: 'available' },
        { id: 'C4', price: 2000, status: 'sold' },
        { id: 'C5', price: 2000, status: 'available' },
        { id: 'C6', price: 2000, status: 'blocked' },
      ],
    },
  ];

  protected isSelected(seat: Seat): boolean {
    return this.selectedSeats().includes(seat.id);
  }

  protected toggleSeat(seat: Seat): void {
    if (seat.status !== 'available') {
      return;
    }

    const selected = this.selectedSeats();
    const nextSelection = selected.includes(seat.id)
      ? selected.filter((id) => id !== seat.id)
      : [...selected, seat.id];
    this.selectedSeatsChange.emit(nextSelection);
  }

  protected seatClasses(seat: Seat): string {
    const base = 'min-w-0 rounded-lg px-1 py-2 text-center transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]';

    if (this.isSelected(seat)) {
      return `${base} bg-vigado-green text-white ring-2 ring-[#111111]`;
    }

    switch (seat.status) {
      case 'reserved':
        return `${base} cursor-not-allowed border-2 border-vigado-burgundy bg-white text-vigado-burgundy`;
      case 'sold':
        return `${base} cursor-not-allowed bg-vigado-burgundy text-white`;
      case 'blocked':
        return `${base} cursor-not-allowed bg-vigado-gray text-[#111111]`;
      default:
        return `${base} border-2 border-vigado-green bg-white text-vigado-green hover:bg-vigado-green/10`;
    }
  }

  protected seatDescription(seat: Seat): string {
    if (this.isSelected(seat)) {
      return 'kiválasztva';
    }

    switch (seat.status) {
      case 'reserved':
        return 'foglalt';
      case 'sold':
        return 'eladott';
      case 'blocked':
        return 'letiltott';
      default:
        return 'szabad';
    }
  }

  protected formatPrice(price: number): string {
    return `${price.toLocaleString('hu-HU')} Ft`;
  }
}
