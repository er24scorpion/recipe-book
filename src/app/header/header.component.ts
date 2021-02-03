import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { DataStorageService } from "../shared/data-storage.service";
import * as fromApp from "../store/app.reducer";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";
import * as AuthActions from "../auth/store/auth.actions";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    // private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    // this.userSub = this.authService.user.subscribe(user => {
    //   this.isAuthenticated = !!user;
    //   console.log(!user);
    //   console.log(!!user);
    // });
    this.userSub = this.store
      .select("auth")
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this.isAuthenticated = !!user;
      });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    // this.authService.logout();
    this.store.dispatch(AuthActions.logout());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
