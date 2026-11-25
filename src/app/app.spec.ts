import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the program heading', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Aktuális mozi- és színházműsor');
  });

  it('should update the checkout total when a free seat is selected', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const seatButton = Array.from(
      compiled.querySelectorAll<HTMLButtonElement>('app-seat-map button'),
    ).find((button) => button.getAttribute('aria-label')?.startsWith('B1,'));

    expect(seatButton).toBeDefined();
    seatButton?.click();
    fixture.detectChanges();

    const total = compiled.querySelector('[aria-live="polite"]')?.textContent?.replace(/\s/g, '');
    expect(total).toContain('8000Ft');
  });
});
