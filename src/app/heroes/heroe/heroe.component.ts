import { Component } from "@angular/core";



@Component({
  selector: 'app-heroe',
  templateUrl: 'heroe.component.html'
})
export class HeroeComponent{

  nombre: string = 'Iroman';
  edad: number = 45;


  get nombreCapitalizado(): string {
    return this.nombre.toLocaleUpperCase();
  }

  ObtenerNombre():string {
    return `${ this.nombre } - ${ this.edad }`
  }

  cambiarNombre():void {
    this.nombre = 'Spiderman';
  }

  cambiarEdad():void{
    this.edad = 99
  }

}
