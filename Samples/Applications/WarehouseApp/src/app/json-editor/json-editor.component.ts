import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core'

import Ajv from 'ajv'
import { saveAs } from 'file-saver'
import JSONEditor from 'jsoneditor'
import { merge } from 'lodash'

import addressSchema from '../shared/addressSchema.json'

export type JSONEditorModes = 'tree' | 'view' | 'form' | 'code' | 'text'

@Component({
  selector: 'app-json-editor',
  templateUrl: './json-editor.component.html',
  styleUrls: ['./json-editor.component.scss']
})

export class JsonEditorComponent implements OnInit {

  @Input() warehouseTariff
  @Input() entity
  @Input() general
  @Input() json

  isLoad = false
  isChangeSchema = false

  jsonEditor
  tariffJson
  warehouseTariffSchema
  entitySchema
  generalSchema

  addressSchema = addressSchema
  addressJson = {
    'address': [{
      'addressType': '',
      'addressLine1': '',
      'addressLine2': '',
      'city': '',
      'stateProvince': '',
      'zipPostalCode': '',
      'country': ''
    }]
  }

  @Output() jsonChange = new EventEmitter<any>()

  @ViewChild('jsonEditorElem') jsonEditorElem: ElementRef<HTMLDivElement>

  fileReader = new FileReader()

  setOptions() {
    const options = {
      mode: 'tree',
      modes: ['tree', 'code', 'text'],
      schema: this.warehouseTariffSchema,
      schemaRefs: {
        '#/definitions/rateAmount': this.warehouseTariffSchema.definitions.rateAmount,
        'entitySchema.json#/definitions/entity': this.entitySchema.definitions.entity,
        'generalSchema.json#/definitions/name': this.generalSchema.definitions.name,
        'generalSchema.json#/definitions/addressFullText': this.generalSchema.definitions.addressFullText,
        'entitySchema.json#/definitions/entityType': this.entitySchema.definitions.entity.properties.entityType,
        '#/definitions/entityWarehouse': this.entitySchema.definitions.entityWarehouse,
        'generalSchema.json#/definitions/currencyCodeType': this.generalSchema.definitions.currencyCodeType,
        'generalSchema.json#/definitions/unitStandard': this.generalSchema.definitions.unitStandard,
        'generalSchema.json#/definitions/date': this.generalSchema.definitions.date,
        'generalSchema.json#/definitions/telephoneNumber': this.generalSchema.definitions.telephoneNumber,
        'generalSchema.json#/definitions/email': this.generalSchema.definitions.email
      },
      name: 'Warehouse Schema',
      onEditable: function () {
        return {
          field: false,
          value: true
        }
      },
      ajv: Ajv({ schemaId: '$id', allErrors: true })
    }
    return options
  }

  ngOnInit() {
    this.warehouseTariffSchema = this.warehouseTariff
    this.entitySchema = this.entity
    this.generalSchema = this.general
    this.tariffJson = this.json
    this.jsonEditor = new JSONEditor(this.jsonEditorElem.nativeElement, this.setOptions(), this.tariffJson)
    this.jsonEditor.expandAll()
  }

  onClickBack() {
    this.jsonChange.emit(this.json)
  }

  onClickSave() {
    if (this.jsonEditor.options.schema === this.addressSchema) {
      alert('This is a demo schema. Cannot be saved.')
      return
    }
    const json = this.jsonEditor.get()
    this.jsonEditor.update(json)
    const errors = this.jsonEditor.validateSchema(json)
    if (errors) {
      this.json = json
      console.log(this.json)
      this.jsonChange.emit(this.json)
    } else {
      alert('Please make sure your info is valid.')
    }
  }

  onClickImport() {
    if (this.jsonEditor.options.schema === this.addressSchema) {
      alert('This is a demo schema. Cannot be saved.')
      return
    }
    this.isLoad = !this.isLoad
  }

  onLoadDocument(e) {
    this.readThis(e.target)
  }

  readThis(input) {
    const file: File = input.files[0]
    this.fileReader.readAsText(file)
    this.fileReader.onloadend = (e) => {
      const newJson = this.fileReader.result
      this.jsonEditor.updateText(newJson)
      const addJson = this.jsonEditor.get()
      this.jsonEditor.update(merge(this.json, addJson))
      this.jsonEditor.expandAll()
    }
    this.isLoad = false
  }

  onClickExport() {
    if (this.jsonEditor.options.schema === this.addressSchema) {
      alert('This is a demo schema. Cannot be saved.')
      return
    }

    let fname = window.prompt('Save as...')
    if (fname.indexOf('.') === -1) {
      fname = fname + '.json'
    } else {
      fname = fname.split('.')[0] + '.json'
    }

    const blob = new Blob([JSON.stringify(this.jsonEditor.get(), null, 2)], {type: 'application/json;charset=utf-8'})
    saveAs(blob, fname)
  }

  onClickChangeSchema(e) {
    this.isChangeSchema = true
  }

  changeSchema(e) {
    const currentJson = this.jsonEditor.get()
    if (e.target.value === 'tariff') {
      if (this.jsonEditor.options.schema === this.warehouseTariffSchema) {
        this.isChangeSchema = false
      } else {
        this.addressJson = currentJson
        this.jsonEditor.setSchema(this.warehouseTariffSchema, {
          '#/definitions/rateAmount': {'type': 'number', 'minimum': 0, 'maximum': 50},
          'entitySchema.json#/definitions/entity': {'type': 'object'},
          'entitySchema.json#/definitions/entityID': {'type': 'number'},
          'entitySchema.json#/definitions/entityName': {'type': 'string'},
          'entitySchema.json#/definitions/entityAddress': {'type': 'array'},
          'entitySchema.json#/definitions/entityType': {'type': 'object'},
          'generalSchema.json#/definitions/currencyCodeType': {'type': 'string', 'enum': ['EUR', 'GBP', 'USD', 'CNY'], 'default': 'USD'},
          'generalSchema.json#/definitions/unitStandard': {'type': 'string'},
          'generalSchema.json#/definitions/date': {'type': 'string', 'format': 'date'}
        })
        this.jsonEditor.set(this.tariffJson)
        this.jsonEditor.setName('Warehouse Schema')
        this.jsonEditor.expandAll()
        this.isChangeSchema = false
      }
    }
    if (e.target.value === 'address') {
      if (this.jsonEditor.options.schema === this.addressSchema) {
        this.isChangeSchema = false
      } else {
        this.tariffJson = currentJson
        this.jsonEditor.setSchema(this.addressSchema)
        this.jsonEditor.set(this.addressJson)
        this.jsonEditor.setName('Address Schema')
        this.jsonEditor.expandAll()
        this.isChangeSchema = false
      }
    }
  }
}
