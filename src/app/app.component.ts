import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  map, switchMap  } from 'rxjs/operators';


@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent  {
  resultado;
  constructor(private http: HttpClient) {
    http.get<any[]>('https://jsonplaceholder.typicode.com/posts')
      .pipe(
        switchMap(
          posts => http.get('https://jsonplaceholder.typicode.com/users')
            .pipe(
              map(users => ({ posts, users }))
            )
        )
      )
      .subscribe( 
        result => {
          console.log('Resultado 2 peticiones ', result);
          this.resultado=result;
        }
      )
  }
}   