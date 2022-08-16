import { Injectable } from '@angular/core';
import { Pagination, XivapiService } from '@xivapi/angular-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainPageService {
  private searchText: string = "";

  private searching: boolean = false;
  private freeCompany?: Observable<{Pagination: Pagination, Results: any[]}>;
  private freeCompanyList: {Pagination: Pagination, Results: any[]};
  private emptySearch: {Pagination: Pagination, Results: any[]} = {
    Pagination: {
      Page: 1,
      PageNext: false,
      PagePrev: false,
      PageTotal: 1,
      Results: 0,
      ResultsPerPage: 50,
      ResultsTotal: 0
    },
    Results: []
  }

  constructor(private xivapi: XivapiService) {
    this.freeCompanyList = this.emptySearch;
  }

  clearList(): void {
    this.freeCompanyList = this.emptySearch;
  }

  searchFreeCompany(searchText: string, page: number): void {
    this.searchText = searchText;
    if (searchText != "") {
      this.freeCompanyList = this.emptySearch;
      this.searching = true;
      this.freeCompany = this.xivapi.searchFreeCompany(searchText + "&page=" + String(page));
      this.freeCompany.subscribe(result => {
        this.freeCompanyList = result;
        this.searching = false
      });
    }
  }

  getSearchText(): string {
    return this.searchText;
  }

  listFreeCompanies(): any[] {
    return this.freeCompanyList.Results;
  }

  isSearching(): boolean {
    return this.searching;
  }

  getPreviousPage(): number {
    var page = this.freeCompanyList.Pagination.PagePrev;
    if (typeof(page) != "boolean") {
      return page;
    }
    return 0;
  }

  getNextPage(): number {
    var page = this.freeCompanyList.Pagination.PageNext;
    if (typeof(page) != "boolean") {
      return page;
    }
    return 0;
  }
}
