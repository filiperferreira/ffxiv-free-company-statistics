import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { CharacterResponse, CharacterSearchResult, XivapiEndpoint, XivapiService } from '@xivapi/angular-client';
import { ChartData } from 'chart.js';
import { Observable, race } from 'rxjs';

export interface Race {
  id: number,
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class FcViewerService {
  private searching: boolean = false;
  private searchResult?: Observable<any>;
  private freeCompany: any;
  private parsedMembers: CharacterResponse[];
  private parsing: boolean = false;
  private progress: number = 0;
  private idString: string = "";

  constructor(
    private xivapi: XivapiService
  ) { 
    this.parsedMembers = [];
  }

  hasSavedData(): boolean {
    if (localStorage.getItem('parsedMembers' + this.idString) != null) {
      return true;
    }
    return false;
  }

  getMembersFromStorage(): void {
    var data = localStorage.getItem('parsedMembers' + this.idString);
    if (data != null) {
      this.parsedMembers = JSON.parse(data);
    }
  }

  isSearching(): boolean {
    return this.searching;
  }

  isParsing(): boolean {
    return this.parsing;
  }

  getProgress(): number {
    return this.progress * 100 / this.getMemberCount();
  }

  getSavedDate(): string {
    var date = localStorage.getItem('parsedTime' + this.idString);
    if (date != null) {
      return formatDate(date, "short", "en-US");
    }
    return "never";
  }

  isFreeCompanyNull(): boolean {
    return (this.freeCompany == null);
  }

  searchFreeCompany(id: string): void {
    this.idString = id;
    this.searching = true;
    this.searchResult = this.xivapi.getFreeCompany(id + "?data=FCM");
    this.searchResult.subscribe(result => {
      this.freeCompany = result;
      this.searching = false;
    })
  }

  getFreeCompany(): any {
    return this.freeCompany;
  }

  getFreeCompanyName(): string {
    return this.freeCompany.FreeCompany.Name;
  }
  
  getMemberCount(): number {
    return this.freeCompany.FreeCompany.ActiveMemberCount;
  }

  getMemberList(): any[] {
    return this.freeCompany.FreeCompanyMembers;
  }

  parseMembers(): void {
    if (!this.parsing) {
      this.parsing = true;
      this.parsedMembers = [];
      var i = 0;
      var interval = setInterval(() => {
        console.log("Parsing " + this.getMemberList()[i].Name);
        var character = this.xivapi.getCharacter(this.getMemberList()[i].ID);
        character.subscribe(result => {
          this.parsedMembers.push(result);
          console.log("Finished parsing " + result.Character.Name);
          this.progress++;
        });
        if (++i == this.getMemberList().length) {
          this.parsing = false;
          clearInterval(interval);
          var saveInterval = setInterval(() => {
            if (this.parsedMembers.length == this.getMemberCount()) {
              localStorage.setItem('parsedTime' + this.idString, JSON.stringify(Date.now()));
              localStorage.setItem(
                'parsedMembers' + this.idString,
                JSON.stringify(this.parsedMembers)
              );
              console.log("data saved");
              clearInterval(saveInterval);
            }
          }, 100);
        }
      }, 1000);
    }
  }

  getParsedMembers(): CharacterResponse[] {
    return this.parsedMembers;
  }

  private raceList: Race[] = [];
  buildRaceList(): void {
    var raceObservable: Observable<any> = this.xivapi.getList(XivapiEndpoint.Race);
    raceObservable.subscribe(result => {
      this.raceList = [];
      for (var race of result.Results) {
        var newRace: Race = {id: race.ID, name: race.Name};
        this.raceList.push(newRace);
      }
    });
  }

  private tribeList: Race[] = [];
  buildTribeList(): void {
    var tribeObservable: Observable<any> = this.xivapi.getList(XivapiEndpoint.Tribe);
    tribeObservable.subscribe(result => {
      this.tribeList = [];
      for (var tribe of result.Results) {
        var newTribe: Race = {id: tribe.ID, name: tribe.Name};
        this.tribeList.push(newTribe);
      }
    })
  }

  clearAllData(): void {
    this.raceDistribution = [];
    this.maleRaceDistribution = [];
    this.femaleRaceDistribution = [];
    this.tribeDistribution = [];
  }

  private raceDistribution: number[] = [];
  areRacesDistributed(): boolean {
    return this.raceDistribution.length != 0;
  }
  getRaceDistribution(): void {
    this.clearAllData();
    for (var i = 0; i < this.raceList.length; i++) {
      this.raceDistribution.push(0);
    }
    for (var player of this.parsedMembers) {
      var playerRace = player.Character.Race;
      this.raceDistribution[playerRace-1]++;
    }
  }

  parseRaceDistributionData(): ChartData<'bar'> {
    var raceNames: string[] = [];
    for (var i = 0; i < this.raceList.length; i++) {
      raceNames.push(this.raceList[i].name);
    }
    var pieChartData: ChartData<'bar'> = {
      labels: raceNames,
      datasets: [{
        data: this.raceDistribution, label: 'Race'
      }]
    }
    return pieChartData;
  }

  private maleRaceDistribution: number[] = [];
  private femaleRaceDistribution: number[] = [];
  areGendersDistributed(): boolean {
    return this.maleRaceDistribution.length != 0;
  }
  getGenderDistribution(): void {
    this.clearAllData();
    for (var i = 0; i < this.raceList.length; i++) {
      this.maleRaceDistribution.push(0);
      this.femaleRaceDistribution.push(0);
    }
    for (var player of this.parsedMembers) {
      var playerRace = player.Character.Race;
      var playerGender = player.Character.Gender;
      if (playerGender == 1) {
        this.maleRaceDistribution[playerRace - 1]++;
      }
      else if (playerGender == 2) {
        this.femaleRaceDistribution[playerRace - 1]++;
      }
    }
  }

  parseGenderDistributionData(): ChartData<'bar'> {
    var raceNames: string[] = [];
    for (var i = 0; i < this.raceList.length; i++) {
      raceNames.push(this.raceList[i].name);
    }
    var barChartData: ChartData<'bar'> = {
      labels: raceNames,
      datasets: [
        {data: this.maleRaceDistribution, label: 'Male'},
        {data: this.femaleRaceDistribution, label: 'Female'}
      ]
    }
    return barChartData;
  }

  private tribeDistribution: number[] = [];
  areTribesDistributed(): boolean {
    return this.tribeDistribution.length != 0;
  }
  getTribeDistribution(): void {
    this.clearAllData();
    for (var i = 0; i < this.tribeList.length; i++) {
      this.tribeDistribution.push(0);
    }
    for (var player of this.parsedMembers) {
      var playerTribe = player.Character.Tribe;
      this.tribeDistribution[playerTribe - 1]++;
    }
  }

  parseTribeDistributionData(): ChartData<'bar'> {
    var tribeNames: string[] = [];
    for (var i = 0; i < this.tribeList.length; i++) {
      tribeNames.push(this.tribeList[i].name);
    }
    var barChartData: ChartData<'bar'> = {
      labels: tribeNames,
      datasets: [
        {data: this.tribeDistribution, label: 'Tribe'}
      ]
    }
    return barChartData;
  }
}
