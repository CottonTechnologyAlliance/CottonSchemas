

# **Cotton Technology Alliance JSON Style Guide**

## **Introduction**

This style guide documents guidelines and recommendations for building JSON APIs for use in cotton industry systems. In general, JSON APIs should follow the spec found at [JSON.org](http://www.json.org/). This style guide clarifies and standardizes specific cases so that JSON APIs used by members of the cotton technology alliance have a standard look and feel. These guidelines are applicable to JSON requests and responses in both RPC-based and REST-based APIs.

## **Definitions**

For the purposes of this style guide, we define the following terms:

- property - a name/value pair inside a JSON object.

- property name - the name (or key) portion of the property.

- property value - the value portion of the property.

```
{
	// The name/value pair together is a "property".
	"propertyName": "propertyValue"
}
```

For example:

```
{"warehouseName": "Example Warehouse"}
//Where warehouseName is the property name and Example Warehouse is the property value
```

## **General Guidelines**

JSON is purely a data format that contains only properties and no methods and is used for the purpose of representing data. It exists as a string with a structured data hierarchy, and it is built on the following data structures: object, array, number, string, boolean, and null. A JSON Schema is also written in JSON and is a tool for validating the structure of JSON data.

### **General Syntax**

JSON syntax is derived from JavaScript object notation syntax:

- Data is in name/value pairs

- Data is separated by commas

- Curly braces hold objects

- Square brackets hold arrays

### **Numbers**

JSON is agnostic about the semantics of numbers. Because JSON has no standard way to represent complex numbers, there is no way to test for them in JSON Schema. Instead, JSON offers only the representation of numbers that humans use: a sequence of digits.

There are two numeric types in JSON Schema:integerand number.  The integertype is used for integral numbers, while the number type is used for any numeric type, either integers or floating point numbers. In this guide,number will refer to JavaScript&#39;s number type which encompasses all floating-point numbers, whileintegerwill refer to integers. For this reason, any value that could be either an integer or a float should use the numbertype.

### **Comments**

No comments in JSON objects.

Comments should not be included in JSON objects. Some of the examples in this style guide include comments. However, this is only to clarify the examples.

```

{
	// You may see comments in the examples below or in example JSON files,
	// But don't include comments in your JSON.
	"propertyName": "propertyValue";
}

```

### **Double Quotes**

Use double quotes.

If a property requires quotes, double quotes must be used. All property names must be surrounded by double quotes. Property values of type stringmust be surrounded by double quotes. Other value types such as a boolean, number, or null value should not be surrounded by double quotes.

### **Flattened data vs Structured Hierarchy**

Data elements should be “flattened” in the JSON representation. Data should not be arbitrarily grouped for convenience.

In some cases, such as a collection of properties that represents a single structure, it may make sense to keep the structured hierarchy. These cases should be carefully considered, and only used if it makes semantic sense. For example, an address could be represented two ways, but the structured way probably makes more sense for developers:

Flattened Address:
```
{
	“merchantName”: “Example Merchant”,
	"addressType": "Primary",
	“addressLine1”: “111 8th Ave”,
	“addressLine2”: “4th Floor”,
	“city”: “New York”,
	“stateProvince”: “NY”,
	“zipPostalCode”: “10011”
	“country”: “USA”
}
```
Structured Address:
```
{
	“merchantName”: “Example Merchant”,
		“addressFullText”: {
			"addressType": "Primary",
			“addressLine1”: “111 8th Ave”,
			“addressLine2”: “4th Floor”,
			“city”: “New York”,
			“stateProvince”: “NY”,
			“zipPostalCode”: “10011”
			“country”: “USA”
	}
}
```
### **Data Dictionaries**

JSON schemas should each have accompanying data dictionaries. These data dictionaries should provide an appropriate place for comments related to each property. These dictionaries are located on the Cotton Technology Alliance SharePoint site under the “Date Standards” section found here: [CTA Data Standards](https://theseam2.sharepoint.com/sites/cta/Shared%20Documents/Forms/AllItems.aspx?viewpath=%2Fsites%2Fcta%2FShared%20Documents%2FForms%2FAllItems%2Easpx&amp;id=%2Fsites%2Fcta%2FShared%20Documents%2FData%20Standards)

The Cotton Technology Alliance (CTA) library contains schemas related to certain types of entities commonly used across various objects that can be referenced.  For example, physical addresses and phone numbers have standard schemas defined.  This “reusable” methodology helps ensure consistency among all JSON object definitions and simplifies data interchange across schemas.  Whenever possible, these should be used. For reference, the data dictionaries for these “reusable” schemas can be found under the “Common” folder in the “Data Standards” section linked above. There is more information about reusable schemas later in the guide under Structuring a Schema.

## **Property Name Guidelines**

### **Property Name Format**

Choose meaningful and concise property names.

Property names must conform to the following guidelines:

- Property names should be meaningful names with defined semantics.

- Property names must be camel-cased, ascii strings.

- The first character must be a letter, an underscore (\_) or a dollar sign ($).

- Subsequent characters can be a letter, a digit, an underscore, or a dollar sign.

- Reserved JavaScript keywords should be avoided (A list of reserved JavaScript keywords can be found below in the Appendix).

- Property names should adhere to the names defined in the object&#39;s accompanying data dictionary (if applicable). The data dictionaries are located in the CTA SharePoint site under “Data Standards” found here: [CTA Data Standards](https://theseam2.sharepoint.com/sites/cta/Shared%20Documents/Forms/AllItems.aspx?newTargetListUrl=%2Fsites%2Fcta%2FShared%20Documents&amp;viewpath=%2Fsites%2Fcta%2FShared%20Documents%2FForms%2FAllItems%2Easpx&amp;id=%2Fsites%2Fcta%2FShared%20Documents%2FData%20Standards) (also referenced above).

These guidelines mirror the guidelines for naming JavaScript identifiers. This allows JavaScript clients to access properties using dot notation. (for example, result.merchantName).

### **Key Names in JSON Maps**

The property name naming rules do not apply when a JSON object is used as a map. A map (also referred to as an associative array) is a data type with arbitrary key/value pairs that use the keys to access the corresponding values. JSON objects and JSON maps look the same at runtime; this distinction is relevant to the design of the API. The API documentation should indicate when JSON objects are used as maps.

The keys of a map do not have to obey the naming guidelines for property names and may contain any Unicode characters. Clients can access these properties using the square bracket notation familiar for maps (for example, result.thumbnails[“72”]).
```
{
	// The “addressFullText” property is a sub-object
	// holding the parts of an address.
	“addressFullText”: {
		“addressLine1”: “123 Anystreet”,
		“cityProvince”: “Anytown”,
		“state”: “XX”,
		“zipPostalCode”: “00000”
	},
	// The “thumbnails” property is a map that maps
	// a pixel size to the thumbnail url of that size.
	// Notice the key names start with an integar which
	// normally goes against property naming rules.
	“thumbnails”: {
		“72”: “http://url.to.72px.thumbnail”,
		“144”: “http://url.to.144px.thumbnail”
	}
}
```
### **Reserved Property Names**

Certain property names are reserved for consistent use across services.

Details about reserved property names, along with the full list, can be found at the end of this guide in the Appendix. Services should avoid using these property names for anything other than their defined semantics.

### **Singular vs Plural Property Names**

Array types should have plural property names. All other property names should be singular.

Arrays usually contain multiple items, and a plural property name reflects this. An example of this can be seen in the reserved names below. The items property name is plural because it represents an array of item objects. Most of the other fields are singular.

There may be exceptions to this, especially when referring to numeric property values. For example, totalTypes makes more sense than totalType. Technically, this is not violating the style guide, since totalTypes can be viewed as totalOfTypes, where total is singular (as per the style guide), and OfTypes serves to qualify the total. The field name could also be changed to typeCount to look singular.  Whenever possible, the singular option should be used.
```
{
	// Singular
	“unit”: “bale”,
	
	// An array of cotton types, plural
	“cottonTypes”: [“Upland”, “Pima”],
	
	// “totalType” doesn't sound right
	“totalTypes”: 2,
	
	// But “typeCount” is better
	“typeCount”: 2,
}
```
### **Naming Conflicts**

Avoid naming conflicts by choosing a new property name or versioning the API.

New properties may be added to the reserved list in the future. There is no concept of JSON namespacing. If there is a naming conflict, these can usually be resolved by choosing a new property name or by versioning. For example, suppose we start with the following JSON object:
```
{
	“apiVersion”: “1.0”,
	“cottonData”: {
		“cottonType”: “Pima”,
		“colorGrades”: [“1”, “2”, “3”, “4”, “5”, “6”, “7”]
	}
}
```
If in the future we wish to make colorGrades a reserved word, we can do one of two things:

1) Choose a different name:
```
{
	“apiVersion”: “1.0”,
	“cottonData”: {
	“cottonType”: “Pima”,
		“officialColorGrades”: “Some new property”,
		“colorGrades”: [“1”, “2”, “3”, “4”, “5”, “6”, “7”]
	}
}
```
2) Rename the property on a major version boundary:
```
{
	“apiVersion”: “2.0”,
	“cottonData”: {
	“cottonType”: “Pima”,
		“colorGrades”: “Some new property”,
		“officialColorGrades”: [“1”, “2”, “3”, “4”, “5”, “6”, “7”]
	}
}
```
## **Property Value Guidelines**

### **Property Value Format**

Property values must be Unicode booleans,numbers, strings, objects, arrays, or null.

The spec at [JSON.org](http://www.json.org/) specifies exactly what type of data is allowed in a property value. JavaScript expressions are not allowed. APIs should support that spec for all values, and should choose the data type most appropriate for a particular property (numbers to represent numbers, strings to represent names, etc.). As mentioned before, strings are placed in double quotes, objects are placed in curly braces, and arrays are placed in brackets.

Good:
```
{
	“storageInsuranceRate”: null,  // null
	“warehouseCert”: false,  // boolean
	“receivingRate”: 5.0,  // number
	“warehouseName”: “Example Warehouse”,  // string
	“miscellanousTariffs”: {},  // object
	“cottonTypes”: []  // array
}
```
Bad:
```
{
	“warehouseLicense”: 1-234  // Bad – Should be string, not number
	“aVariableName”: aVariableName,  // Bad - JavaScript identifier
	“functionFoo”: function() {return 1;} // Bad - JavaScript function
}
```
### **Empty/Null Property Values**

Consider removing empty or null values.

If a property is optional or has an empty or null value, consider dropping the property from the JSON, unless there's a strong semantic reason for its existence. In terms of properties that can accept a variety of values including null, most of the time the simplest method is to leave that property off of the required list for that object in the schema, and it is not necessary to dictate that a null value is accepted. For example:
```
//For an object describing warehouse storage rates

{
	“warehouseStorage”: {
		“properties”: {
			“warehouseStorageRate”: {“type”: “number”},
			“warehouseInsuranceRate”: {“type”: “number”)
		},
		“required”: [warehouseStorageRate]
	}
}
//This method requires a numerical value for warehouseStorageRate but will accept either a numerical value or no value for warehouseInsuranceRate without having to specify it could be “type”: null
```
## **Property Value Standard Data Types**

As mentioned above, property value types must be booleans, numbers, strings, objects, arrays, or null. However, it is useful define a set of standard data types when dealing with certain values. These data types will always be strings, but they will be formatted in a specific manner so that they can be easily parsed.

### **Date and Time Property Values**

Dates should be strings formatted as recommended by [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt)

Appendix A of ISO 8601 contains a list of standards for date and time expressions. This can be found on page 11 of the above RFC 3339 link.

For the purposes of this guide, typically a date should either be formatted as the full-date example or the date-time example as shown in the RFC 3339 guide Section 5.6. These correspond to ISO syntax (“YYYY-MM-DD”) for full-date and (“YYYY-MM-DD-THH:MM:SSZ”) for date-time. In the date-time format, the letter “T” is used to separate the date and time elements and always appears in the string. The letter “Z” signifies the time in UTC – if the given date-time is offset from UTC the “Z” will instead be either a “+” or “-” followed by a time expression (HH:MM) indicating how much the time is offset.
```
//Date Schema
{
	“date”: {“type”: “string”}
}

//Sample value for full-date
{“date”: “2007-11-06”}

//Sample value for date-time
{“date”: “2007-11-06T16:34:41Z”}

//Sample value for date-time offset from UTC
{“date”: “2007-11-06T08:34:41-08:00”}
```
### **Latitude/Longitude Property Values**

Latitudes/Longitudes should be formatted as recommended by ISO 6709.

Latitude/Longitude should be strings formatted as recommended by [ISO 6709](https://en.wikipedia.org/wiki/ISO_6709). Furthermore, they should favor the ±DD.DDDD±DDD.DDDD degrees format.
```
{
	// The latitude/longitude location of the statue of liberty.
	“statueOfLiberty”: “+40.6894-074.0447”
}
```
## **Structuring a Schema**

### **Schema Basics**

When creating a schema, it is good practice to declare that it is a schema using the $schema keyword so that it is recognized as a schema and not a generic JSON file. Additionally, it is also important to include an $id property as a unique identifier for each schema. As an example, this could be the URL of a domain.
```
{
	“$schema”: “http://json-schema.org/draft-07/schema#”,
	“$id”: “https://cottontechnologyalliance.github.io/Documentation/WarehouseTariff/warehouseTariff.json”
}
```
An empty JSON Schema – “{ }” – will validate with any JSON, so it is essential to use restrictions and specific keywords to get the desired effect (see Keywords section below). One such way is to use the type keyword that restricts accepted data to only that type. A type can be either a string where the string is the name of one of the basic data structures mentioned above or an array of strings (each one also being the name of a basic data type). Several other generic keywords used to describe parts of a schema are title, description, and default. Title and description are good for self-documenting and explaining the data described by the schema, while default is used to set a default value for an item (in the case of a missing key/value pair). To summarize, this is an example of a schema using generic keywords:
```
{
	“entityID”: {
		“title”: “Entity ID”,
		“description”: “The ID number of the specific entity”,
		“type”: “number”
	}
}
```
### **Type-Specific Keywords**

For each data type, there are keywords that only apply to those types. Not every keyword is included in this document, but the basic ones that assist in validation are listed below. For a complete list, please visit [json-schema.org](https://json-schema.org).

#### **Strings**

The length of a string value can be restricted using the keywords minLength and maxLength. Additionally, the values can be further specified using the keywords pattern and format. Pattern refers to restricting string values to the syntax of a regular expression. Because syntax for regular expressions can be confusing, this is covered more in depth in the following section.

The format keyword constrains string values to semantics that are commonly used for a specific type of string, such as a date. JSON Schema has several built-in formats including date, time, date-time, and email.

#### **Numbers**

Ranges for numeric values can be specified using the minimum and maximum keywords (as well as exclusiveMinimum and exclusiveMaximum if you prefer that method). Additionally, numbers can be restricted to a multiple of a given number that is a positive integer using the multipleOf keyword.

#### **Objects**

Properties are added to objects for sensical and hierarchical representation of data. The required keyword specifies properties that must have values entered or the schema will not validate, and they are listed as an array. Additional properties are any properties that are added to an object that are not explicitly defined in the schema. The additionalProperties keyword can be set to true or false. The size, or number of properties, of an object can be restricted using minProperties and maxProperties. The following is an example of how properties are defined in an object:
```
{
	“warehouseTariffDate”: {
		“title”: “Warehouse Tariff Date”,
		“description”: “The begin and end date for a warehouse tariff.”,
		“type”: “object”,
		“additionalProperties”: false,
		“properties”: {
			“beginDate”: {“type”: “string”},
			“endDate”: {“type”: “string”}
		},
		“required”: [
			“beginDate”,
			“endDate”
		]
	}
}
```
#### **Arrays**

Arrays are similar to objects, but rather than using properties they use the keyword items. Items can be further specified using types. The additionalItems keyword is a Boolean that functions the same as additionalProperties. The length of the array can be specified using minItems and maxItems. An example of an array that utilizes item types is as follows:
```
{
	“email”: {
		“type”: “array”,
		“items”: {
			“type”: “string”,
			“format”: “email”
		}
	}
}
```
In this case, the entity in question may have multiple emails. Because of that, it is important to specify the email property as an array rather than an object. Each item in the array must be a valid string in the email format.

### **Regex Patterns  **

The pattern keyword for strings uses regular expressions to express constraints and uses syntax from JavaScript. However, not all regular expression syntax is widely supported. For a list of supported syntax, see [https://json-schema.org/understanding-json-schema/reference/regular\_expressions.html](https://json-schema.org/understanding-json-schema/reference/regular_expressions.html).

An example of using the pattern keyword is with the property cropYear. In this case, the value must be exactly 4 digits long and each digit must be an integer between 0-9. You could set this property up as a numeric type with minimum and maximum values, or as a string that has a defined length. However, those methods are not as concise and leave more room for error than using the regular expression shown below:
```
“cropYear”: {
	“title”: “Crop Year”,
	“description”: “The crop year of the cotton sample.”,
	“type”: “string”,
	“pattern”: “^[0-9]{4}$”
}
```
### **Enum Values**

The generic keyword enum can be used to restrict the value of a property to a list of possible values. Even though it can be used with both string and numbers, it is recommended that use is restricted to strings. As APIs grow, possiblevalues may be added, removed or changed. Using strings as enum values ensures that downstream clients can gracefully handle these changes.

Java code:
```
public enum officialColorGrade {
	“1”, “2”, “3”, “4”, “5”, “6”, “7”
}
```
JSON object:
```
{
	“officialColorGrade”: “5”
}
```
### **Reuse**

In complex schemas, it is often practical to structure schemas into reusable parts rather than duplicate bits of code everywhere a property or schema is used. The CTA library contains common schemas and corresponding data dictionaries that contain reusable entities. As mentioned before under the Data Dictionaries section, one of these entities is a physical address. Rather than fully define an address in every schema every time one is used, there is a standardized definition under the general data dictionary (found here -  [CTA Common](https://theseam2.sharepoint.com/sites/cta/Shared%20Documents/Forms/AllItems.aspx?newTargetListUrl=%2Fsites%2Fcta%2FShared%20Documents&amp;viewpath=%2Fsites%2Fcta%2FShared%20Documents%2FForms%2FAllItems%2Easpx&amp;id=%2Fsites%2Fcta%2FShared%20Documents%2FData%20Standards%2FCommon)). In the schema, it looks like this:
```
{

	“addressFullText”: {
		“title”: “Address”,
		“description”: “A complete address.”,
		“type”: “object”,
		“additionalProperties”: true,
		“properties”: {
			"addressType": {
				"title" : "Address Type",
				"description": "The type of address.",
				"type": "string",
				"enum": ["Primary", "Mailing"],
				"default": "Primary"
			},
			“addressLine1”: {
				“title”: “Address Line 1”,
				“description”: “The first line of the address.”,
				“type”: “string”
			},
			“addressLine2”: {
				“title”: “Address Line 2”,
				“description”: “The second line of the address, if needed.”,
				“type”: “string”
			},
			“city”: {
				“title”: “City”,
				“description”: “The city the address is located in.”,
				“type”: “string”
			},
			“stateProvince”: {
				“title”: “State or Province”,
				“description”: “The state or province the address is located in.”,
				“type”: “string”
			},
			“zipPostalCode”: {
				“title”: “ZIP or Postal Code”,
				“description”: “The ZIP or postal code of the address.”,
				“type”: “string”
			},
			“country”: {
				“title”: “Country”,
				“description”: “A country, territory, dependency, or other such geopolitical subdivision of a location.”,
				“type”: “string”
			}
		},
		“required”: [
			“addressLine1”,
			“city”,
			“stateProvince”,
			“zipPostalCode”
		]
	}
}
```
As can be seen here, the data itself is straightforward but lengthy. Rather than type this out every time an address is used, it can be referenced in several different ways. One way to do this is referencing within the same JSON document. In this case, this can be done by adding the keyword definitions to the end of the parent schema. Any entity that needs to be referenced within the same document can be put under definitions and referenced using the $ref keyword. $ref basically works as a pointer that gets replaced with whatever value it is pointing to. For example, if you wanted to include a schema for the address of a warehouse but didn't want to have to duplicate the addressFullText code already contained under definitions, it would look like this:
```
“warehouseAddress”: {
	“title”: “Warehouse Address”,
	“description”: “The address of a warehouse.”,
	“$ref”: “#/definitions/addressFullText”
}
```
The # symbol is an anchor that points to the root of the document, and from there the addressFullText code is pulled from the definitions section. Separate files can also be used to hold definitions. To refer to a separate file (such as the General Schema JSON file below), it would look like this:
```
“warehouseAddress”: {
	“title”: “Warehouse Address”,
	“description”: “The address of a warehouse.”,
	“$ref”: “generalSchema.json#/definitions/addressFullText”
}
```
The $ref keyword can be used with an $id property. The $id keyword can be used to create a unique identifier for a schema or sub-schema. In the example above, the value for $id in the General Schema is "generalSchema.json". It was stated earlier that it's important to always include an $id at the beginning of each schema, but it can also be used in this way:
```
“addressFullText”: {
	“$id”: “#address”
	“title”: “Address”,
	“description”: “A complete address.”,
	//etc.
}
```
The $ref keyword can then be used to point to a sub-schema by a unique name rather than by where it is located. When using this method, the reference object must be contained within the same schema. Sticking with the address example, this approach would look like this:
```
“warehouseAddress”: {
	“title”: “Warehouse Address”,
	“description”: “The address of a warehouse.”,
	“$ref”: “#address”
}
```
Finally, the $ref keyword can also be used with other keywords such as the combining keywords allOf, anyOf, and oneOf. The only difference is that those keywords accept an array value and the references can be objects, so it would need to be structured accordingly. As an example, if you need to define a schema for a warehouse that needs to include both an address and a telephone number (both of which are defined in the general schema as addressFullText and telephoneNumber accordingly), it would look like this:
```
“warehouseContactInformation”: {
	“title”: “Warehouse Contact Information”,
	“description”: “The address and telephone number of a warehouse.”,
	“allOf”: [
		{“$ref”: “generalSchema.json#/definitions/addressFullText”},
		{“$ref”: “generalSchema.json#/definitions/telephoneNumber”}
	]
}
```
## **Examples**

### **Cotton Bale Schema**

Below is an example of a partial Cotton Bale Schema based off of the universal classification data format published by the USDA ([here](https://www.ams.usda.gov/sites/default/files/media/Cotton%20DB%20Understanding%20the%20Data.pdf)). It has been condensed for example purposes.
```
{
	“$schema”: “http://json-schema.org/draft-07/schema#”,
	“$id”: “https://cottontechnologyalliance.github.io/schemas/Bales/bale.json”,
	“title”: “Cotton Bale Schema”,
	“type”: “object”,
	“properties”: {
		“permanentBaleIdentification”: {
			“title”: “Permament Bale Identification (PBI)”,
			“description”:”A bar-coded bale identification tag, preprinted with the gin code number and gin bale number (individually referenced below), that is placed between the two halves of the sample for identification purposes.  The Permanent Bale Identification (PBI) tag gives each bale a unique 12-digit number that is not repeated within a five year period.”,
			“type”: “object”,
			“properties”: {
				“ginCodeNumber”: {
					“title”: “Gin Code Number”,
					“description”: “A number that composes the first five digits of the PBI. The first two digits denote the Classing Office, and the last three digits identify the gin. The local Classing Office assigns this code number.”,
					“type”: “string”,
					“pattern”: “^[0-9]{5}$”
				},
				“ginBaleNumber”: {
					“title”: “Gin Bale Number”,
					“description”: “A number that composes the last seven-digits of the PBI and is assigned by the gin.”,
					“type”: “string”,
					“pattern”: “^[0-9]{7}$”
				}
			},
			“required”: [
				“ginCodeNumber”,
				“ginBaleNumber”
			]
		},
		“classificationDate”: {
			“title”: “Classification Date”,
			“description”: “Describes the date of classification of the cotton sample.”,
			“type”: “object”,
			“properties”: {
				“classedDate”: {
					“title”: “Date Classed”,
					“description”: “The date the classification data for the bale was released by the Classing Office.”,
					“$ref”: “generalSchema.json#/definitions/date”
				},
				“cropYear”: {
					“title”: “Crop Year”,
					“description”: “The crop year of the cotton sample.”,
					“type”: “string”,
					“pattern”: “^[0-9]{4}$”
				}
			},
			“required”: [
				“classedDate”,
				“cropYear”
			]
		},
		“baleReceiving”: {
			“title”: “Bale Receiving”,
			“description”: “Describes how the sample was received and the module or trailer identification associated with it.”,
			“type”: “object”,
			“properties”: {
				“receivingType”: {
					“title”: “Receiving Type”,
					“description”: “A one-digit code that indicates whether the sample was outturned as a single bale or as a bale that was module or trailer averaged. The codes are described as follows: 0 = Single Bale, 1 = Module, 2 = Trailer”,
					“type”: “string”,
					“enum”: [“0”, “1”, “2”]
				},
				“moduleTrailerNumber”: {
					“title”: “Module/Trailer Number”,
					“description”: “A five-digit number that identifies the module/trailer number assigned at the gin.”,
					“type”: “string”,
					“pattern”: “^[0-9]{5}$”
				},
				“baleCount”: {
					“title”: “Bale Count”,
					“description”: “The number of bales in the module/trailer that were released with the module average calculations.”,
					“type”: “integer”,
					“minimum”: 0,
					“maximum”: 99
				}
			},
			“required”: [
				“receivingType”,
				“moduleTrailerNumber”,
				“baleCount”
			]
		}
	},
	“required”: [
		“permanentBaleIdentification”,
		“classificationDate”,
		“baleReceiving”
	]
}
```
### **Cotton Bale Sample Data**

Once a schema is formatted, it can be compared to a JSON file with sample data to make sure it validates. This is an example of JSON data that validates with the above schema. Notice the required double quotes for string values (even if they are numbers as strings) and the absence of quotes for numeric types.
```
{
	“permanentBaleIdentification”: {
		“ginCodeNumber”: “14842”,
		“ginBaleNumber”: “3188009”
	},
	“classificationDate”: {
		“classedDate”: “2019-01-07”,
		“cropYear”: “2018”
	},
	“baleReceiving”: {
		“receivingType”: “2”,
		“moduleTrailerNumber”: “11111”,
		“baleCount”: 25
	}
}
```
Validators are available online to help ensure that the JSON data and JSON schema match. One tool can be found here - [https://www.jsonschemavalidator.net/](https://www.jsonschemavalidator.net/).

## **Appendix**

### **Appendix A: Reserved JavaScript Words**

A list of reserved JavaScript words that should be avoided in property names.

The words below are reserved by the JavaScript language and cannot be referred to using dot notation. The list represents best knowledge of keywords at this time; the list may change or vary based on your specific execution environment.

From the [ECMAScript Language Specification 5th Edition](https://www.google.com/url?sa=D&amp;q=http%3A%2F%2Fwww.ecma-international.org%2Fpublications%2Fstandards%2FEcma-262.htm)
```
abstract
boolean break byte
case catch char class const continue
debugger default delete do double
else enum export extends
false final finally float for function
goto
if implements import in instanceof int interface
let long
native new null
package private protected public
return
short static super switch synchronized
this throw throws transient true try typeof
var volatile void
while with
yield
```
### **Appendix B: Top-Level Reserved Property Names**

The top-level of the JSON object may contain the following properties.

**apiVersion**

Property Value Type: string

Parent: -

Represents the desired version of the service API in a request, and the version of the service API that&#39;s served in the response. apiVersion should always be present. This is not related to the version of the data. Versioning of data should be handled through some other mechanism such as etags.

Example:
```
{ “apiVersion”: “2.1” }
```
**context**

Property Value Type: string

Parent: -

Client sets this value and server echos data in the response. This is useful in JSON-P and batch situations, where the user can use the context to correlate responses with requests. This property is a top-level property because the context should present regardless of whether the response was successful or an error. context differs from id in that context is specified by the user while id is assigned by the service.

**id**

Property Value Type: string

Parent: -

A server supplied identifier for the response (regardless of whether the response is a success or an error). This is useful for correlating server logs with individual responses received at a client.

Example:
```
{“id”: “1”}
```
**method**

Property Value Type: string

Parent: -

Represents the operation to perform, or that was performed, on the data. In the case of a JSON request, the method property can be used to indicate which operation to perform on the data. In the case of a JSON response, the method property can indicate the operation performed on the data.

One example of this is in JSON-RPC requests, where method indicates the operation to perform on the params property:
```
{
	“method”:  “people.get”,
	“params”: {
		“userId”: “@me”,
		“groupId”: “@self”
	}
}
```
**params**

Property Value Type: object

Parent: -

This object serves as a map of input parameters to send to an RPC request. It can be used in conjunction with the method property to execute an RPC function. If an RPC function does not need parameters, this property can be omitted.

**data**

Property Value Type: object

Parent: -

Container for all the data from a response. This property itself has many reserved property names, which are described below. Services are free to add their own data to this object. A JSON response should contain either a data object or an error object, but not both. If both data and error are present, the error object takes precedence.

**error**

Property Value Type: object

Parent: -

Indicates that an error has occurred, with details about the error. The error format supports either one or more errors returned from the service. A JSON response should contain either a data object or an error object, but not both. If both data and error are present, the error object takes precedence.

Example:
```
{
	“apiVersion”: “2.0”,
	“error”: {
		“code”: 404,
		“message”: “File Not Found”,
		“errors”: [{
			“domain”: “Calendar”,
			“reason”: “ResourceNotFoundException”,
			“message”: “File Not Found
		}]
	}
}
```
### **Appendix C: Reserved Property Names in the Data Object**

The data property of the JSON object may contain the following properties.

**data.kind**

Property Value Type: string

Parent: data

The kind property serves as a guide to what type of information this particular object stores. It can be present at the data level, or at the items level, or in any object where its helpful to distinguish between various types of objects. If the kind object is present, it should be the first property in the object (See the “Property Ordering” section below for more details).

Example:
```
// “Kind” indicates an “album” in the Picasa API.
{“data”: {“kind”: “album”}}
```
**data.fields**

Property Value Type: string

Parent: data

Represents the fields present in the response when doing a partial GET, or the fields present in a request when doing a partial PATCH. This property should only exist during a partial GET/PATCH, and should not be empty.

Example:
```
{
	“data”: {
		“kind”: “user”,
		“fields”: “author,id”,
		“id”: “bart”,
		“author”: “Bart”
	}
}
```
**data.id**

Property Value Type: string

Parent: data

A globally unique string used to reference the object. The specific details of the id property are left up to the service.

Example:
```
{“data”: {“id”: “12345”}}
```
**data.lang**

Property Value Type: string (formatted as specified in BCP 47)

Parent: data (or any child element)

Indicates the language of the rest of the properties in this object. This property mimics HTML&#39;s lang property and XML&#39;s xml:lang properties. The value should be a language value as defined in [BCP 47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt). If a single JSON object contains data in multiple languages, the service is responsible for developing and documenting an appropriate location for the lang property.

Example:
```
{“data”: {
	“items”: [
		{ “lang”: “en”,
			“title”: “Hello world!” },
		{ “lang”: “fr”,
			“title”: “Bonjour monde!” }
	]}
}
```
**data.updated**

Property Value Type: string (formatted as specified in RFC 3339)

Parent: data

Indicates the last date/time ([RFC 3339](https://www.ietf.org/rfc/rfc3339.txt)) the item was updated, as defined by the service.

Example:
```
{“data”: {“updated”: “2007-11-06T16:34:41.000Z”}}
```
**data.deleted**

Property Value Type: boolean

Parent: data (or any child element)

A marker element, that, when present, indicates the containing entry is deleted. If deleted is present, its value must be true; a value of false can cause confusion and should be avoided.

Example:
```
{“data”: {

	“items”: [

		{ “title”: “A deleted entry”,

		“deleted”: true

		}

	]}

}
```
**data.items**

Property Value Type: array

Parent: data

The property name items is reserved to represent an array of items (for example, photos in Picasa, videos in YouTube). This construct is intended to provide a standard location for collections related to the current result. For example, the JSON output could be plugged into a generic pagination system that knows to page on the items array. If items exists, it should be the last property in the data object (See the “Property Ordering” section below for more details).

Example:
```
{
	“data”: {
		“items”: [
			{ /\* Object #1 \*/ },
			{ /\* Object #2 \*/ },
		...
		]
	}
}
```
