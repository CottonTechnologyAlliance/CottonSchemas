export class Warehouse {
  name = ''
  code = ''
  tariffs = {
    warehouseIdentity: {
      entityID: '',
      entityName: '',
      entityAddress: [] = [{
        addressType: 'Primary',
        addressLine1: '',
        addressLine2: '',
        city: '',
        stateProvince: '',
        zipPostalCode: '',
        country: 'USA'
      }],
      entityType: {
        warehouseCode: '',
        warehouseLicense: '',
        warehouseCert: false
      }
    },
    currency: {
      currencyType: 'USD'
    },
    unit: {
      unitType: 'bale'
    },
    warehouseTariffDate: {
      beginDate: '',
      endDate: ''
    },
    warehouseReceiving: {
      receivingRate: 0,
      receivingCertRate: 0
    },
    warehouseStorage: {
      storageRate: 0,
      storageCertRate: 0,
      storageInsuranceRate: 0
    },
    warehouseLoading: {
      loadingRate: 0
    },
    warehouseCompression: {
      compressionRate: 0,
      compressionPatchRate: 0,
      compressionExtraRate: 0
    },
    warehouseMarking: {
      markingRate: 0,
      markingExtraRate: 0
    },
    warehouseClassing: {
      samplingShipmentRate: 0,
      samplingStorageRate: 0,
      samplingOneSideRate: 0,
      classingCertRate: 0
    },
    warehouseWeighing: {
      weighingShipmentRate: 0,
      weighingStorageRate: 0,
      weighingAndSamplingRate: 0
    },
    miscellaneous: {
      receivingAdditionalFee: 0,
      samplingExtraRate: 0,
      samplingSortingRate: 0,
      samplingDeliveryRate: 0,
      samplingSackRate: 0,
      samplingHolesRate: 0,
      weighingSheetsRate: 0,
      typingUnderRate: 0,
      typingOverRate: 0,
      reconditioningBrushingRate: 0,
      reconditioningDryingRate: 0,
      reconditioningDamagedRate: 0,
      reconditioningBailingRate: 0,
      reconditioningFumigationRate: 0,
      phytosanitaryRate: 0,
      receivingBlockRate: 0,
      storageBlockRate: 0,
      loadingBlockRate: 0,
      loadingExpeditedRate: 0,
      loadingFlatbedRate: 0,
      handlingTransitRate: 0,
      unloadingRate: 0,
      rehandlingRate: 0,
      rearrangingRate: 0,
      consolidationRate: 0,
      surchargeFee: 0,
      matchingTagsRate: 0,
      shippingTagsRate: 0,
      shippingExtraTiesRate: 0,
      shippingBoltSealRate: 0,
      shippingDrayageRate: 0,
      shippingOnHoldRate: 0,
      shippingEarlyOrderRate: 0,
      shippingChangeOrderRate: 0,
      shippingConversionOrderRate: 0,
      shippingSwappingOrderRate: 0,
      shippingResaleOrderRate: 0,
      shippingDelayedPickUpRate: 0,
      shippingCancellationRate: 0,
      receiptConversionRate: 0,
      rangingInspectionRate: 0
    }
  }
}
