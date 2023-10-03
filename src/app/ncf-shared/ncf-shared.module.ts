import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { MatDialogRef } from '@angular/material/dialog';
import { DefaultHeaderComponent } from './components/default-header/default-header.component';
import {
  AvatarModule,
  DropdownModule,
  GridModule,
  
} from '@coreui/angular';
import { NcfTableComponent } from './components/ncf-table/ncf-table.component';
import { LoaderComponent } from './components/loader/loader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DefaultHeaderComponent,
    NcfTableComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    GridModule,
    DropdownModule,
    AvatarModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: [DefaultHeaderComponent, NcfTableComponent, LoaderComponent],
  entryComponents: []
})
export class NcfSharedModule { }
