import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { Productos, ProductosService } from '../../services/productos/productos.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzTableModule, FormsModule, NzPopconfirmModule,
    NzFormModule, NzInputModule,NzButtonModule
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {

  producto: Productos[] = [];
  form: FormGroup;
  showForm: boolean = false;

  editCache: { [key: string]: { edit: boolean; data: Productos } } = {};

  constructor(private productosService: ProductosService, 
    private formBuilder: FormBuilder) {
      this.form = this.formBuilder.group({
        nombre: ["", Validators.required],
        imagen: ["", Validators.required],
        precio: ["", Validators.required],
        stock: ["", Validators.required],
        descripcion: ["", Validators.required, Validators.minLength(20)]
      })
     }

     ngOnInit(): void {
      this.productosService.getProductos().subscribe((productos) => {
        this.producto = productos;
        this.updateEditCache();
      })
    }

    addProducto(): void {
      if (this.form.invalid) return;
  
      this.productosService
        .createProductos(this.form.value)
        .then((productoRef) => {
          const newProducto = {
            id: productoRef.id,
            ...this.form.value,
          };
          this.producto.push(newProducto); // Añadir el nuevo producto a la lista
          this.form.reset(); // Reiniciar el formulario
          this.showForm = false; // Ocultar el formulario después de añadir
          this.updateEditCache(); // Actualizar la caché
          
        })
        .catch((error) => {
          console.error('Error al añadir el producto:', error);
        });
    }

    // Start editing a product
  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

    // Cancel editing a product
  cancelEdit(id: string): void {
    const index = this.producto.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.producto[index] },
      edit: false
    };
  }

    // Save the edited product to Firebase
  saveEdit(id: string): void {
    const index = this.producto.findIndex(item => item.id === id);
    Object.assign(this.producto[index], this.editCache[id].data); // Update local data
    this.editCache[id].edit = false;
    
    // Update the product in Firebase
    this.productosService.updateProductos(this.producto[index])
      .then(() => {
        console.log('Product updated successfully');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Update the edit cache to reflect the current product data
  updateEditCache(): void {
    this.producto.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  deleteRow(id: string): void {
    this.productosService.deleteProductos({ id } as Productos) // Llamada al servicio para eliminar en Firebase
      .then(() => {
        this.producto = this.producto.filter(d => d.id !== id); // Elimina localmente
      })
      .catch((error) => {
        console.error('Error eliminando producto:', error);
      });
  }

  toggleForm(): void {
    this.showForm = !this.showForm; // Alternar la visibilidad del formulario
  }

}
