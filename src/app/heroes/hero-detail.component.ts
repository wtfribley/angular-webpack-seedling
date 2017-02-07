import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Hero } from '../common/hero';
import { HeroService } from '../common/hero.service';

@Component({
  selector: 'my-hero-detail',
  templateUrl: './hero-detail.component.pug'
})
export class HeroDetailComponent implements OnInit, OnDestroy {

  @Input()
  hero: Hero;

  @Output()
  close = new EventEmitter();

  error: any;
  navigated = false;
  sub: Subscription;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe((params: any) => {
      if (params.id == null) {
        this.navigated = false;
        this.hero = new Hero();
        return;
      }

      let id = +params.id; // + coerces the param str to int.
      this.navigated = true;
      this.heroService
        .get(id)
        .then(hero => this.hero = hero);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  save() {
    this.heroService
      .save(this.hero)
      .then(hero => {
        this.hero = hero;
        this.goBack(hero);
      })
      // @TODO: display an error message.
      .catch(error => this.error = error);
  }

  goBack(hero: Hero = null) {
    this.close.emit(hero);
    if (this.navigated) { window.history.back(); }
  }
}
