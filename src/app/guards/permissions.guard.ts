import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from '../services/users/users.service';
import { inject } from '@angular/core';

export const permissionsGuard: CanActivateFn = (route, state) => {

  const usersService = inject (UsersService);
  const router = inject(Router);

  if (usersService.getCurrentUser() === null) {
    router.navigate(['/login']);
    return false;
  };
  return true;
  
};
