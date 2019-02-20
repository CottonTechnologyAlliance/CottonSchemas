import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable()
export class SchemaService {
  constructor (private http: HttpClient) {}

  // tslint:disable-next-line:max-line-length
  tariffSchemaUrl = 'https://raw.githubusercontent.com/CottonTechnologyAlliance/CottonSchemas/master/Schemas/Warehouse%20Tariff/warehouseTariffSchema.json'

  entitySchemaUrl = 'https://raw.githubusercontent.com/CottonTechnologyAlliance/CottonSchemas/master/Schemas/Common/entitySchema.json'

  generalSchemaUrl = 'https://raw.githubusercontent.com/CottonTechnologyAlliance/CottonSchemas/master/Schemas/Common/generalSchema.json'

  getTariffSchema() {
    return this.http.get(this.tariffSchemaUrl)
  }

  getEntitySchema() {
    return this.http.get(this.entitySchemaUrl)
  }

  getGeneralSchema() {
    return this.http.get(this.generalSchemaUrl)
  }
}
