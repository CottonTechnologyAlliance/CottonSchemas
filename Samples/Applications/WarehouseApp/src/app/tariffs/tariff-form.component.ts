import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'

import { Warehouse } from '../shared/warehouse.model'

function validNumber(c: AbstractControl): { [key: string]: boolean } | null {
  const pattern = /^[0-9]+(.[0-9]{0,2})?$/
  if (c.touched || c.dirty || c.invalid) {
    if (c.value < 0 || c.value > 50 || !pattern.test(c.value) ) {
      return {'invalidNumber': true}
    }
  return null
  }
}

function validID (c: AbstractControl): { [key: string]: boolean } | null {
  if (isNaN(c.value) || c.value < 0) {
    return {'invalidID': true}
  }
  return null
}

function validCurrency (c: AbstractControl): { [key: string]: boolean } | null {
  const currencyArray = ['EUR', 'GBP', 'USD', 'CNY']
  if ( currencyArray.indexOf(c.value) === -1 ) {
    return {'invalidCurrency': true}
  }
  return null
}

function validDate (c: AbstractControl): { [key: string]: boolean } | null {
  const begin = c.get('beginDate')
  const end = c.get('endDate')
  if (!begin || !end) {
    return null
  }
  return begin.value > end.value ? { 'invalidDate': true } : null
}

function returnPristine (c: AbstractControl): { [key: string]: boolean } | null {
  const addressType = c.get('addressType').value
  const addressLine1 = c.get('addressLine1').value
  const addressLine2 = c.get('addressLine2').value
  const city = c.get('city').value
  const stateProvince = c.get('stateProvince').value
  const zipPostalCode = c.get('zipPostalCode').value
  const country = c.get('country').value
  if (c.untouched || c.pristine) {
    return null
  } else if (c.dirty) {
    // tslint:disable-next-line:max-line-length
    if (addressType === 'Primary' && addressLine1 === '' && addressLine2 === '' && city === '' && stateProvince === '' && zipPostalCode === '' && country === 'USA') {
      return null
    } else if (addressLine1 === '' || city === '' || stateProvince === '' || zipPostalCode === '') {
      return { 'isDirty': true}
    }
  }
}

@Component({
  selector: 'app-tariff-form',
  templateUrl: 'tariff-form.component.html',
})

export class TariffFormComponent implements OnInit {

  @Input() warehouse: Warehouse
  @Output() formSubmit = new EventEmitter<Warehouse>()

  tariffForm: FormGroup

  get entityAddress(): FormArray {
    return <FormArray>this.tariffForm.get('warehouseIdentity.entityAddress')
  }

  constructor(private builder: FormBuilder) {}

  ngOnInit() {
    console.log(this.warehouse)

    this.tariffForm = this.builder.group({
      warehouseIdentity: this.builder.group({
        entityID: [this.warehouse.tariffs.warehouseIdentity.entityID, [Validators.required, validID]],
        entityName: [this.warehouse.tariffs.warehouseIdentity.entityName, Validators.required],
        entityAddress: this.builder.array([]),
        entityType: this.builder.group({
          warehouseCode: [this.warehouse.tariffs.warehouseIdentity.entityType.warehouseCode, Validators.required],
          warehouseLicense: [this.warehouse.tariffs.warehouseIdentity.entityType.warehouseLicense],
          warehouseCert: [this.warehouse.tariffs.warehouseIdentity.entityType.warehouseCert]
        })
      }),
      currency: this.builder.group({
        currencyType: [this.warehouse.tariffs.currency.currencyType, [Validators.required, validCurrency]]
      }),
      unit: this.builder.group({
        unitType: [this.warehouse.tariffs.unit.unitType, Validators.required]
      }),
      warehouseTariffDate: this.builder.group({
        beginDate: [this.warehouse.tariffs.warehouseTariffDate.beginDate, Validators.required],
        endDate: [this.warehouse.tariffs.warehouseTariffDate.endDate, Validators.required]
      }, {validator: validDate}),
      warehouseReceiving: this.builder.group({
        receivingRate: [this.warehouse.tariffs.warehouseReceiving.receivingRate, [Validators.required, validNumber]],
        receivingCertRate: [this.warehouse.tariffs.warehouseReceiving.receivingCertRate, validNumber]
      }),
      warehouseStorage: this.builder.group({
        storageRate: [this.warehouse.tariffs.warehouseStorage.storageRate, [Validators.required, validNumber]],
        storageCertRate: [this.warehouse.tariffs.warehouseStorage.storageCertRate, validNumber],
        storageInsuranceRate: [this.warehouse.tariffs.warehouseStorage.storageInsuranceRate, validNumber],
      }),
      warehouseLoading: this.builder.group({
        loadingRate: [this.warehouse.tariffs.warehouseLoading.loadingRate, [Validators.required, validNumber]]
      }),
      warehouseCompression: this.builder.group({
        compressionRate: [this.warehouse.tariffs.warehouseCompression.compressionRate, [Validators.required, validNumber]],
        compressionPatchRate: [this.warehouse.tariffs.warehouseCompression.compressionPatchRate, validNumber],
        compressionExtraRate: [this.warehouse.tariffs.warehouseCompression.compressionExtraRate, validNumber]
      }),
      warehouseMarking: this.builder.group({
        markingRate: [this.warehouse.tariffs.warehouseMarking.markingRate, [Validators.required, validNumber]],
        markingExtraRate: [this.warehouse.tariffs.warehouseMarking.markingExtraRate, validNumber]
      }),
      warehouseClassing: this.builder.group({
        samplingShipmentRate: [this.warehouse.tariffs.warehouseClassing.samplingShipmentRate, [Validators.required, validNumber]],
        samplingStorageRate: [this.warehouse.tariffs.warehouseClassing.samplingStorageRate, [Validators.required, validNumber]],
        samplingOneSideRate: [this.warehouse.tariffs.warehouseClassing.samplingOneSideRate, validNumber],
        classingCertRate: [this.warehouse.tariffs.warehouseClassing.classingCertRate, validNumber]
      }),
      warehouseWeighing: this.builder.group({
        weighingShipmentRate: [this.warehouse.tariffs.warehouseWeighing.weighingShipmentRate, [Validators.required, validNumber]],
        weighingStorageRate: [this.warehouse.tariffs.warehouseWeighing.weighingStorageRate, [Validators.required, validNumber]],
        weighingAndSamplingRate: [this.warehouse.tariffs.warehouseWeighing.weighingAndSamplingRate, [Validators.required, validNumber]]
      }),
      miscellaneous: this.builder.group({
        receivingAdditionalFee: [this.warehouse.tariffs.miscellaneous.receivingAdditionalFee, validNumber],
        samplingExtraRate: [this.warehouse.tariffs.miscellaneous.samplingExtraRate, validNumber],
        samplingSortingRate: [this.warehouse.tariffs.miscellaneous.samplingSortingRate, validNumber],
        samplingDeliveryRate: [this.warehouse.tariffs.miscellaneous.samplingDeliveryRate, validNumber],
        samplingSackRate: [this.warehouse.tariffs.miscellaneous.samplingSackRate, validNumber],
        samplingHolesRate: [this.warehouse.tariffs.miscellaneous.samplingHolesRate, validNumber],
        weighingSheetsRate: [this.warehouse.tariffs.miscellaneous.weighingSheetsRate, validNumber],
        typingUnderRate: [this.warehouse.tariffs.miscellaneous.typingUnderRate, validNumber],
        typingOverRate: [this.warehouse.tariffs.miscellaneous.typingOverRate, validNumber],
        reconditioningBrushingRate: [this.warehouse.tariffs.miscellaneous.reconditioningBrushingRate, validNumber],
        reconditioningDryingRate: [this.warehouse.tariffs.miscellaneous.reconditioningDryingRate, validNumber],
        reconditioningDamagedRate: [this.warehouse.tariffs.miscellaneous.reconditioningDamagedRate, validNumber],
        reconditioningBailingRate: [this.warehouse.tariffs.miscellaneous.reconditioningBailingRate, validNumber],
        reconditioningFumigationRate: [this.warehouse.tariffs.miscellaneous.reconditioningFumigationRate, validNumber],
        phytosanitaryRate: [this.warehouse.tariffs.miscellaneous.phytosanitaryRate, validNumber],
        receivingBlockRate: [this.warehouse.tariffs.miscellaneous.receivingBlockRate, validNumber],
        storageBlockRate: [this.warehouse.tariffs.miscellaneous.storageBlockRate, validNumber],
        loadingBlockRate: [this.warehouse.tariffs.miscellaneous.loadingBlockRate, validNumber],
        loadingExpeditedRate: [this.warehouse.tariffs.miscellaneous.loadingExpeditedRate, validNumber],
        loadingFlatbedRate: [this.warehouse.tariffs.miscellaneous.loadingFlatbedRate, validNumber],
        handlingTransitRate: [this.warehouse.tariffs.miscellaneous.handlingTransitRate, validNumber],
        unloadingRate: [this.warehouse.tariffs.miscellaneous.unloadingRate, validNumber],
        rehandlingRate: [this.warehouse.tariffs.miscellaneous.rehandlingRate, validNumber],
        rearrangingRate: [this.warehouse.tariffs.miscellaneous.rearrangingRate, validNumber],
        consolidationRate: [this.warehouse.tariffs.miscellaneous.consolidationRate, validNumber],
        surchargeFee: [this.warehouse.tariffs.miscellaneous.surchargeFee, validNumber],
        matchingTagsRate: [this.warehouse.tariffs.miscellaneous.matchingTagsRate, validNumber],
        shippingTagsRate: [this.warehouse.tariffs.miscellaneous.shippingTagsRate, validNumber],
        shippingExtraTiesRate: [this.warehouse.tariffs.miscellaneous.shippingExtraTiesRate, validNumber],
        shippingBoltSealRate: [this.warehouse.tariffs.miscellaneous.shippingBoltSealRate, validNumber],
        shippingDrayageRate: [this.warehouse.tariffs.miscellaneous.shippingDrayageRate, validNumber],
        shippingOnHoldRate: [this.warehouse.tariffs.miscellaneous.shippingOnHoldRate, validNumber],
        shippingEarlyOrderRate: [this.warehouse.tariffs.miscellaneous.shippingEarlyOrderRate, validNumber],
        shippingChangeOrderRate: [this.warehouse.tariffs.miscellaneous.shippingChangeOrderRate, validNumber],
        shippingConversionOrderRate: [this.warehouse.tariffs.miscellaneous.shippingConversionOrderRate, validNumber],
        shippingSwappingOrderRate: [this.warehouse.tariffs.miscellaneous.shippingSwappingOrderRate, validNumber],
        shippingResaleOrderRate: [this.warehouse.tariffs.miscellaneous.shippingResaleOrderRate, validNumber],
        shippingDelayedPickUpRate: [this.warehouse.tariffs.miscellaneous.shippingDelayedPickUpRate, validNumber],
        shippingCancellationRate: [this.warehouse.tariffs.miscellaneous.shippingCancellationRate, validNumber],
        receiptConversionRate: [this.warehouse.tariffs.miscellaneous.receiptConversionRate, validNumber],
        rangingInspectionRate: [this.warehouse.tariffs.miscellaneous.rangingInspectionRate, validNumber]
      })
    })

    this.patch()
  }

  onSubmit() {
    this.warehouse.tariffs = this.tariffForm.value
    this.warehouse.name = this.tariffForm.get('warehouseIdentity.entityName').value
    this.warehouse.code = this.tariffForm.get('warehouseIdentity.entityType.warehouseCode').value
    this.formSubmit.emit(this.warehouse)
    this.tariffForm.reset()
  }

  onClickBack(e) {
    this.formSubmit.emit(this.warehouse)
  }

  patch() {
    const control = <FormArray>this.tariffForm.get('warehouseIdentity.entityAddress')
    this.warehouse.tariffs.warehouseIdentity.entityAddress.forEach(x => {
      control.push(this.patchValues(x.addressType, x.addressLine1, x.addressLine2, x.city, x.stateProvince, x.zipPostalCode, x.country))
    })
  }

  patchValues(addressType, addressLine1, addressLine2, city, stateProvince, zipPostalCode, country) {
    return this.builder.group({
      addressType: [addressType],
      addressLine1: [addressLine1],
      addressLine2: [addressLine2],
      city: [city],
      stateProvince: [stateProvince],
      zipPostalCode: [zipPostalCode],
      country: [country]
    }, {validator: returnPristine})
  }

  addAddress(): void {
    this.patch()
  }

  deleteAddress(index: number) {
    const control = <FormArray>this.tariffForm.get('warehouseIdentity.entityAddress')
    control.removeAt(index)
  }
}
