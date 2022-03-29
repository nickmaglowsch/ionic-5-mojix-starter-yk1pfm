import {
  AfterViewInit,
  Component,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ApiService } from '../../api/api.service';
import { SongResponse, SongModel } from '../../song/song.model';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnChanges, AfterViewInit {
  songList: Observable<SongResponse>;
  category: boolean;
  term = 'Shakira';
  media = 'music'; // Or movie

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
}
