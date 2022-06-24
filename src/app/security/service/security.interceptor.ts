import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Constants} from '../../shared/constants';

@Injectable()
export class SecurityInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({headers: request.headers.set('jwt-token', localStorage.getItem(Constants.authHeader) || 'none')});
    return next.handle(request);
  }
}
