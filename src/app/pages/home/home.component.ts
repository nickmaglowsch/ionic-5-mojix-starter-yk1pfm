import {
  AfterViewInit,
  Component,
  OnChanges,
  SimpleChanges
} from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnChanges, AfterViewInit {
  ngOnChanges(changes: SimpleChanges): void {}

  ngAfterViewInit() {}
}
