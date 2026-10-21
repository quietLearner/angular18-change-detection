import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal,
  inject,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-new-message',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-message.component.html',
  styleUrl: './new-message.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush, //OnPush tells Angular: “Skip checking NewMessageComponent unless something marks it as needing a check.”
  // So OnPush saves work when activity happens elsewhere. It still allows the component to respond to its own events
})
export class NewMessageComponent {
  // add = output<string>();
  // enteredText = signal('');
  enteredText = '';
  private messagesService = inject(MessagesService);

  get debugOutput() {
    console.log('[NewMessage] "debugOutput" binding re-evaluated.');
    return 'NewMessage Component Debug Output';
  }

  onSubmit() {
    // this.add.emit(this.enteredText());
    // this.messagesService.addMessage(this.enteredText());
    this.messagesService.addMessage(this.enteredText);

    // this.enteredText.set('');
    this.enteredText = '';
  }
}
