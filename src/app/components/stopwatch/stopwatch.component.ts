import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { buffer, debounceTime, interval, Observable, timer, map, fromEvent, filter } from 'rxjs';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit, AfterViewInit {
  minutes = 0;
  seconds = 0;
  isRunning = false;
  stopwatchTimer = timer(0, 1000);
  subscription: any;
  lastTime = "00:00";
  click$ = new Observable<Event>;

  constructor() {
  }

  ngAfterViewInit(): void {
    this.click$ = fromEvent(document.getElementById("ButtonWait")!, "click")
    this.wait();
  }

  ngOnInit(): void {
  }

  toggleStopwatch(): void {
    this.isRunning = !this.isRunning;
    this.isRunning ? this.start() : this.stop();
  }

  start(): void {
    this.subscription = this.stopwatchTimer.subscribe(() => {
      this.seconds++;
      if (this.seconds > 59) {
        this.seconds = 0;
        this.minutes++;
      }
    })
  }

  stop(): void {
    this.lastTime = this.getTime();
    this.clear();
  }

  wait(): void {
    this.click$.pipe(buffer(this.click$.pipe(debounceTime(500))), filter(list => list.length > 1)).subscribe(() => {
      this.isRunning = false;
      this.subscription.unsubscribe();
    })
  }

  reset(): void {
    this.clear();
    this.isRunning = true;
    this.start();
  }

  clear(): void {
    this.subscription.unsubscribe();
    this.seconds = 0;
    this.minutes = 0;
  }

  getTime(): string {
    const minutes = this.minutes < 10 ? "0" + this.minutes : this.minutes;
    const seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;

    return `${minutes}:${seconds}`;
  }

}
