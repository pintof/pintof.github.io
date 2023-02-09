import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ThirdComponent } from './third.component';
import { RouterModule } from '@angular/router';
import { FourthComponent } from './fourth.component';
import { FifthComponent } from './fifth.component';

@NgModule({
  declarations: [AppComponent, ThirdComponent, FourthComponent, FifthComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'fourth', component: FourthComponent },
      { path: 'fifth', component: FifthComponent },
      // { path: 'app', component: AppComponent },
      // { path: '', redirectTo: 'app', pathMatch: 'full' },
      // { path: '**', redirectTo: 'app' },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
