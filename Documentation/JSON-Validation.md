# JSON Validation

#### The tools below allow the JSON to be validated.

* [JsonValidator](https://www.jsonschemavalidator.net/)
* [JsonValidation](https://json-schema-validator.herokuapp.com/)

#### Notes For JSON
* Steps to Use Online Validation Tools
  
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
  
#### More information about JSON and JSON Schemas can be found at:

* [JSON Schema](http://json-schema.org/)
* [JSON Spec Documentation](http://www.json.org/)
* [JSON Information](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON)