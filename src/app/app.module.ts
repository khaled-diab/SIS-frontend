import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CollegeManagementModule} from './college-management/college-management.module';
import {AppRoutingModule} from './app-routing.module';
import {NavComponent} from './shared/component/nav/nav.component';
import {NotFoundComponent} from './shared/component/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    NotFoundComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CollegeManagementModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
