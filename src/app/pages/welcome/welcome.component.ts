import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { PaypalService } from '../../services/paypal/paypal.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [NzFlexModule, CommonModule, NzDividerModule, NzStepsModule, NzMenuModule ],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private paypalService: PaypalService, private route: ActivatedRoute) { }

  ngOnInit() { 
    this.route.queryParams
    .subscribe(params =>{
      console.log(params['paymentId']);
    });
  }

  pay(): void{
    this.paypalService.getAccessToken()
    .subscribe(accessToken =>{
      this.paypalService.createWebProfile(accessToken.access_token, `Pago-${Math.random()}`) // agregar logica aleatorio
      .subscribe(webProfile =>{
        this.paypalService.createPayment(
          accessToken.access_token,
          webProfile.id,
          "http://localhost:4200/welcome",
          "http://localhost:4200/login",

        ).subscribe(payment =>{
          console.log(payment.id);
          window.location.href = payment.links[1].href;
        })
      })
    })
  }

}
