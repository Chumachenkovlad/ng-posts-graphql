import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, finalize, takeUntil } from 'rxjs/operators';

import { WithDestroy } from '../mixins/with-destroy';

@Injectable()
export class Requester extends WithDestroy() {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<unknown>({});

  constructor() {
    super();
  }

  public get loading$() {
    return this.loadingSubject.asObservable();
  }

  public get errors$() {
    return this.errorSubject.asObservable();
  }

  public decorateRequest<T>(observable: Observable<T>) {
    this.loadingSubject.next(true);
    return observable.pipe(
      finalize(() => this.loadingSubject.next(false)),
      catchError((errors: unknown) => {
        this.errorSubject.next(errors);
        return throwError(errors);
      }),
      takeUntil(this.destroy$)
    );
  }
}
