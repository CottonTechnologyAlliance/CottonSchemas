import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Warehouse } from '../shared/warehouse.model'

@Component({
  selector: 'app-warehouse-form',
  templateUrl: 'warehouse-form.component.html'
})

export class WarehouseFormComponent implements OnInit {

  warehouseForm: FormGroup
  warehouse: Warehouse

  @Output() warehouseAdded = new EventEmitter<Warehouse>()

  ngOnInit() {
    this.warehouseForm = new FormGroup({
      name: new FormControl(''),
      code: new FormControl('')
    })
  }

  onSubmit() {
    this.warehouse = new Warehouse()
    this.warehouse.code = this.warehouseForm.value.code
    this.warehouse.name = this.warehouseForm.value.name
    this.warehouseAdded.emit(this.warehouse)
    this.warehouseForm.reset()
  }
}
