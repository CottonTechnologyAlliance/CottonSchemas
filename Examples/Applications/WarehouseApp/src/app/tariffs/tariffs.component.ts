import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core'


import { JsonEditorComponent } from '../json-editor/json-editor.component'
import { SchemaService } from '../shared/schema.service'

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

  warehouseTariffSchema
  entitySchema
  generalSchema

  tariffsJson

  @ViewChild(JsonEditorComponent) jsonEditorComponent: JsonEditorComponent

  constructor(private service: SchemaService) {}

  ngOnInit() {

    this.tariffsJson = this.warehouse.tariffs

    console.log(this.warehouse)

    this.warehouse.tariffs.warehouseIdentity.entityName = this.warehouse.name
    this.warehouse.tariffs.warehouseIdentity.entityType.warehouseCode = this.warehouse.code

    this.getTariffSchema()
    this.getEntitySchema()
    this.getGeneralSchema()
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

  getTariffSchema() {
    this.service.getTariffSchema()
      .subscribe(data => {
        this.warehouseTariffSchema = data
        console.log(this.warehouseTariffSchema)
      })
  }

  getEntitySchema() {
    this.service.getEntitySchema()
      .subscribe(data => {
        this.entitySchema = data
        console.log(this.entitySchema)
      }
    )
  }

  getGeneralSchema() {
    this.service.getGeneralSchema()
      .subscribe(data => {
        this.generalSchema = data
        console.log(this.generalSchema)
      }
    )
  }

  jsonChange(json) {
    this.tariffsJson = JSON.parse(JSON.stringify(json))
    this.warehouse.tariffs = this.tariffsJson
    this.warehouse.name = this.warehouse.tariffs.warehouseIdentity.entityName
    this.warehouse.code = this.warehouse.tariffs.warehouseIdentity.entityType.warehouseCode
    this.isSchemaEdit = false
    this.isForm = true
  }
}
