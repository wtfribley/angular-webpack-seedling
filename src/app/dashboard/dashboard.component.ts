import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from '../common/hero';
import { HeroService } from '../common/hero.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.pug'
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(
    private router: Router,
    private heroService: HeroService
  ) {}

  ngOnInit() {
    this.heroService
      .getAll()
      .then(heroes => this.heroes = heroes.slice(1, 5));
  }

  gotoDetail(hero: Hero) {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
