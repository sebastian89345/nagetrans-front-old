import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceService } from '../shared/service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router,private service:ServiceService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      if (localStorage.getItem('token') != null)
      {
        let roles = next.data['permiteedRoles'] as Array<string>;
        if(roles){
           if (this.service.roleMatch(roles)) {return true ;}
           else{ 
            console.log('No tienes acceso');
            
            // this.router.navigate(['/forbbiden']);
              return false;
           }
        }
        return true;
      } else{
        console.log('tienes acceso');
       // this.router.navigate(['/ModuloUser']);
        return false;
      }
   
  }
  
}