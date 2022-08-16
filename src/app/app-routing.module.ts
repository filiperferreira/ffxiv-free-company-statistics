import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FcViewerComponent } from './fc-viewer/fc-viewer.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: 'main', component: MainPageComponent},
  {path: 'fc/:id', component: FcViewerComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
