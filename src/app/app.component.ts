import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';    
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { UsersService } from './services/users/users.service';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { RegistersService } from './services/registers/registers.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NzAvatarModule, NzFlexModule,  RouterLink, 
  RouterOutlet, NzToolTipModule, NzDropDownModule ,NzIconModule, NzLayoutModule, NzMenuModule, NzBreadCrumbModule
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = false;
  title = 'app-zorro-angular';

  constructor(private usersService: UsersService, public RegistersService: RegistersService){}


  isLogged(): boolean {
    return this.usersService.getCurrentUser() != null;
  } 

  logout(){
    this.usersService.logout();
  }
}
