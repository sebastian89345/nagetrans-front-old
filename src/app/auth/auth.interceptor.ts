import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Toast } from "ngx-toastr";
import { Observable } from "rxjs";
import {tap} from "rxjs/operators";
import { ServiceService } from "../shared/service.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private service:ServiceService,private router: Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(localStorage.getItem('token') != null){
             const clonedReq = req.clone({
                 headers : req.headers.set('Authorization','Bearer '+localStorage.getItem('token'))
             });
             return next.handle(clonedReq).pipe(
                 tap(
                     succ =>{},
                     err =>{
                         if(err.status == 401){
                            console.log('eres admin');
                            // localStorage.removeItem('token');
                          // this.router.navigateByUrl('ModuloUser');
                         } else if (err.status == 403){
                         // this.router.navigateByUrl('forbbiden');
                          console.log('No eres admin');
                          
                         }
                     }
                 )
             )
        } else
        {return next.handle(req.clone())};
    }

}