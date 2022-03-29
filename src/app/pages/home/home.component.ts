import {
  AfterViewInit,
  Component,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ApiService } from '../../api/api.service';
import { SongResponse, SongModel } from '../../song/song.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnChanges, AfterViewInit {
  currentPage = new BehaviorSubject<number>(50);
  songList: Observable<SongResponse> = this.currentPage.pipe(
    switchMap((page) => {
      console.log(page);
      return this.api.searchSongs(this.term, this.media, page);
    })
  );
  _category: boolean;
  term = '';
  media: 'movie' | 'music' = 'music'; // Or movie
  get category() {
    return this._category;
  }

  set category(value) {
    this._category = value;
    this.media = value ? 'movie' : 'music';
  }

  ngOnChanges(changes: SimpleChanges): void {}
  constructor(public api: ApiService) {}

  search(ev) {
    const value = ev.target.value;
    if (value.trim().length > 0) {
      this.term = value;
      console.log(value);
      this.songList = this.api.searchSongs(this.term, this.media);
    } else {
      this.songList = of();
    }
  }
  ngAfterViewInit() {}

  loadData(event) {
    this.currentPage.next(this.currentPage.value + 50);
  }

  trackByFn(index: number, element: any) {
    return index;
  }
}
