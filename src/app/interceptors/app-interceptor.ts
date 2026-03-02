import { HttpInterceptorFn, HttpErrorResponse, HttpContextToken } from '@angular/common/http';
import { inject } from '@angular/core';
import { Helper } from '../helper';
import { catchError, finalize, throwError } from 'rxjs';

export const IS_SILENT = new HttpContextToken(() => false);

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  const service = inject(Helper);

  if (req.context.get(IS_SILENT)) {
    return next(req);
  }

  service.startLoading();

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknown error occurred.';

      if (error.status === 500) {
        errorMessage = 'Server is down. Our team is on it!';
      } else if (error.status === 401) {
        errorMessage = 'Session expired. Please log in again.';
      } else if (error.status === 0) {
        errorMessage = 'No internet connection detected.';
      }

      service.setError(errorMessage);
      return throwError(() => error);
    }),

    finalize(() => {
      if (!service.errorMsg()) {
        service.setSuccess();
      }
    }),
  );
};
