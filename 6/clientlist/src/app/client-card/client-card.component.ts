import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Client } from '../domain/client';

@Component({
  selector: 'app-client-card',
  template: `
    <h3>{{ client.name }}</h3>
    <ul>
      <li>Address: {{ client.address }}</li>
      <li>
        <button (click)="delete()">Delete!</button>
      </li>
    </ul>
  `,
  styleUrls: ['./client-card.component.css']
})
export class ClientCardComponent implements OnInit {
  @Input()
  client: Client;

  @Output()
  deleteRequested = new EventEmitter<void>();

  constructor() {
  }

  delete() {
    this.deleteRequested.emit(); // here we simply emit an empty event, but we could also pass data in the event
  }

  ngOnInit() {
  }
}
