import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from '../common/hero';
import { HeroService } from '../common/hero.service';

@Component({
  selector: 'my-heroes',
  styleUrls: ['./heroes.component.sass'],
  templateUrl: './heroes.component.pug'
})
export class HeroesComponent implements OnInit {

  addingHero = false;
  error: any;
  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private router: Router,
    private heroService: HeroService
  ) {}

  ngOnInit() {
    this.getHeroes();
  }

  addHero() {
    this.addingHero = true;
    this.selectedHero = null;
  }

  close(hero: Hero = null) {
    this.addingHero = false;
    if (hero) { this.getHeroes(); }
  }

  deleteHero(hero: Hero, event: any) {
    event.stopPropagation();
    this.heroService
      .delete(hero)
      .then(result => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null; }
      })
      .catch(error => this.error = error);
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }

  gotoDetail() {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  private getHeroes() {
    this.heroService
      .getAll()
      .then(heroes => this.heroes = heroes);
  }
}
