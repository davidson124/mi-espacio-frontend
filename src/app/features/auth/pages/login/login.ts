import { Component } from '@angular/core';
import { PublicLayoutComponent } from '../../../../core/layout/pages/public-layout/public-layout';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [ PublicLayoutComponent ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {

}
