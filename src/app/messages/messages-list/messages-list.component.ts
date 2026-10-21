import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { MessagesService } from '../messages.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe],
})

// When you click Save(in NewMessageComponent), Angular marks NewMessageComponent and its parents for checking. Its sibling, MessagesListComponent, doesn’t automatically get marked. Because the list uses OnPush, Angular can skip it.

// Your previous code passed messages from the parent into the list:
// <app-messages-list [messages]="messages()" />
// Here, [messages] is an input binding. A new array passed through that binding tells Angular to check the list.
// Your current code is:
// <app-messages-list />
// No data is passed through an input. Instead, the list reads from the service.

// changing a plain array in the service doesn’t notify the list. The list needs a notification mechanism, such as a signal read in its template.
export class MessagesListComponent {
  // messages = input.required<string[]>();
  private messagesService = inject(MessagesService);
  messages$ = this.messagesService.messages$;
  // messages = this.messagesService.allMessages;
  // private cdRef = inject(ChangeDetectorRef);
  // private destroyRef = inject(DestroyRef);
  // messages: string[] = [];

  // get messages() {
  //   return this.messagesService.allMessages;
  // }

  // ngOnInit() {
  //   const sub = this.messagesService.messages$.subscribe((messages) => {
  //     this.messages = messages;
  //     this.cdRef.markForCheck();
  //   });
  //   this.destroyRef.onDestroy(() => {
  //     sub.unsubscribe();
  //   });
  // }

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
