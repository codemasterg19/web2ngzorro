import { Component } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { registerLocaleData } from '@angular/common';
import { Register, RegistersService } from '../../services/registers/registers.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NzTableModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  registers: Register[] = [];

  constructor( private registerService : RegistersService) { }

  ngOnInit(): void {
    this.getRegisters();
  }
  getRegisters(): void {
    this.registerService.getRegisters().subscribe(rs => this.registers = rs);
  }

}
