import { Component, OnInit } from '@angular/core';
import { CharacterSearchResult, CharacterSearchResultRow, Pagination, XivapiService } from '@xivapi/angular-client';
import { Observable } from 'rxjs';
import { MainPageService } from './service/main-page.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  constructor(
    private mainService: MainPageService
  ) {}

  ngOnInit(): void {}

  searchFreeCompany(searchText: string, page: number): void {
    this.mainService.searchFreeCompany(searchText, page);
  }

  clearList(): void {
    this.mainService.clearList();
  }

  listFreeCompanies(): any[] {
    return this.mainService.listFreeCompanies();
  }

  isFreeCompanyListEmpty(): boolean {
    return this.listFreeCompanies().length == 0;
  }

  isSearching(): boolean {
    return this.mainService.isSearching();
  }

  getSearchText(): string {
    return this.mainService.getSearchText();
  }

  getPreviousPage(): number {
    return this.mainService.getPreviousPage();
  }

  getNextPage(): number {
    return this.mainService.getNextPage();
  }
}
