import { Component, Input, OnInit } from '@angular/core';
import { SongModel } from './song.model';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss'],
})
export class SongComponent implements OnInit {
  @Input() currentSong: SongModel;
  @Input() index: number;
  currentView: 'list' | 'card' = 'list';

  constructor() {}

  ngOnInit(): void {}

  changeView(view: 'list' | 'card') {
    this.currentView = view;
  }

  isPrime() {
    if (this.index <= 1) return false;

    for (let i = 2; i < this.index; i++) {
      if (this.index % i === 0) return false;
    }

    return true;
  }
}
