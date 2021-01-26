import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _myTheme: HTMLBodyElement;

  private _default: boolean;
  /* getter & setter */
  public get default(): boolean {
    return this._default;
  }
  public set default(value: boolean) {
    localStorage.setItem('darkTheme', `${value}`);
    this._default = value;
    this.setTheme();
  }

  constructor() {
    this._myTheme = document.getElementById('body') as HTMLBodyElement;
    this._default = this.getDefault();
    this.setTheme();
  }

  private getDefault() {
    return !localStorage.getItem('darkTheme')
      ? (localStorage.setItem('darkTheme', 'true'), true)
      : JSON.parse(localStorage.getItem('darkTheme') as string);
  }

  private setTheme(): void {
    if (!this._default) {
      this._myTheme.classList.add('light-theme');
    } else {
      this._myTheme.classList.remove('light-theme');
    }
  }
}
