import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit {
  minutes = 0;
  seconds = 0;
  isRunning = false;
  timer = timer(0, 1000);
  subscription: any;
  lastTime = "00:00"
  clickCounter = 0;

  constructor() { }

  start(): void {
    this.isRunning = !this.isRunning;
    
    if (this.isRunning) {
      this.subscription = this.timer.subscribe(val => {
        this.seconds++;
        if (this.seconds > 59) {
          this.seconds = 0;
          this.minutes++;
        }
      })
    } else {
      this.subscription.unsubscribe();
      this.lastTime = this.getTime();
      this.seconds = 0;
      this.minutes = 0;
    }
  }

  wait(): void {
    this.clickCounter++;
    setTimeout(() => {
      if (this.clickCounter === 2 && this.isRunning) {
        console.log(this.getTime())
        this.isRunning = false;
        this.subscription.unsubscribe();
      }
      this.clickCounter = 0;
    }, 500);
  }

  reset(): void {
    this.seconds = 0;
    this.minutes = 0;
    this.subscription.unsubscribe();
    this.isRunning = false;
    this.start();
  }

  getTime(): string {
    return `${this.minutes < 10 ? "0" + this.minutes : this.minutes}:${this.seconds < 10 ? "0" + this.seconds : this.seconds}`;
  }

  ngOnInit(): void {
  }

}
