import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  title = 'parisSportifs';
  searchTerm: string;

  onRecieveTermToSearch(event) {
      console.log(event);
  }
}
