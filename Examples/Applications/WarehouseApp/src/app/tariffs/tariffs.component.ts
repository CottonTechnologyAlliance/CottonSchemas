import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core'


import { JsonEditorComponent } from '../json-editor/json-editor.component'

import tariffSchema from '../shared/tariffSchema.json'
import { Warehouse } from '../shared/warehouse.model'

@Component({
  selector: 'app-tariffs',
  templateUrl: 'tariffs.component.html',
  styleUrls: ['tariffs.component.scss']
})

export class TariffsComponent implements OnInit {

  @Input() warehouse: Warehouse
  @Input() i: number

  @Output() isNotForm = new EventEmitter()

  isForm = true
  isEdit = false
  isSchemaEdit = false
  isFormEdit = false

  warehouseCert: string

  tariffSchema = tariffSchema

  tariffsJson

  @ViewChild(JsonEditorComponent) jsonEditorComponent: JsonEditorComponent

  ngOnInit() {

    this.tariffsJson = this.warehouse.tariffs

    console.log(this.warehouse)
    console.log(this.tariffSchema)

    this.warehouse.tariffs.warehouseIdentity.entityName = this.warehouse.name
    this.warehouse.tariffs.warehouseIdentity.entityType.warehouseCode = this.warehouse.code
  }

  onClickEditTariffForm(e) {
    this.isForm = false
    this.isEdit = true
    this.isFormEdit = true
  }

  onClickEditTariffSchema(e) {
    this.isForm = false
    this.isEdit = true
    this.isSchemaEdit = true
  }

  onClickBack(e) {
    this.isForm = false
    this.isEdit = false
    this.isSchemaEdit = false
    this.isNotForm.emit(e)
  }

  formSubmit(warehouse: Warehouse) {
    this.warehouse = warehouse
    if (this.warehouse.tariffs.warehouseIdentity.entityType.warehouseCert === true) {
      this.warehouseCert = 'Yes'
    } else {
      this.warehouseCert = 'No'
    }
    this.isForm = true
    this.isEdit = false
    this.isFormEdit = false
    this.tariffsJson = this.warehouse.tariffs
  }

  jsonChange(json) {
    this.tariffsJson = JSON.parse(JSON.stringify(json))
    console.log(this.warehouse.tariffs)
    this.warehouse.tariffs = this.tariffsJson
    console.log(this.warehouse.tariffs)
    this.isSchemaEdit = false
    this.isForm = true
  }
}
