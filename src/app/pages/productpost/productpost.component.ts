import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ProductpostService, Producto} from '../../services/productpost/productpost.service';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'app-productpost',
  standalone: true,
  imports: [NzFormModule, NzInputModule, NzButtonModule, ReactiveFormsModule,
    NzCheckboxModule, NzSelectModule, NzIconModule, NzTableModule, CommonModule, NzPaginationModule
  ],
  templateUrl: './productpost.component.html',
  styleUrl: './productpost.component.css'
})
export class ProductpostComponent { 

  form: FormGroup;
  productos: Producto[] = [];
  paginatedData: Producto[] = [];  // Datos paginados
  currentPage = 1;  // Página actual
  pageSize = 3;  // Tamaño de la página


  constructor(private productpostService: ProductpostService, private formBuilder: FormBuilder) { 
    this.form = this.formBuilder.group({
      nombre: ["", Validators.required],
     descripcion: ["", Validators.required],
      precio: ["", Validators.required],
    });
  }

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

  onClickSubmit(): void {
    if(this.form.invalid) return;
    this.productpostService.createProducto(this.form.value)
    //.subscribe(() => this.getProductos());
    .subscribe(producto => {
      this.productos.push(producto);
      this.updatePaginatedData();
    });

  }

  onClickUpdate(id: string): void {
    if(this.form.invalid) return;
    this.productpostService.updateProducto({id,...this.form.value})
    //.subscribe(() => this.getProductos());
    .subscribe(producto => {
      const index = this.productos.findIndex(p => p.id === producto.id);
      if (index !== -1) {
        this.productos[index] = producto;
        this.updatePaginatedData(); // Actualiza la paginación después de actualizar
      }
    });
  }

  onClickDelete(id: string): void {
    this.productpostService.deleteProducto(id)
    //.subscribe(() => this.getProductos());
    .subscribe(() => {this.productos = this.productos.filter(p => p.id !== id);
    this.updatePaginatedData(); // Actualiza la paginación
    });
  }





  }


