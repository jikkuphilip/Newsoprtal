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
  offset:number = 0;
  limit:number = 12;
  selectedSection:any
  toggle: boolean = true;
  constructor(
    private dataStv: DataService,
    private uiloader: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.uiloader.start();
    this.dataStv.getArticles({page:0,limit:12}).subscribe((resp: any) => {
      this.articles = resp.results;
      this.filteredArticles = this.articles;
      this.uiloader.stop();
    });
    this.dataStv.getSections().subscribe((resp: any) => {
      this.sections = resp.results;
    });
  }

  filterArticles(section) {
    this.selectedSection = section
    this.dataStv.getArticles({page:0, limit:20}).subscribe((resp:any) => {
      this.articles = resp.results
      this.filteredArticles = _.filter(this.articles, ['section', section]);
    })
  }

  paginate(direction) {
    if(direction === 'next') this.offset = this.offset + 1
    else this.offset = this.offset - 1
    this.dataStv.getArticles({page:this.offset,limit:this.limit}).subscribe((resp:any) => {
      this.articles = resp.results
     if (this.selectedSection) this.filteredArticles = _.filter(this.articles, ['section', this.selectedSection])
     else this.filteredArticles = this.articles
    })

  }

  gotourl(url) {
    window.open(
      url,
      '_blank' // <- This is what makes it open in a new window.
    );
  }
}
