import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.user.role === 'ADMIN_ROLE') {
    return true;
  } else {
    router.navigateByUrl('/dashboard');
    return false;
  }
};
