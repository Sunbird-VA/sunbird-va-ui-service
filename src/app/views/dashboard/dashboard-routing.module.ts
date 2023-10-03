import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { DashboardComponent } from './dashboard.component';
import { ResponseListComponent } from './components/response-list/response-list.component';
import {ROLES} from 'src/app/auth/roles';

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    component: DashboardComponent,
    // data: {
    //   title: $localize`Dashboard`
    // }
  },
  {
    path: "list",
    canActivate: [AuthGuard],
    component: ResponseListComponent,
    data: {
      roles: [ROLES.ADMIN]
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
