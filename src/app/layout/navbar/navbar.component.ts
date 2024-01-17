import {Component, signal} from '@angular/core';
import {TokenService} from "../../shared/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  userType: string = this.tokenService.getRoleFromToken() ?? 'unauthenticated';
  userName: string = this.tokenService.getNameFromToken() ?? '';

  constructor(protected tokenService : TokenService, private router : Router) {
    router.events.subscribe(
      () => {
        this.userType = this.tokenService.getRoleFromToken() ?? 'unauthenticated';
        this.userName = this.tokenService.getNameFromToken() ?? '';
      }
    );
  }


  logOut() {
    this.tokenService.removeToken();
    this.router.navigate(['/login']);
  }
}
