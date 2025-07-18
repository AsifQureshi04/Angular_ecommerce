import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,of ,map} from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopForm {
  baseUrl:string = "http://localhost:8080/api/"
  
  constructor(private httpClient: HttpClient) { }

  getCountries():Observable<Country[]>{
    return this.httpClient.get<GetResponseCountries>(`${this.baseUrl}countries`).pipe(
      map(response => response._embedded.countries)
    )
  }

    getStates(theCountryCode:string):Observable<State[]>{
    return this.httpClient.get<GetResponseStates>(`${this.baseUrl}states/search/findByCountryCode?code=${theCountryCode}`).pipe(
      map(response => response._embedded.states)
    )
  }


  getCreditCardMonth(startMonth:number): Observable<number[]>{
    let data: number[] = [];
    for(let theMonth = startMonth; theMonth<=12; theMonth++){
      data.push(theMonth);
    } 
    return of(data);
  }

  getCreditCardYear(): Observable<number[]>{
    let data: number[] = []

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;
    
    for(let theYear = startYear; theYear <= endYear; theYear++){
      data.push(theYear)
    }
    return of(data);
  }
}


interface GetResponseCountries{
  _embedded:{
    countries:Country[]
  }
}

interface GetResponseStates{
  _embedded:{
    states:State[]
  }
}
