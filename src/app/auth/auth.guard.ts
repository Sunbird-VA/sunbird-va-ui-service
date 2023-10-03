import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable()
export class AuthGuard extends KeycloakAuthGuard {

  constructor(protected override router: Router, protected override keycloakAngular: KeycloakService) {
    super(router, keycloakAngular);
  }


  public async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    return new Promise((resolve, reject) => {
      // Force the user to log in if currently unauthenticated.
      if (!this.authenticated) {
//	      setTimeout(() => {
       // this.keycloak.isLoggedIn().then(b => console.warn({b}))
        this.keycloakAngular.login({
          redirectUri: window.location.origin+ "/#/bot",
        });
        resolve(false)
        return
//	}, 1000);
      }

      // Get the roles required from the route.
      const requiredRoles = route.data['roles'] || [];
      let granted: boolean = false
      // Allow the user to to proceed if no additional roles are required to access the route.
      if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
        granted = true;
      } else {
        for (const requiredroles of requiredRoles) {
          if (this.roles.indexOf(requiredroles) > -1) {
            granted = true;
            break;
          }
        }
      }

      // Allow the user to proceed if all the required roles are present.
      if (granted == false) {
        resolve(granted)
      }
       
      resolve(granted)
    })

  }

}
