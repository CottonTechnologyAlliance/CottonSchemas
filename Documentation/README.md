# JSON Validation

#### The tools below allow the JSON to be validated:

    * [JsonValidator](https://www.jsonschemavalidator.net/)
    * [JsonValidation](https://json-schema-validator.herokuapp.com/)

#### Notes for JSON

    * Case Matters
        
        * This will FAIL

        ...json
        "beginDate": { 
            "title": "Begin Date",
            "description": "The effective date of the warehouse tariff.",
            "type": "string",
            "format": "date"
        }...