import { Component } from '@angular/core'
import { Warehouse } from '../shared/warehouse.model'

@Component({
  selector: 'app-warehouse-list',
  templateUrl: 'warehouse-list.component.html',
  styleUrls: ['warehouse-list.component.scss']
})

export class WarehouseListComponent {

  warehouses: Warehouse[] = []

  isVisible = false

  warehouseAdded(warehouse: Warehouse) {
    this.warehouses.push(warehouse)
    this.isVisible = false
  }

  onClickAdd(e) {
    this.isVisible = true
  }
}
