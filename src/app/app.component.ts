import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './authentication/auth.service';
import * as AuthActions from './authentication/store/auth.actions';
import { AppState } from './store/app.reducer';



export interface UserType {
  email: string;
  userId: string;
  tokenId: string;
  expiresDate: Date;
}



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private store: Store<AppState>) { }
  ngOnInit(): void {
    this.authService.autoLogin();
    const localStorageData: UserType = JSON.parse(localStorage.getItem("userData"));
    console.log(localStorageData);

    if (localStorageData) {
      this.store.dispatch(new AuthActions.AuthSuccess(localStorageData))
    }
  }
}
