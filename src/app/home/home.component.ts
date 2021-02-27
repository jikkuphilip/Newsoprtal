import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  articles: any = [];
  sections: any = [];
  toggle: boolean = true;
  constructor(private dataStv: DataService) {}

  ngOnInit(): void {
    this.dataStv.getArticles().subscribe((resp: any) => {
      this.articles = resp.results;
    });
    this.dataStv.getSections().subscribe((resp: any) => {
      this.sections = resp.results;
    });
  }
}
