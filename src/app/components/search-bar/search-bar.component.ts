import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EmptyFavsComponent } from '../empty-favs/empty-favs.component';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  search: FormGroup;

  @Output() sendTitle: EventEmitter<string> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private login: LoginService,
    private router: Router,
    private emptyFavs: MatDialog
  ) {
    this.search = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    if (this.search.pristine || this.search.invalid) {
      return;
    }
    this.sendTitle.emit(this.search.value.title);
  }

  favs() {
    const data = sessionStorage.getItem('ngMov13User');
    if (!data || JSON.parse(data).movies < 1) {
      const dialog = this.emptyFavs.open(EmptyFavsComponent, {
        minWidth: '220px',
        minHeight: '300px',
      });
      return;
    }

    this.router.navigateByUrl('/favs');
  }

  logout() {
    this.login.clean();
    this.router.navigateByUrl('/');
  }
}
