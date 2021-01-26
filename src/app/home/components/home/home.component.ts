import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  get authFlag() {
    return this.authFB.user;
  }

  constructor(private authFB: AngularFireAuth, private router: Router) {}

  ngOnInit(): void {
    this.authFB.user.subscribe((data) => {
      if (data) {
        this.router.navigate(['/search']);
      }
    });
  }

  login() {
    this.authFB.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
}
