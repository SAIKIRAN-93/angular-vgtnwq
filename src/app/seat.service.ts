import { Injectable } from '@angular/core';

export interface Seat {
  id: number;
  row: number;
  isBooked: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SeatService {
  private TOTAL_SEATS = 80;
  private SEATS_PER_ROW = 7;
  private MAX_RESERVATION = 7;

  private seats: Seat[] = [];

  constructor() {
    this.initializeSeats();
  }

  private initializeSeats() {
    for (let i = 0; i < this.TOTAL_SEATS; i++) {
      this.seats.push({
        id: i + 1,
        row: Math.floor(i / this.SEATS_PER_ROW) + 1,
        isBooked: false,
      });
    }
  }

  getSeats(): Seat[] {
    return this.seats;
  }

  bookSeats(numSeats: number): number[] {
    if (numSeats < 1 || numSeats > this.MAX_RESERVATION) {
      throw new Error(`Can only book between 1 and ${this.MAX_RESERVATION} seats.`);
    }

    const availableSeats = this.seats.filter(seat => !seat.isBooked);
    if (availableSeats.length < numSeats) {
      throw new Error("Not enough seats available.");
    }

    const bookedSeats: number[] = [];

    // Try to book seats in the same row
    for (let row = 1; row <= Math.ceil(this.TOTAL_SEATS / this.SEATS_PER_ROW); row++) {
      const rowSeats = availableSeats.filter(seat => seat.row === row);
      if (rowSeats.length >= numSeats) {
        for (let i = 0; i < numSeats; i++) {
          rowSeats[i].isBooked = true;
          bookedSeats.push(rowSeats[i].id);
        }
        return bookedSeats;
      }
    }

    // If not possible in the same row, book nearby seats
    for (let i = 0; i < numSeats; i++) {
      availableSeats[i].isBooked = true;
      bookedSeats.push(availableSeats[i].id);
    }

    return bookedSeats;
  }
}