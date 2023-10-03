import { APP_INITIALIZER, NgModule } from '@angular/core';
import { APP_BASE_HREF, HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import {NcfSharedModule} from './ncf-shared/ncf-shared.module';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import {NgxTypedJsModule} from 'ngx-typed-js';
import { DatePipe } from '@angular/common'

import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-perfect-scrollbar';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import {
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
} from './containers';

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
  
} from '@coreui/angular';

import { IconModule, IconSetService } from '@coreui/icons-angular';
import { HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http';
import { ShowdownModule } from 'ngx-showdown';
import { initializer } from './auth/keycloak-initializer';
import { HomeComponent } from './components/home/home.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { MaterialModule } from './material/material.module';
import { TncModalComponent } from './components/tnc-modal/tnc-modal.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
];




@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS, HomeComponent, TermsAndConditionsComponent, TncModalComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    AuthModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    PerfectScrollbarModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    HttpClientModule,
    KeycloakAngularModule,
   ShowdownModule,
   NgxTypedJsModule,
   NcfSharedModule,
   MaterialModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    {
      provide: APP_BASE_HREF, useValue: '/'
    },
    {
       provide: APP_INITIALIZER,
       useFactory: initializer,
       multi: true,
       deps: [KeycloakService],
    },
    IconSetService,
    Title,
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
