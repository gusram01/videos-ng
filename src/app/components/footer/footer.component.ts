import { Component, OnInit } from '@angular/core';
import {
  faTwitter,
  faGithub,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  faTwitter = faTwitter;
  faGithub = faGithub;
  faLinkedin = faLinkedin;
  legend: string;
  urlTwit = 'https://twitter.com/GusGusdev';
  urlGit = 'https://github.com/gusram01';
  urlLink = 'https://www.linkedin.com/in/gustavo-cesar-ramirez/';
  urlRepo = 'https://github.com/gusram01/videos-ng.git';

  constructor() {
    const year = new Date().getFullYear();
    this.legend = `Gus Ramírez ${year}®`;
  }

  ngOnInit(): void {}
}
