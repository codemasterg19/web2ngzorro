import { Component } from '@angular/core';
import { Producto, ProductpostService } from '../../services/productpost/productpost.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'app-productos-empleado',
  standalone: true,
  imports: [NzTableModule, CommonModule, NzPaginationModule],
  templateUrl: './productos-empleado.component.html',
  styleUrl: './productos-empleado.component.css'
})
export class ProductosEmpleadoComponent {
  productos: Producto[] = [];
  paginatedData: Producto[] = [];  // Datos paginados
  currentPage = 1;  // Página actual
  pageSize = 3;  // Tamaño de la página

  constructor(private productpostService: ProductpostService) {} 

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos():void{
    this.productpostService.getProductos()
    .subscribe(productos =>{ 
      this.productos = productos;
      this.updatePaginatedData();}
      
    );
  }

  updatePaginatedData(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = this.productos.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaginatedData();
  }
}
