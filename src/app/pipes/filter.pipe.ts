import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(lista: any[],texto: string): any[] {
    if(!texto) return lista
    debugger;
     
    return lista.filter(data => 
      data.userName.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.email.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.phoneNumber.toLocaleLowerCase().includes(texto.toLocaleLowerCase())
      )
   // return lista.filter(data => data.userNameVehiculo.toUpperCase().includes(texto.toUpperCase()))
      
  }

}
