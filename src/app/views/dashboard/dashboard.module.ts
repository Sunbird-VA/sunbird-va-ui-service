import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  NavModule,
  ProgressModule,
  TableModule,
  TabsModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

// import { WidgetsModule } from '../widgets/widgets.module';
import { MaterialModule } from '../../material/material.module';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { ShowdownModule } from 'ngx-showdown';
import { NcfSharedModule } from 'src/app/ncf-shared/ncf-shared.module';
import { LimitationAndCapabilitiesComponent } from './components/limitation-and-capabilities/limitation-and-capabilities.component';
import { ResponseListComponent } from './components/response-list/response-list.component';

@NgModule({
  imports: [
    DashboardRoutingModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    ChartjsModule,
    AvatarModule,
    TableModule,
    // WidgetsModule,
    MaterialModule,
    NgxTypedJsModule,
    ShowdownModule.forRoot({emoji: true, noHeaderId: true, flavor: 'github'}),
    NcfSharedModule,
    FormsModule
  ],
  declarations: [DashboardComponent, LimitationAndCapabilitiesComponent, ResponseListComponent],
  providers:[],
  entryComponents: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class DashboardModule {
}
