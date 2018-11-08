# JSON Validation

#### The tools below allow the JSON to be validated.

* [JsonValidator](https://www.jsonschemavalidator.net/)
* [JsonValidation](https://json-schema-validator.herokuapp.com/)

#### Notes For JSON

![alt text](/Images/validate.PNG)

* Case Matters
  * This will **FAIL**

  ```json
  "beginDate": { 
        "title": "Begin Date",
        "description": "The effective date of the warehouse tariff.",
        "type": "string",
        "format": "date"
    }
  ```

  ```json
  "BeginDate": "2018-11-06"
  ```

  * This will **PASS**

  ```json
  "beginDate": { 
        "title": "Begin Date",
        "description": "The effective date of the warehouse tariff.",
        "type": "string",
        "format": "date"
    }
  ```

  ```json
  "beginDate": "2018-11-06"
  ```
  
#### More information about JSON schemas can be found at:

* [JSONSchema](http://json-schema.org/)