import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TestService } from './test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private testService: TestService) {}

  pageTitle: string = 'Elevation API';
  imageLocation: string = 'assets/elevation.JPG';
  imageLocation2: string = 'assets/elevation2.jfif';
  boolean: boolean = false;
  textEntry: number = 2;
  results: string = '';
  source$: Observable<JSON> = this.testService.getResults();
  sub!: Subscription;

  changeImage(): void {
    this.boolean = !this.boolean;
  }
  ngOnInit(): void {
    this.sub = this.source$.subscribe({
      next: (emitted) => (this.results = JSON.stringify(emitted, undefined, 2)),
      error: (err) => console.log(err),
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
