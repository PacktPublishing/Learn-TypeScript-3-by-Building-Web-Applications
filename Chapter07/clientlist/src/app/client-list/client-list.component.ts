import { Component, OnInit } from '@angular/core';
import { Client } from '../domain/client';

@Component({
  selector: 'app-client-list',
  template: `
    <h2>Client list</h2>

    <app-client-card *ngFor="let client of clients"
                     [client]="client"
                     (deleteRequested)="onDeleteRequested()">
    </app-client-card>
  `,
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  public clients = [
    new Client('1', 'foo', 'fooAddress'),
    new Client('2', 'bar', 'barAddress')
  ];

  constructor() {
  }

  onDeleteRequested() {
    alert('A delete has been requested!');
  }

  ngOnInit() {
  }

}
