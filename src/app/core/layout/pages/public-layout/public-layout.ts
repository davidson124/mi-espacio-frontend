import { Component } from '@angular/core';
import { PublicHeaderComponent } from '../../components/public-header/public-header';
import { PublicStatsComponent } from '../../components/public-stats/public-stats';
import { PublicFooterComponent } from '../../components/public-footer/public-footer';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [PublicHeaderComponent, PublicStatsComponent, PublicFooterComponent],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.scss',
})
export class PublicLayoutComponent {

}
