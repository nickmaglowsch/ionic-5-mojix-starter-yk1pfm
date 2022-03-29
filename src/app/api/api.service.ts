import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SongResponse } from '../song/song.model';
import { tap, retryWhen } from 'rxjs/operators';
import { timer, interval } from 'rxjs';

import { scan, take, delayWhen } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  searchSongs(
    search: string,
    media: string,
    limit: number = 50
  ): Observable<SongResponse> {
    const path = `https://itunes.apple.com/search?term=${search}&media=${media}&limit=${limit}`;
    return this.http.get<SongResponse>(path).pipe(
      retryWhen((errors) =>
        errors.pipe(
          //log error message
          tap((error) => console.log(`api failed with error`, error)),
          scan((acc, error) => {
            if (acc > 2) throw error;
            console.log('attempt ' + acc);
            return acc + 1;
          }, 1),
          take(2),
          //restart in 6 seconds
          delayWhen((val) => timer(val * 2000))
        )
      )
    );
  }
}
