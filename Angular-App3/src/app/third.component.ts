import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestService } from './test.service';

@Component({
  selector: 'third',
  templateUrl: './third.component.html',
  styleUrls: ['./third.component.css'],
})
export class ThirdComponent implements OnInit {
  constructor(private router: Router) {}

  fifth(): void {
    this.router.navigate(['/fifth']);
  }

  ngOnInit(): void {}
}
