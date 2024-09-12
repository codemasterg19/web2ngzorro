import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';

import { ProductosComponent } from './pages/productos/productos.component';
import { permissionsGuard } from './guards/permissions.guard';
import { rolesGuard } from './guards/roles.guard';
import { ProductpostComponent } from './pages/productpost/productpost.component';
import { ProductosEmpleadoComponent } from './pages/productos-empleado/productos-empleado.component';
import { inject } from '@angular/core';
import { RegistersService } from './services/registers/registers.service';
import { UsersComponent } from './pages/users/users.component';

function isRoute(role?: string){
  const registerService = inject(RegistersService);
  return registerService.currentRegister?.role === role
}

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent},
  { path: 'users', component: UsersComponent, canActivate: [permissionsGuard]},
  { path: 'productos', component: ProductosComponent, canActivate: [permissionsGuard]},
  { path: 'productospostgres', component: ProductpostComponent, canMatch: [rolesGuard]},//canMatch: [() => isRoute('Admin')]}, //
  { path: 'productospostgres', component: ProductosEmpleadoComponent, canMatch: [rolesGuard]},// canMatch: [() => isRoute('Empleado')]}, //
];
