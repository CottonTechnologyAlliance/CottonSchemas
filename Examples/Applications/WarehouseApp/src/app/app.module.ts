import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { TariffFormComponent, TariffsComponent, WarehouseComponent, WarehouseFormComponent, WarehouseListComponent } from './index'

import { JsonEditorComponent } from './json-editor/json-editor.component'

@NgModule({
  declarations: [
    AppComponent,
    TariffFormComponent,
    TariffsComponent,
    JsonEditorComponent,
    WarehouseComponent,
    WarehouseFormComponent,
    WarehouseListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
