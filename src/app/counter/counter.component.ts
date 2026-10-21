import {
  Component,
  NgZone,
  OnInit,
  signal,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';

import { InfoMessageComponent } from '../info-message/info-message.component';

@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
  imports: [InfoMessageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent implements OnInit {
  private zone = inject(NgZone); // opt out zone detection
  count = signal(0);

  get debugOutput() {
    console.log('[Counter] "debugOutput" binding re-evaluated.');
    return 'Counter Component Debug Output';
  }

  ngOnInit() {
    // setTimeout(() => {
    //   this.count.set(0);
    // }, 4000);

    //schedule it outside Angular’s zone, which wont trigger change detection
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        console.log(
          "outside angular's zone, counter timer expires..........................",
        );
      }, 5000);
    });

    // even no ui update, still trigger change detection
    // setTimeout(() => {
    //   console.log('counter timer expires..........................');
    // }, 5000);
  }

  onDecrement() {
    this.count.update((prevCount) => prevCount - 1);
  }

  onIncrement() {
    this.count.update((prevCount) => prevCount + 1);
  }
}
