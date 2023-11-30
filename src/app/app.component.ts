import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bookie';

  constructor(private router: Router) {}

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
  ngOnInit():void {this.redirectToLogin()}
}
