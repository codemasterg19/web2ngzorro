import { Component } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { registerLocaleData } from '@angular/common';
import { Register, RegistersService } from '../../services/registers/registers.service';
import { EmailService } from '../../services/email/email.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NzTableModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  registers: Register[] = [];

  constructor( private registerService : RegistersService, private emailService: EmailService) { }

  ngOnInit(): void {
    this.getRegisters();
  }
  getRegisters(): void {
    this.registerService.getRegisters().subscribe(rs => this.registers = rs);
  }

  sendEmail(register: Register): void {
    this.emailService.sendEmail(
      register.email,
      register.nickname,
      '<b>Este es el contenido del correo</b>',
      'Bienvenido'
    ).subscribe(response => console.log(response));
  }

}
