import { Component, Input } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Warehouse } from '../shared/warehouse.model'

@Component({
  selector: 'app-warehouse',
  templateUrl: 'warehouse.component.html',
  styleUrls: ['warehouse.component.scss']
})

export class WarehouseComponent {

  @Input() warehouse: Warehouse
  @Input() i: number

  warehouseEditForm: FormGroup
  isEditVisible = false
  isFormVisible = false


  constructor(private fb: FormBuilder) {
    this.warehouseEditForm = this.fb.group({
      name: [''],
      code: ['']
    })
  }

  onClickEdit(e) {
    this.isEditVisible = !this.isEditVisible
    this.isFormVisible = false
  }

  onClickDelete(e) {
    const div = e.target.parentNode.parentNode
    div.remove()
    this.isEditVisible = false
    this.isFormVisible = false
  }

  onSubmitEdit() {
    this.warehouse.name = this.warehouseEditForm.get('name').value
    this.warehouse.code = this.warehouseEditForm.get('code').value
    this.isEditVisible = false
  }

  onClickForm(e) {
    this.isFormVisible = !this.isFormVisible
  }

  isNotForm(e) {
    this.isEditVisible = false
    this.isFormVisible = false
  }
}

