import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreService } from '../../services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  search: FormGroup;
  posY = 0;
  hide = false;
  @Output() sendTitle: EventEmitter<string> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private store: StoreService,
    private router: Router
  ) {
    this.search = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  @HostListener('window:scroll')
  viewScroll() {
    this.posY < window.scrollY
      ? ((this.hide = true), (this.posY = window.scrollY - 1))
      : ((this.hide = false), (this.posY = window.scrollY));
  }

  onSubmit() {
    if (this.search.pristine || this.search.invalid) {
      return;
    }
    this.sendTitle.emit(this.search.value.title);
  }

  logout() {
    this.store.clean();
    this.router.navigateByUrl('/');
  }
}
