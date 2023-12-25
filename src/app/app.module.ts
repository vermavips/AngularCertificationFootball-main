import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { LeaguesComponent } from './football-leagues/football-leagues.component';
import { HttpClientModule } from '@angular/common/http';
import { TeamGamesComponent } from './teams/teams.component';

const routes: Routes = [
  { path: 'football-leagues/:name', component: LeaguesComponent },
  { path: 'football-leagues/:name/:teamID', component: TeamGamesComponent},
  { path: '**', redirectTo: '/football-leagues/england', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeaguesComponent,
    TeamGamesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
