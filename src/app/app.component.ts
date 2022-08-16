import { Component, Injectable } from '@angular/core';
import { CharacterSearchResult, CharacterSearchResultRow, XivapiService } from '@xivapi/angular-client';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'xiv-project';
}
