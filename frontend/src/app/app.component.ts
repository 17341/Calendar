import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { SharedServiceService } from './services/shared-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';

  constructor(
    public authService: AuthenticationService,
    private sharedService: SharedServiceService
  ) {}

  ngOnInit(): void {
    this.authService.userByToken().subscribe(
      (data) => {
        if (data) {
          this.sharedService.setUser(data);
        }
      },
      (err) => {
        //console.log(err);
      }
    );
  }
}
