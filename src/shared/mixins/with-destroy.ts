import { Directive, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';

export type Constructor<T> = new (...args: any[]) => T;

// tslint:disable: max-classes-per-file naming-convention no-any
export function WithDestroy<T extends Constructor<{}>>(
  Base: T = class {} as any
) {
  @Directive()
  class Temporary extends Base implements OnDestroy {
    public destroy$ = new Subject<void>();

    public ngOnDestroy() {
      this.destroy$.next();
      this.destroy$.complete();
    }
  }

  return Temporary;
}
