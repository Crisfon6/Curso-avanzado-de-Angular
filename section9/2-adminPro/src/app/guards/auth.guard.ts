import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.validateToken().pipe(
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigateByUrl('/login');
      }
    })
  );
};
