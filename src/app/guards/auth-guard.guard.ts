import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToasterService } from '../services/toaster.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
 const auth = inject(AuthService);
 const toaster = inject(ToasterService);
 const router = inject(Router);
 if(auth.islogined()){
  return true;

 }else{
  toaster.showWarning("operation deined, Please login","warning")
  router.navigateByUrl("")
  return false;
 }
  
};
