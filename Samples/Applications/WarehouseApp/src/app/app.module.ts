import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { TariffFormComponent, TariffsComponent, WarehouseComponent, WarehouseFormComponent, WarehouseListComponent } from './index'
import { JsonEditorComponent } from './json-editor/json-editor.component'
import { SchemaService } from './shared/schema.service'

@NgModule({
  declarations: [
    AppComponent,
    JsonEditorComponent,
    TariffFormComponent,
    TariffsComponent,
    WarehouseComponent,
    WarehouseFormComponent,
    WarehouseListComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SchemaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
