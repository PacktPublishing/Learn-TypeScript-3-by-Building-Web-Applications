import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `    
    <app-client-list></app-client-list>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clientlist';
}
