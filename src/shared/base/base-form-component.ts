import { ChangeDetectorRef, Directive, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

import { isEmpty, isNil, omit } from 'lodash-es';

export const BASE_FORM_INPUTS = ['formValue', 'errors', 'loading'];
export const BASE_FORM_OUTPUTS = ['formSubmit'];
const NON_FIELD_ERROR_KEY = 'serverError';

@Directive()
// tslint:disable-next-line: directive-class-suffix no-any
export class BaseFormComponent<T = any, E = any> {
  public get submitDisabled() {
    return this.form.invalid && this.form.touched;
  }

  @Input() public set formValue(fv: Partial<T>) {
    if (!isNil(fv)) {
      this.form.patchValue(fv, { emitEvent: false });
      this.markAsPristine();
    }
  }

  @Input() public set errors(errors: E) {
    if (isNil(errors) || isEmpty(errors) || isNil(this.form)) {
      return;
    }
    this.serverErrors = errors;
    this.handleErrors(errors);
  }
  public form!: FormGroup;
  public serverErrors = {};
  @Input() public loading = false;

  @Output() public formSubmit = new EventEmitter<T>();

  constructor(
    protected readonly fb: FormBuilder,
    protected readonly cdr: ChangeDetectorRef
  ) {}

  public markAsPristine() {
    this.form.markAsPristine();
    this.cdr.markForCheck();
  }

  public markAsTouched() {
    this.form.markAsTouched();
    this.cdr.markForCheck();
  }

  public markAsDirty() {
    this.form.markAsDirty();
  }

  public isDirty() {
    return this.form.dirty;
  }

  public getFormValue() {
    if (this.form.valid) {
      return this.form.value;
    }

    this.form.markAllAsTouched();
    return null;
  }

  public submit() {
    const formValue = this.getFormValue();
    if (formValue && !isEmpty(formValue)) {
      this.formSubmit.emit(formValue);
    }
  }

  public patchValue(fv: Partial<T>) {
    if (isNil(fv)) {
      return;
    }

    this.form.patchValue(fv, { emitEvent: false });
  }

  protected getControl(path: string): AbstractControl {
    const control = this.form.get(path);

    if (isNil(control)) {
      throw new Error(`${path} control should be defined`);
    }

    return control;
  }

  private handleErrors(errors: E) {
    const nonFieldErrors = errors[NON_FIELD_ERROR_KEY];

    if (nonFieldErrors !== undefined) {
      this.form.setErrors({ serverError: true });
      this.form.markAsTouched({ onlySelf: true });
    }

    const fieldErrors = omit(errors, NON_FIELD_ERROR_KEY);

    Object.keys(fieldErrors)
      .map(prop => this.form.get(prop))
      .filter(val => !isNil(val))
      .forEach(control => {
        control.setErrors({ serverError: true });
        control.markAsTouched({ onlySelf: true });
      });
  }
}
