import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import * as _ from 'lodash';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  articles: any = [];
  filteredArticles: any = [];
  sections: any = [];
  toggle: boolean = true;
  constructor(
    private dataStv: DataService,
    private uiloader: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.uiloader.start();
    this.dataStv.getArticles().subscribe((resp: any) => {
      this.articles = resp.results;
      this.filteredArticles = this.articles;
      this.uiloader.stop();
    });
    this.dataStv.getSections().subscribe((resp: any) => {
      this.sections = resp.results;
    });
  }

  filterArticles(section) {
    console.log('sec', section);
    this.filteredArticles = _.filter(this.articles, ['section', section]);
    console.log('filtered', this.filteredArticles);
  }

  gotourl(url) {
    window.open(
      url,
      '_blank' // <- This is what makes it open in a new window.
    );
  }
}
