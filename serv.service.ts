import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, skipWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServService {
  constructor(private http: HttpClient) {}

  getData(): Observable<string[]> {
    console.log('Fetching data...');
    return this.http
      .get<any[]>('https://jsonplaceholder.typicode.com/users')
      .pipe(
        // tap((response) => console.log('Response:', response)),
        map((response) => response.map((item) => item.name))
      );
  }
}
