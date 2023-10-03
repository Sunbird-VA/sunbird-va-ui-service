import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './service/auth.service';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializer } from './keycloak-initializer';



@NgModule({
  declarations: [],
  imports: [],
  providers: [
    AuthGuard,
    AuthService
  ]
})
export class AuthModule { }
