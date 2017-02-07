import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Hero } from './hero';

@Injectable()
export class HeroService {

  private endpoint = 'app/heroes';

  constructor(private http: Http) {}

  getAll(): Promise<Hero[]> {
    return this.http
      .get(this.endpoint)
      .toPromise()
      .then(response => response.json().data as Hero[])
      .catch(this.handleError);
  }

  get(id: number): Promise<Hero> {
    return this
      .getAll()
      .then(heroes => heroes.find(hero => hero.id === id));
  }

  search(term: string): Observable<Hero[]> {
    return this.http
      .get(`${this.endpoint}/?name=${term}`)
      .map((r: Response) => r.json().data as Hero[]);
  }

  save(hero: Hero): Promise<Hero> {
    if (hero.id) { return this.put(hero); }
    return this.post(hero);
  }

  delete(hero: Hero): Promise<Response> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let endpoint = `${this.endpoint}/${hero.id}`;

    return this.http
      .delete(endpoint, {headers: headers})
      .toPromise()
      .catch(this.handleError);
  }

  private post(hero: Hero): Promise<Hero> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(this.endpoint, JSON.stringify(hero), {headers: headers})
      .toPromise()
      .then(response => response.json().data)
      .catch(this.handleError);
  }

  private put(hero: Hero): Promise<Hero> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let endpoint = `${this.endpoint}/${hero.id}`;

    return this.http
      .put(endpoint, JSON.stringify(hero), {headers: headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('[HeroService] an error occurred:', error);
    return Promise.reject(error.message || error);
  }
}
