import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { DataService } from '../../services/data.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
@Component({
  selector: 'app-my-exchanges-modal',
  templateUrl: './my-exchanges-modal.component.html',
  styleUrls: ['./my-exchanges-modal.component.scss'],
})
export class MyExchangesModalComponent implements OnInit {
  user: any;
  receivedExchanges: any;
  sentExchanges: any;

  constructor(
    private authService: AuthenticationService,
    private dataService: DataService,
    public modalRef: MdbModalRef<MyExchangesModalComponent>
  ) {}

  ngOnInit(): void {
    this.authService.userByToken().subscribe(
      (data) => {
        if (data) {
          this.user = data;
          this.dataService.exchangeList().subscribe(
            (data2) => {
              if (data2) {
                this.receivedExchanges = data2.filter(
                  (exchange: any) =>
                    exchange.to_user_id == data.user_id &&
                    exchange.status == 'Pending'
                );

                this.sentExchanges = data2.filter(
                  (exchange: any) => exchange.from_user_id == data.user_id
                );
              }
            },
            (err) => {
              //console.log(err);
            }
          );
        }
      },
      (err) => {
        //console.log(err);
      }
    );
  }
  declineClick(exchange: any) {
    this.dataService
      .updateExchange({ status: 'Declined' }, exchange.exchange_id)
      .subscribe(
        (data) => {
          alert('Exchange declined');
          this.modalRef.close();
          window.location.reload();
        },
        (err) => {
          //console.log(err);
        }
      );
  }
  acceptClick(exchange: any) {
    console.log(exchange);
    this.dataService
      .updateExchange({ status: 'Accepted' }, exchange.exchange_id)
      .subscribe(
        (data) => {
          this.dataService
            .updateEvent({ user_id: exchange.from_user_id }, exchange.event_id)
            .subscribe(
              (data) => {
                this.receivedExchanges = this.receivedExchanges.filter(
                  (ex: any) => ex.exchange_id !== exchange.exchange_id
                );
                alert('Exchange accepted');
                window.location.reload();
              },
              (err) => {
                //console.log(err);
              }
            );
        },
        (err) => {
          //console.log(err);
        }
      );
  }
  deleteClick(exchange: any) {
    this.dataService.deleteExchange(exchange.exchange_id).subscribe((data) => {
      this.sentExchanges = this.sentExchanges.filter(
        (ex: any) => ex.exchange_id !== exchange.exchange_id
      );
    });
  }
}
