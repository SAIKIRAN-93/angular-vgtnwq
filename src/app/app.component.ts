import { Component } from '@angular/core';
import { SeatService, Seat } from './seat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  seats: Seat[] = [];
  numSeats: number = 1;
  bookedSeats: number[] = [];
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private seatService: SeatService) {
    this.seats = this.seatService.getSeats();
  }

  bookSeats() {
    this.isLoading = true;
    this.errorMessage = '';
    this.bookedSeats = [];

    // Simulate a delay to show loading indicator
    setTimeout(() => {
      try {
        this.bookedSeats = this.seatService.bookSeats(this.numSeats);
      } catch (error) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    }, 1000); // 1 second delay
  }
}