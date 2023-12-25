import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiStandingResponse } from '../models/standing.model';
import { ApiFixtureResponse } from '../models/fixture.model';

@Injectable({
  providedIn: 'root'
})

export class LeagueService {  
  private standing_cache: Map<string, ApiStandingResponse> = new Map();
  private fixture_cache: Map<string, ApiFixtureResponse> = new Map(); 
  country_name : string = "";
  team_id : string = "";
  id : string = "";

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  onGetLeagues(country_name:string) : Subscription {    
    this.country_name = country_name;
    const headers = new HttpHeaders({
    'x-rapidapi-host': 'v3.football.api-sports.io',
    "x-rapidapi-key": "ce6a37f646fcd95790b4a3f2167451a8",
    });
    switch(this.country_name) { 
      case "england": { 
        this.id = "39";
        break; 
      } 
      case "spain": { 
        this.id = "140"; 
         break; 
      } 
      case "france": { 
        this.id = "61"; 
        break;
      } 
      case "germany":{
        this.id = "78";
        break;
      }
      case "italy":{
        this.id = "135";
        break;
      }
    }    
    let params = new HttpParams().append("league",this.id).append("season",2023);  
    if(!this.standing_cache.has(this.country_name)){
      return this.http.get<ApiStandingResponse>('https://v3.football.api-sports.io/standings', { headers, params }).subscribe(
        (response) => {
          this.standing_cache.set(this.country_name, response);
        },
        (error) => {
          console.log("error")
        }
      );
    }else{
      return new Subscription;
    }
  }

  getGames(team_id : string): Subscription{
    this.team_id = team_id;
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      "x-rapidapi-key": "ce6a37f646fcd95790b4a3f2167451a8",
    });
        let params = new HttpParams().append("team",team_id).append("season",2023);
    if(!this.fixture_cache.has(this.team_id)){
      return this.http.get<ApiFixtureResponse>('https://v3.football.api-sports.io/fixtures', { headers, params }).subscribe(
          (response) => {
            this.fixture_cache.set(this.team_id, response);
          },
          (error) => {
            console.log("error")
          }
        );
    }else{
      return new Subscription;
    }
  }

  getLeagueCache(): Map<string,ApiStandingResponse>{
    return this.standing_cache;
  }

  getTeamCache(): Map<string,ApiFixtureResponse>{
    return this.fixture_cache;
  }
}
