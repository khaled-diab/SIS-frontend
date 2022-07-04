import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {NavComponent} from './shared/component/nav/nav.component';
import {NotFoundComponent} from './shared/component/not-found/not-found.component';
import {NavMenuComponent} from './nav-menu/nav-menu.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {SideMenuComponent} from './nav-menu/side-menu/side-menu.component';
import {NavBarComponent} from './nav-menu/nav-bar/nav-bar.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './security/login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SecurityInterceptor} from './security/service/security.interceptor';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {RegisterComponent} from './security/register/register.component';
import {UploadUsersComponent} from './upload-users/upload-users.component';
import {ProfileComponent} from './profile/component/profile.component';
import {FileUploadModule} from 'primeng/fileupload';
import {ToastModule} from 'primeng/toast';
import {ButtonModule} from 'primeng/button';
import {MessageService} from 'primeng/api';
import {ImageModule} from 'primeng/image';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    NotFoundComponent,
    NavMenuComponent,
    SideMenuComponent,
    NavBarComponent,
    LoginComponent,
    RegisterComponent,
    UploadUsersComponent,
    ProfileComponent
  ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatExpansionModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatSnackBarModule,
        FormsModule,
        FileUploadModule,
        ToastModule,
        ButtonModule,
        ImageModule,
        MatSelectModule,
    ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: SecurityInterceptor, multi: true}, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {
}

