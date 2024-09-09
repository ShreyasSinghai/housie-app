import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'housie-app';
  numbers: number[] = [];
  usedNumbers: number[] = [];
  rows: number[][] = [];
  randomNumber: number | string = 'Not generated yet';
  isRandomizing: boolean = false;
  highlightedNumber: number | null = null;
  highlightedNumbers: Set<number> = new Set();
  isButtonDisabled: boolean = false;
  prizeForm = new FormGroup({
    firstLine: new FormControl(false),
    secondLine: new FormControl(false),
    thirdLine: new FormControl(false),
    corners: new FormControl(false),
    firstFullHouse: new FormControl(false),
    secondFullHouse: new FormControl(false),
    thirdFullHouse: new FormControl(false),
  });

  ngOnInit() {
    this.generateNumbers();
    this.createRows();
  }

  generateNumbers() {
    for (let i = 1; i <= 90; i++) {
      this.numbers.push(i);
    }
  }

  createRows() {
    for (let i = 0; i < this.numbers.length; i += 10) {
      this.rows.push(this.numbers.slice(i, i + 10));
    }
  }

  generateRandomNumber() {
    this.isButtonDisabled = true;
    const availableNumbers = this.numbers.filter(
      (num) => !this.usedNumbers.includes(num)
    );

    if (availableNumbers.length > 0) {
      this.isRandomizing = true;
      const randomizingInterval = setInterval(() => {
        this.randomNumber = Math.floor(Math.random() * 90) + 1;
      }, 100);

      setTimeout(() => {
        clearInterval(randomizingInterval);
        const randomIndex = Math.floor(Math.random() * availableNumbers.length);
        this.randomNumber = availableNumbers[randomIndex];
        this.highlightedNumbers.add(this.randomNumber);
        this.usedNumbers.push(this.randomNumber);
        this.isRandomizing = false;
        this.isButtonDisabled = false;
      }, 2000);
    } else {
      this.randomNumber = 'All numbers used!';
      this.isButtonDisabled = false;
    }
  }
}
