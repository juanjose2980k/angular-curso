import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'b9f89o5fSK9yqnkjolmcinR9e1D5ChEj';
  private servicioURL: string = ' https://api.giphy.com/v1/gifs';

  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial(){
    return [...this._historial]
  }

  constructor( private http: HttpClient ){
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados =  JSON.parse(localStorage.getItem('ultimaBusquedad')!) || [];
    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }


  }

  buscarGifs(query: string = '') {

    query = query.trim().toLocaleLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify( this._historial ));
    }else{
      const filtrados = this._historial.filter(item => item !== query);
      filtrados.unshift( query );
      this._historial = filtrados.splice(0,10);
    }

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.servicioURL}/search`, { params })
      .subscribe( (resp) => {
        this.resultados = resp.data;
        localStorage.setItem('ultimaBusquedad', JSON.stringify( this.resultados ));

      })



  }


}
