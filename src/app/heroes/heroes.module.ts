import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeroDetailComponent } from './hero-detail.component';
import { HeroesComponent } from './heroes.component';
import { HeroSearchComponent } from './hero-search.component';
import { HeroService } from '../common/hero.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    HeroDetailComponent,
    HeroesComponent,
    HeroSearchComponent
  ],
  exports: [
    HeroSearchComponent
  ],
  providers: [
    HeroService
  ]
})
export class HeroesModule {}
