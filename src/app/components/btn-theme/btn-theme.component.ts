import { Component } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-btn-theme',
  templateUrl: './btn-theme.component.html',
})
export class BtnThemeComponent {
  checked: boolean;

  constructor(private theme: ThemeService) {
    this.checked = this.theme.default;
  }

  changeTheme() {
    this.checked = !this.checked;
    this.theme.default = this.checked;
  }
}
