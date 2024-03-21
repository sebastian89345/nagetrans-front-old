import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterlistcheck'
})
export class FilterlistcheckPipe implements PipeTransform {

  transform(lista: any[],texto: string): any[] {
    if(!texto) return lista
    
   return lista.filter(data => 
      data.identificacion.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.placa.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.aceiteHidraulicoDireccion.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.aceiteMotor.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.botiquin.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.cambioAceite.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.carpa.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.cinturonesDeSeguridad.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.cojineriaySillas.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.dispositivoDeVelocidad.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.equipoDeCarretera.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.extintor.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.extracto.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.fechaVencientoSegurorccece.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.fechaVencientoSoat.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.fechaVencientoTarjetadePropiedades.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.fechaVencientoTarjetadeoperaciones.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.fechaVencientoTecnicomecanica.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.fechaVencimientoExtracto.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.fechaVencimientoRevisionPreventiva.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.frenoDeEmergencia.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.indicadorAceiteDeMotor.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.indicadorBateria.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.kmActual.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.limpiabrisas.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.liquidoDeFrenos.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.liquidoRefrigerante.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.llantaDeRepuesto.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.llantas.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.lucesDireccionales.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.lucesInternas.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.names.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.nivelDeDombustible.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.observacion.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.pito.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.placasyLogos.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.revisionPreventiva.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.segurorccece.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.soat.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.surnames.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.tableroVelocimetroInstrumentos.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.tarjetadePropiedades.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.tapaDeCombustible.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.tarjetadeoperaciones.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.tecnicomecanica.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.tensionDeCorreas.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.vencimientoExtintor.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.vidriosyEspejos.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.lucesAltasyBajas.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) 

      )
    }
}
