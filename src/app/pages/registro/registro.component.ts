import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder, EmailValidator, ValidatorFn, AbstractControl } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { RegistersService } from '../../services/registers/registers.service';



@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [NzFormModule, NzInputModule, NzButtonModule, ReactiveFormsModule,
    NzCheckboxModule, NzSelectModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
     private registersService: RegistersService) {
      this.form = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [this.confirmationValidator]],
        nickname: ['', [Validators.required]],
        photoUrl: [''],
        phoneNumber: ['', [Validators.required]],
        role: ['Empleado']
      })
     }
     
     onClickRegister(): void  {
      console.log(this.form.value);
      if (this.form.invalid) return;
      const email = this.form.value.email;
      const password = this.form.value.password;
      this.registersService.createRegister({email, password}, this.form.value)
      .then((response)=>{
        console.log(response);
      })
      .catch((error)=>{console.log(error)});
     }


     updateConfirmValidator(): void {
      /** wait for refresh value */
      Promise.resolve().then(() => this.form.value.confirmPassword.updateValueAndValidity());
    }
  
    confirmationValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
      if (!control.value) {
        return { required: true };
      } else if (control.value !== this.form.value.password.value) {
        return { confirm: true, error: true };
      }
      return {};
    };

}
