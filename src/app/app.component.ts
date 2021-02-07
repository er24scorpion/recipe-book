import { Store } from "@ngrx/store";
import { Component, Inject, OnInit, PLATFORM_ID } from "@angular/core";
import { LoggingService } from "./logging.service";
import * as fromApp from "./store/app.reducer";
import * as AuthActions from "./auth/store/auth.actions";
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<fromApp.AppState>,
    private loggingService: LoggingService,
    @Inject(PLATFORM_ID) private platformId // to check where the app runs (server?)
  ) {}

  ngOnInit() {
    // this.authService.autoLogin();
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(AuthActions.autoLogin());
    }
    this.loggingService.printLog("Hello from AppComponent ngOnInit");
  }
}
