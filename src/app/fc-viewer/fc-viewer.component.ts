import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FcViewerService } from './service/fc-viewer.service';
import { CharacterResponse } from '@xivapi/angular-client';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-fc-viewer',
  templateUrl: './fc-viewer.component.html',
  styleUrls: ['./fc-viewer.component.css']
})
export class FcViewerComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private fcService: FcViewerService
  ) { }

  ngOnInit(): void {
    this.searchFreeCompany();
    this.fcService.buildRaceList();
    this.fcService.buildTribeList();
  }

  hasSavedData(): boolean {
    return this.fcService.hasSavedData();
  }

  getMembersFromStorage(): void {
    this.fcService.getMembersFromStorage();
  }

  isSearching(): boolean {
    return this.fcService.isSearching();
  }

  isParsing(): boolean {
    return this.fcService.isParsing();
  }

  getProgress(): number {
    return this.fcService.getProgress();
  }

  getSavedDate(): string {
    return this.fcService.getSavedDate();
  }

  searchFreeCompany(): void {
    var idString = this.route.snapshot.paramMap.get('id');
    if (idString) {
      this.fcService.searchFreeCompany(idString);
    }
  }

  isFreeCompanyNull(): boolean {
    return this.fcService.isFreeCompanyNull();
  }

  parseMembers(): void {
    this.fcService.parseMembers();
  }

  getParsedMembers(): CharacterResponse[] {
    return this.fcService.getParsedMembers();
  }

  log(): void {
    console.log(this.getParsedMembers());
  }

  getFreeCompany(): any {
    return this.fcService.getFreeCompany();
  }

  getFreeCompanyName(): string {
    return this.fcService.getFreeCompanyName();
  }

  getMemberCount(): number {
    return this.fcService.getMemberCount();
  }

  getMemberList(): any[] {
    return this.fcService.getMemberList();
  }

  getRaceDistribution(): void {
    this.fcService.getRaceDistribution();
  }

  parseRaceDistributionData(): ChartData<'bar'> { 
    return this.fcService.parseRaceDistributionData();
  }

  areRacesDistributed(): boolean {
    return this.fcService.areRacesDistributed();
  }

  getGenderDistribution(): void {
    this.fcService.getGenderDistribution();
  }

  areGendersDistributed(): boolean {
    return this.fcService.areGendersDistributed();
  }

  parseGenderDistributionData(): ChartData<'bar'> {
    return this.fcService.parseGenderDistributionData();
  }

  areTribesDistributed(): boolean {
    return this.fcService.areTribesDistributed();
  }

  getTribeDistribution(): void {
    this.fcService.getTribeDistribution();
  }

  parseTribeDistributionData(): ChartData<'bar'> {
    return this.fcService.parseTribeDistributionData();
  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {}
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DatalabelsPlugin
  ];
}
