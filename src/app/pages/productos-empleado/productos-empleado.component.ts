import { Component } from '@angular/core';
import { Producto, ProductpostService } from '../../services/productpost/productpost.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productos-empleado',
  standalone: true,
  imports: [NzTableModule, CommonModule],
  templateUrl: './productos-empleado.component.html',
  styleUrl: './productos-empleado.component.css'
})
export class ProductosEmpleadoComponent {
  productos: Producto[] = [];

  constructor(private productpostService: ProductpostService) {} 

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(): void {
    this.productpostService.getProductos()
    .subscribe(productos => this.productos = productos);
  }
}
