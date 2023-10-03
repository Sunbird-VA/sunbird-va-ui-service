import { KeycloakOptions, KeycloakService } from 'keycloak-angular';
import { environment } from '../../environments/environment';

export function initializer(keycloak: KeycloakService): () => Promise<boolean> {

    const options: KeycloakOptions = {
      config : environment.keycloak,
      loadUserProfileAtStartUp: true,
      initOptions: {
          // onLoad: 'check-sso',
           //onLoad: 'login-required',
          checkLoginIframe: false,
	        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
      },
      enableBearerInterceptor:false,
      bearerExcludedUrls: ['/login']
    };    

    return () => keycloak.init(options);
}
