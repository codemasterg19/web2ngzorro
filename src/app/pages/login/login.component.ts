import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users/users.service';
import { NzIconModule } from 'ng-zorro-antd/icon';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NzFormModule, NzInputModule, NzButtonModule, ReactiveFormsModule,
    NzCheckboxModule,  RouterLink, NzIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  form: FormGroup;

  constructor(private usersService: UsersService,private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],    
  });
  }

  onClickLogin(): void  {
    if(this.form.invalid) return;
    this.usersService.login(this.form.value)
    .then((response)=>{
      console.log(response);
    })
    .catch((error)=>{
      console.log(error);
    })
   }
   onClickLoginGoogle(): void  {
    this.usersService.loginWithGoogle()
    .then((response)=>{
      console.log(response);
    })
    .catch((error)=>{
      console.log(error);
    })
   }





}
