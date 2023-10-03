import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './containers';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';

const routes: Routes = [
 
  {
    path: '',
    component: HomeComponent,
    data: { roles: ["Public"] },
  },
  {
    path: 'tnc',
    component: TermsAndConditionsComponent,
    data: { roles: ["Public"] },
  },
  {
    path: 'bot',
    loadChildren: () =>
      import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
     initialNavigation: 'enabledNonBlocking',
     preloadingStrategy: PreloadAllModules,
      useHash: true,
      relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
