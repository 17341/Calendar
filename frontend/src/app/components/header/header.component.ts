import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MyExchangesModalComponent } from '../my-exchanges-modal/my-exchanges-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  admin = false;
  hasteam = false;
  username: any;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private modalService: MdbModalService
  ) {}
  modalRef: MdbModalRef<MyExchangesModalComponent> | null = null;

  ngOnInit(): void {
    this.authService.userByToken().subscribe(
      (data) => {
        if (data) {
          data.role == 'Team Leader' ? (this.admin = true) : false;
          data.company_id != null ? (this.hasteam = true) : false;
          this.username = `${data.first_name} ${data.last_name}`;
        }
      },
      (err) => {
        //console.log(err);
      }
    );
  }

  createClick() {
    this.router.navigateByUrl('/create');
  }
  joinClick() {
    this.router.navigateByUrl('/join');
  }
  navbarClick() {
    //this.router.navigateByUrl('/');
  }

  exchangesClick() {
    this.modalRef = this.modalService.open(MyExchangesModalComponent);
  }

  logoutClick() {
    this.authService.logout().subscribe();
  }
}
