# JSON Validation Guide

#### The tools below allow the JSON to be validated.

* [JsonValidator](https://www.jsonschemavalidator.net/)
* [JsonEditor](https://jsoneditoronline.org//)

#### Notes For JSON Validations
* To use JSON Schema Validator
  
1. Paste JSON Schema into the left schema box.
2. Paste JSON/Data to test in the right box.
3. The text below the boxes alert you if the data validates or fails. 

![alt text](/Images/validate.PNG)

* Case Matters
  * This will **FAIL**

  ```json
  {
   "$schema": "http://json-schema.org/draft-04/schema#",
   "title": "Product",
   "description": "A product from Acme's catalog",
   "type": "object",
	
   "properties": {
	
      "id": {
         "description": "The unique identifier for a product",
         "type": "integer"
      },
		
      "name": {
         "description": "Name of the product",
         "type": "string"
      },
		
      "price": {
         "type": "number",
         "minimum": 0,
         "exclusiveMinimum": true
      }
   },
	
   "required": ["id", "name", "price"]
  }
  ```

  ```json
  {
      "id": 2,
      "Name": "An ice sculpture",
      "Price": 12.50,
   }
  ```

  * This will **PASS**

  ```json
  {
   "$schema": "http://json-schema.org/draft-04/schema#",
   "title": "Product",
   "description": "A product from Acme's catalog",
   "type": "object",
	
   "properties": {
	
      "id": {
         "description": "The unique identifier for a product",
         "type": "integer"
      },
		
      "name": {
         "description": "Name of the product",
         "type": "string"
      },
		
      "price": {
         "type": "number",
         "minimum": 0,
         "exclusiveMinimum": true
      }
   },
	
   "required": ["id", "name", "price"]
}
  ```

  ```json
  {
      "id": 2,
      "name": "An ice sculpture",
      "price": 12.50,
   }
  ```
  
* To use JSON Editor

1. Copy and paste the schema into the left box.
2. Click the "Save" button on the bar at the top of the editor and "Save Online".
3. Click on "Settings" on the bar at the top of the editor and choose "Add Schema". From here you can choose the schema you just saved online and set it.
4. Click "New" on the bar at the top of the editor and copy your json data into the left box. This will validate against whatever schema is selected under "Settings".

#### More information about JSON and JSON Schemas can be found at:

* [JSON Schema](http://json-schema.org/)
* [JSON Spec Documentation](http://www.json.org/)
* [JSON Information](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON)

json schema with niem http://niem.github.io/json/reference/json-schema/

#### Niem

* https://tools.niem.gov/niemtools/ssgt/SSGT-GetNamespace.iepd?namespaceKey=o1-15
* http://niem.github.io/movement/json-schema-output/
* https://www.astcorporation.com/pdf/Soa/Building_an_IEPD_for_NIEM_Data_Model.pdf