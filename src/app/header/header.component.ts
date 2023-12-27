import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../authentication/auth.service';
import { RecipeService } from '../recipes/recipe.service';
import { HttpRequestService } from '../shared/httpRequest.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth = false;
  userSub: Subscription;
  constructor(
    private httpService: HttpRequestService,
    private recipeService: RecipeService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>,
    private router:Router
  ) {}
  ngOnInit(): void {
    this.userSub = this.store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this.isAuth = !!user;
      });
  }
  saveOnServer() {
    // console.log(this.recipeService.getRecipes());
    this.httpService.postData();
  }
  onFetchData() {
    this.httpService.fetchData().subscribe();
  }
  onLogout() {
    this.authService.logout();
    this.router.navigate(['auth'])
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
