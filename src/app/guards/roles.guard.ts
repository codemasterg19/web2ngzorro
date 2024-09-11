import { CanMatchFn, Router } from '@angular/router';
import { RegistersService } from '../services/registers/registers.service';
import { inject } from '@angular/core';

export const rolesGuard: CanMatchFn = (route, segments) => {
  
  const router = inject(Router);
  const registerService = inject(RegistersService);
  const component = route.component?.name;
  const role = registerService.currentRegister?.role;
  console.log(role);
  console.log(route.component?.name);
  if(role === 'Admin') return true;
  if(role === 'Empleado' && component === '_ProductosEmpleadoComponent') return true;
  if(!role) return router.navigate(['login']);


  console.log(segments);

  return false;
};
