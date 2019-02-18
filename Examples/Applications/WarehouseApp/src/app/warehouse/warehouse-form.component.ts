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


       // Form Builder
    // this.warehouseForm = this.fb.group({
    //   name: [''],
    //   code: ['']
    // })
          // returns whole form structure
    // this.warehouseForm.value
          // returns specific value for that form control
    // this.warehouseForm.get('code').value
          // sets values for everything in form
    // this.warehouseForm.setValue({ name: 'somthing', code: 'something'})
          // sets one value in form
    // this.warehouseForm.patchValue({ name: 'somthing' })
          // Can be used in console to monitor object values ($0) means current selection, could also use querySelector etc as parameter
    // ng.probe($0).componentInstance.warehouse
