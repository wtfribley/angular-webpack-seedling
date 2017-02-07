import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HeroService } from '../common/hero.service';
import { Hero } from '../common/hero';

@Component({
  selector: 'hero-search',
  templateUrl: './hero-search.component.pug'
})
export class HeroSearchComponent implements OnInit {

  heroes: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private heroService: HeroService,
    private router: Router
  ) {}

  ngOnInit() {
    this.heroes = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => {
        return term ? this.heroService.search(term) : Observable.of<Hero[]>([]);
      })
      .catch(error => {
        // @TODO: actual error handling
        console.error(error);
        return Observable.of<Hero[]>([]);
      });
  }

  // push a search term into the observable stream.
  search(term: string) {
    this.searchTerms.next(term);
  }

  gotoDetail(hero: Hero) {
    this.router.navigate(['/detail', hero.id]);
  }
}
