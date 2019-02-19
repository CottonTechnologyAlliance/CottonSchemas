![](media/8cc60e217dc6b310dc5863b9901bef5f.jpg)

CTA

Warehouse

Demo

Table of Contents:

Style Guide…………………………………………………………………………………….3

Data Dictionaries……………………………………………………………………………24

Warehouse Tariff…………………………………………………………………….25

Entity …………………………………………………………………………………..31

General………………………………………………………………………………..33

Schemas……………………………………………………………………………………….34

Warehouse Tariff…………………………………………………………………….35

Entity …………………………………………………………………………………..46

General………………………………………………………………………………..48

Warehouse Application…………………………………………………………………….51

Resources……………………………………………………………………………………..62

**Cotton Technology Alliance JSON Style Guide**

**Introduction**

This style guide documents guidelines and recommendations for building JSON APIs
for use in cotton industry systems. In general, JSON APIs should follow the spec
found at [JSON.org](http://www.json.org/). This style guide clarifies and
standardizes specific cases so that JSON APIs used by members of the cotton
technology alliance have a standard look and feel. These guidelines are
applicable to JSON requests and responses in both RPC-based and REST-based APIs.

**Definitions**

For the purposes of this style guide, we define the following terms:

-   property - a name/value pair inside a JSON object.

-   property name - the name (or key) portion of the property.

-   property value - the value portion of the property.

{

// The name/value pair together is a "property".

"propertyName": "propertyValue"

}

For example:

{"warehouseName": "Example Warehouse"}

//Where warehouseName is the property name and Example Warehouse is the property
value

**General Guidelines**

JSON is purely a data format that contains only properties and no methods and is
used for the purpose of representing data. It exists as a string with a
structured data hierarchy, and it is built on the following data structures:
object, array, number, string, boolean, and null. A JSON Schema is also written
in JSON and is a tool for validating the structure of JSON data.

**General Syntax**

JSON syntax is derived from JavaScript object notation syntax:

-   Data is in name/value pairs

-   Data is separated by commas

-   Curly braces hold objects

-   Square brackets hold arrays

**Numbers**

JSON is agnostic about the semantics of numbers. Because JSON has no standard
way to represent complex numbers, there is no way to test for them in JSON
Schema. Instead, JSON offers only the representation of numbers that humans use:
a sequence of digits.

There are two numeric types in JSON Schema: integer and number. The integer type
is used for integral numbers, while the number type is used for any numeric
type, either integers or floating point numbers. In this guide, number will
refer to JavaScript’s number type which encompasses all floating-point numbers,
while integer will refer to integers. For this reason, any value that could be
either an integer or a float should use the number type.

**Comments**

No comments in JSON objects.

Comments should not be included in JSON objects. Some of the examples in this
style guide include comments. However, this is only to clarify the examples.

{

// You may see comments in the examples below or in example JSON files,

// But don't include comments in your JSON.

"propertyName": "propertyValue"

}

**Double Quotes**

Use double quotes.

If a property requires quotes, double quotes must be used. All property names
must be surrounded by double quotes. Property values of type string must be
surrounded by double quotes. Other value types such as a boolean, number, or
null value should not be surrounded by double quotes.

**Flattened data vs Structured Hierarchy**

Data elements should be "flattened" in the JSON representation. Data should not
be arbitrarily grouped for convenience.

In some cases, such as a collection of properties that represents a single
structure, it may make sense to keep the structured hierarchy. These cases
should be carefully considered, and only used if it makes semantic sense. For
example, an address could be represented two ways, but the structured way
probably makes more sense for developers:

Flattened Address:

{

"merchantName": "Example Merchant",

"addressLine1": "111 8th Ave",

"addressLine2": "4th Floor",

"city": "New York",

"stateProvince": "NY",

"zipPostalCode": "10011"

"locationCountry": "United States"

}

Structured Address:

{

"merchantName": "Example Merchant",

"addressFullText": {

"addressLine1": "111 8th Ave",

"addressLine2": "4th Floor",

"cityProvince": "New York",

"state": "NY",

"zipPostalCode": "10011"

"state": "United States",

}

}

**Data Dictionaries**

JSON schemas should each have accompanying data dictionaries. These data
dictionaries should provide an appropriate place for comments related to each
property. These dictionaries are located on the Cotton Technology Alliance
Sharepoint site under the “Date Standards” section found here: [CTA Data
Standards](https://theseam2.sharepoint.com/sites/cta/Shared%20Documents/Forms/AllItems.aspx?viewpath=%2Fsites%2Fcta%2FShared%20Documents%2FForms%2FAllItems%2Easpx&id=%2Fsites%2Fcta%2FShared%20Documents%2FData%20Standards)

The Cotton Technology Alliance (CTA) library contains schemas related to certain
types of entities commonly used across various objects that can be referenced.
For example, physical addresses and phone numbers have standard schemas defined.
This “reusable” methodology helps ensure consistency among all JSON object
definitions and simplifies data interchange across schemas. Whenever possible,
these should be used. For reference, the data dictionaries for these “reusable”
schemas can be found under the “Common” folder in the “Data Standards” section
linked above. There is more information about reusable schemas later in the
guide under Structuring a Schema.

**Property Name Guidelines**

**Property Name Format**

Choose meaningful and concise property names.

Property names must conform to the following guidelines:

-   Property names should be meaningful names with defined semantics.

-   Property names must be camel-cased, ascii strings.

-   The first character must be a letter, an underscore (_) or a dollar sign
    (\$).

-   Subsequent characters can be a letter, a digit, an underscore, or a dollar
    sign.

-   Reserved JavaScript keywords should be avoided (A list of reserved
    JavaScript keywords can be found below in the Appendix).

-   Property names should adhere to the names defined in the object’s
    accompanying data dictionary (if applicable). The data dictionaries are
    located in the CTA Sharepoint site under “Data Standards” found here: [CTA
    Data
    Standards](https://theseam2.sharepoint.com/sites/cta/Shared%20Documents/Forms/AllItems.aspx?newTargetListUrl=%2Fsites%2Fcta%2FShared%20Documents&viewpath=%2Fsites%2Fcta%2FShared%20Documents%2FForms%2FAllItems%2Easpx&id=%2Fsites%2Fcta%2FShared%20Documents%2FData%20Standards)
    (also referenced above).

These guidelines mirror the guidelines for naming JavaScript identifiers. This
allows JavaScript clients to access properties using dot notation. (for
example, result.merchantName).

**Key Names in JSON Maps**

The property name naming rules do not apply when a JSON object is used as a map.
A map (also referred to as an associative array) is a data type with arbitrary
key/value pairs that use the keys to access the corresponding values. JSON
objects and JSON maps look the same at runtime; this distinction is relevant to
the design of the API. The API documentation should indicate when JSON objects
are used as maps.

The keys of a map do not have to obey the naming guidelines for property names
and may contain any Unicode characters. Clients can access these properties
using the square bracket notation familiar for maps (for
example, result.thumbnails["72"]).

{

// The "addressFullText" property is a sub-object

// holding the parts of an address.

"addressFullText": {

"addressLine1": "123 Anystreet",

"cityProvince": "Anytown",

"state": "XX",

"zipPostalCode": "00000"

},

// The "thumbnails" property is a map that maps

// a pixel size to the thumbnail url of that size.

// Notice the key names start with an integar which

// normally goes against property naming rules.

"thumbnails": {

"72": "http://url.to.72px.thumbnail",

"144": "http://url.to.144px.thumbnail"

}

}

**Reserved Property Names**

Certain property names are reserved for consistent use across services.

Details about reserved property names, along with the full list, can be found at
the end of this guide in the Appendix. Services should avoid using these
property names for anything other than their defined semantics.

**Singular vs Plural Property Names**

Array types should have plural property names. All other property names should
be singular.

Arrays usually contain multiple items, and a plural property name reflects this.
An example of this can be seen in the reserved names below. The items property
name is plural because it represents an array of item objects. Most of the other
fields are singular.

There may be exceptions to this, especially when referring to numeric property
values. For example, totalTypes makes more sense than totalType. Technically,
this is not violating the style guide, since totalTypes can be viewed
as totalOfTypes, where total is singular (as per the style guide),
and OfTypes serves to qualify the total. The field name could also be changed
to typeCount to look singular. Whenever possible, the singular option should be
used.

{

// Singular

"unit": "bale",

// An array of cotton types, plural

"cottonTypes": [ "Upland", "Pima"],

// "totalType" doesn't sound right

"totalTypes": 2,

// But "typeCount" is better

"typeCount": 2,

}

**Naming Conflicts**

Avoid naming conflicts by choosing a new property name or versioning the API.

New properties may be added to the reserved list in the future. There is no
concept of JSON namespacing. If there is a naming conflict, these can usually be
resolved by choosing a new property name or by versioning. For example, suppose
we start with the following JSON object:

{

"apiVersion": "1.0",

"cottonData": {

"cottonType": "Pima",

"colorGrades": ["1", "2", "3", "4", "5", "6", "7"]

}

}

If in the future we wish to make colorGrades a reserved word, we can do one of
two things:

1) Choose a different name:

{

"apiVersion": "1.0",

"cottonData": {

"cottonType": "Pima",

"officialColorGrades": "Some new property",

"colorGrades": ["1", "2", "3", "4", "5", "6", "7"]

}

}

2) Rename the property on a major version boundary:

{

"apiVersion": "2.0",

"cottonData": {

"cottonType": "Pima",

"colorGrades": "Some new property",

"officialColorGrades": ["1", "2", "3", "4", "5", "6", "7"]

}

}

**Property Value Guidelines**

**Property Value Format**

Property values must be Unicode booleans, numbers, strings, objects, arrays,
or null.

The spec at [JSON.org](http://www.json.org/) specifies exactly what type of data
is allowed in a property value. JavaScript expressions are not allowed. APIs
should support that spec for all values, and should choose the data type most
appropriate for a particular property (numbers to represent numbers, strings to
represent names, etc.). As mentioned before, strings are placed in double
quotes, objects are placed in curly braces, and arrays are placed in brackets.

Good:

{

"storageInsuranceRate": null, // null

"warehouseCert": false, // boolean

"receivingRate": 5.0, // number

"warehouseName": "Example Warehouse", // string

"miscellanousTariffs": {}, // object

"cottonTypes": [] // array

}

Bad:

{

"warehouseLicense": 1-234 // Bad – Should be string, not number

"aVariableName": aVariableName, // Bad - JavaScript identifier

"functionFoo": function() {return 1;} // Bad - JavaScript function

}

**Empty/Null Property Values**

Consider removing empty or null values.

If a property is optional or has an empty or null value, consider dropping the
property from the JSON, unless there's a strong semantic reason for its
existence. In terms of properties that can accept a variety of values including
null, most of the time the simplest method is to leave that property off of the
required list for that object in the schema, and it is not necessary to dictate
that a null value is accepted. For example:

//For an object describing warehouse storage rates

{

"warehouseStorage": {

"properties": {

"warehouseStorageRate": {"type": "number"},

"warehouseInsuranceRate": {"type": "number")

"required": [warehouseStorageRate]

}

//This method requires a numerical value for warehouseStorageRate but will
accept either a numerical value or no value for warehouseInsuranceRate without
having to specify it could be "type": null

**Property Value Standard Data Types**

As mentioned above, property value types must be booleans, numbers, strings,
objects, arrays, or null. However, it is useful define a set of standard data
types when dealing with certain values. These data types will always be strings,
but they will be formatted in a specific manner so that they can be easily
parsed.

**Date and Time Property Values**

Dates should be strings formatted as recommended by [RFC
3339](https://www.ietf.org/rfc/rfc3339.txt)

Appendix A of ISO 8601 contains a list of standards for date and time
expressions. This can be found on page 11 of the above RFC 3339 link.

For the purposes of this guide, typically a date should either be formatted as
the full-date example or the date-time example as shown in the RFC 3339 guide
Section 5.6. These correspond to ISO syntax (“YYYY-MM-DD”) for full-date and
(“YYYY-MM-DD-THH:MM:SSZ”) for date-time. In the date-time format, the letter “T”
is used to separate the date and time elements and always appears in the string.
The letter “Z” signifies the time in UTC – if the given date-time is offset from
UTC the “Z” will instead be either a “+” or “-“ followed by a time expression
(HH:MM) indicating how much the time is offset.

//Date Schema

{

"date": {"type": "string"}

}

//Sample value for full-date

{"date": "2007-11-06"}

//Sample value for date-time

{"date": "2007-11-06T16:34:41Z"}

//Sample value for date-time offset from UTC

{"date": "2007-11-06T08:34:41-08:00"}

**Latitude/Longitude Property Values**

Latitudes/Longitudes should be formatted as recommended by ISO 6709.

Latitude/Longitude should be strings formatted as recommended by [ISO
6709](https://en.wikipedia.org/wiki/ISO_6709). Furthermore, they should favor
the ±DD.DDDD±DDD.DDDD degrees format.

{

// The latitude/longitude location of the statue of liberty.

"statueOfLiberty": "+40.6894-074.0447"

}

**Structuring a Schema**

**Schema Basics**

When creating a schema, it is good practice to declare that it is a schema using
the \$schema keyword so that it is recognized as a schema and not a generic JSON
file. Additionally, it is also a good idea to include an \$id property as a
unique identifier for each schema. As an example, this could be the URL of a
domain.

{

"\$schema": "http://json-schema.org/schema\#",

"\$id":
"https://cottontechnologyalliance.github.io/Documentation/WarehouseTariff/warehouseTariff.json"

}

An empty JSON Schema – “{ }” – will validate with any JSON, so it is essential
to use restrictions and specific keywords to get the desired effect (see
Keywords section below). One such way is to use the type keyword that restricts
accepted data to only that type. A type can be either a string where the string
is the name of one of the basic data structures mentioned above or an array of
strings (each one also being the name of a basic data type). Several other
generic keywords used to describe parts of a schema are title, description, and
default. Title and description are good for self-documenting and explaining the
data described by the schema, while default is used to set a default value for
an item (in the case of a missing key/value pair). To summarize, this is an
example of a schema using generic keywords:

{

"entityID": {

"title": "Entity ID",

"description": "The ID number of the specific entity",

"type": "number"

}

}

**Type-Specific Keywords**

For each data type, there are keywords that only apply to those types. Not every
keyword is included in this document, but the basic ones that assist in
validation are listed below. For a complete list, please visit
[json-schema.org](https://json-schema.org).

#### **Strings**

>   The length of a string value can be restricted using the keywords minLength
>   and maxLength. Additionally, the values can be further specified using the
>   keywords pattern and format. Pattern refers to restricting string values to
>   the syntax of a regular expression. Because syntax for regular expressions
>   can be confusing, this is covered more in depth in the following section.

>   The format keyword constrains string values to semantics that are commonly
>   used for a specific type of string, such as a date. JSON Schema has several
>   built-in formats including date, time, date-time, and email.

#### **Numbers**

>   Ranges for numeric values can be specified using the minimum and maximum
>   keywords (as well as exclusiveMinimum and exclusiveMaximum if you prefer
>   that method). Additionally, numbers can be restricted to a multiple of a
>   given number that is a positive integer using the multipleOf keyword.

#### **Objects**

>   Properties are added to objects for sensical and hierarchical representation
>   of data. The required keyword specifies properties that must have values
>   entered or the schema will not validate, and they are listed as an array.
>   Additional properties are any properties that are added to an object that
>   are not explicitly defined in the schema. The additionalProperties keyword
>   can be set to true or false. The size, or number of properties, of an object
>   can be restricted using minProperties and maxProperties. The following is an
>   example of how properties are defined in an object:

{

"warehouseTariffDate": {

"title": "Warehouse Tariff Date",

"description": "The begin and end date for a warehouse tariff.",

"type": "object",

"additionalProperties": false,

"properties": {

"beginDate": {"type": "string"},

"endDate": {"type": "string"}

}

"required": [

"beginDate",

"endDate"

]

}

}

#### **Arrays**

>   Arrays are similar to objects, but rather than using properties they use the
>   keyword items. Items can be further specified using types. The
>   additionalItems keyword is a Boolean that functions the same as
>   additionalProperties. The length of the array can be specified using
>   minItems and maxItems. An example of an array that utilizes item types is as
>   follows:

{

"email": {

"type": "array",

"items": {

"type": "string",

"format": "email"

}

}

}

>   In this case, the entity in question may have multiple emails. Because of
>   that, it is important to specify the email property as an array rather than
>   an object. Each item in the array must be a valid string in the email
>   format.

**Regex Patterns**

The pattern keyword for strings uses regular expressions to express constraints
and uses syntax from JavaScript. However, not all regular expression syntax is
widely supported. For a list of supported syntax, see
<https://json-schema.org/understanding-json-schema/reference/regular_expressions.html>.

An example of using the pattern keyword is with the property cropYear. In this
case, the value must be exactly 4 digits long and each digit must be an integer
between 0-9. You could set this property up as a numeric type with minimum and
maximum values, or as a string that has a defined length. However, those methods
are not as concise and leave more room for error than using the regular
expression shown below:

"cropYear": {

"title": "Crop Year",

"description": "The crop year of the cotton sample.",

"type": "string",

"pattern": "\^[0-9]{4}\$"

**Enum Values**

The generic keyword enum can be used to restrict the value of a property to a
list of possible values. Even though it can be used with both string and
numbers, it is recommended that use is restricted to strings. As APIs grow,
possible values may be added, removed or changed. Using strings as enum values
ensures that downstream clients can gracefully handle these changes

.

Java code:

public enum officialColorGrade {

"1", "2", "3", "4", "5", "6", "7"

}

JSON object:

{

"officialColorGrade": "5"

}

**Reuse**

In complex schemas, it is often practical to structure schemas into reusable
parts rather than duplicate bits of code everywhere a property or schema is
used. The CTA library contains common schemas and corresponding data
dictionaries that contain reusable entities. As mentioned before under the Data
Dictionaries section, one of these entities is a physical address. Rather than
fully define an address in every schema every time one is used, there is a
standardized definition under the general data dictionary (found here - [CTA
Common](https://theseam2.sharepoint.com/sites/cta/Shared%20Documents/Forms/AllItems.aspx?newTargetListUrl=%2Fsites%2Fcta%2FShared%20Documents&viewpath=%2Fsites%2Fcta%2FShared%20Documents%2FForms%2FAllItems%2Easpx&id=%2Fsites%2Fcta%2FShared%20Documents%2FData%20Standards%2FCommon)).
In the schema, it looks like this:

{

"addressFullText": {

"title": "Address",

"description": "A complete address.",

"type": "object",

"additionalProperties": true,

"properties": {

"addressLine1": {

"title": "Address Line 1",

"description": "The first line of the address.",

"type": "string"

},

"addressLine2": {

"title": "Address Line 2",

"description": "The second line of the address, if needed.",

"type": "string"

},

"city": {

"title": "City",

"description": "The city the address is located in.",

"type": "string"

},

"stateProvince": {

"title": "State or Province",

"description": "The state or province the address is located in.",

"type": "string"

},

"zipPostalCode": {

"title": "ZIP or Postal Code",

"description": "The ZIP or postal code of the address.",

"type": "string"

},

"locationCountry": {

"title": "Country",

"description": "A country, territory, dependency, or other such geopolitical
subdivision of a location.",

"type": "string"

}

},

"required": [

"addressLine1",

"city",

"stateProvince",

"zipPostalCode",

"locationCountry"

]

}

As can be seen here, the data itself is straightforward but lengthy. Rather than
type this out every time an address is used, it can be referenced in several
different ways. One way to do this is referencing within the same JSON document.
In this case, this can be done by adding the keyword definitions to the end of
the parent schema. Any entity that needs to be referenced within the same
document can be put under definitions and referenced using the \$ref keyword.
\$ref basically works as a pointer that gets replaced with whatever value it is
pointing to. For example, if you wanted to include a schema for the address of a
warehouse but didn’t want to have to duplicate the addressFullText code already
contained under definitions, it would look like this:

"warehouseAddress": {

"title": "Warehouse Address",

"description": "The address of a warehouse.",

"\$ref": "\#/definitions/addressFullText"

}

The \# symbol is an anchor that points to the root of the document, and from
there the addressFullText code is pulled from the definitions section. Separate
files can also be used to hold definitions. To refer to a separate file (such as
the General Schema JSON file below), it would look like this:

"warehouseAddress": {

"title": "Warehouse Address",

"description": "The address of a warehouse.",

"\$ref": "generalSchema.json\#/definitions/addressFullText"

}

The \$ref keyword can also be used with an \$id property. The \$id keyword can
be used to create a unique identifier for a schema or subschema. It was stated
earlier that it’s good practice to always include an \$id at the beginning of
each schema, but it can also be used in this way:

"addressFullText": {

"\$id": "\#address"

"title": "Address",

"description": "A complete address.",

//etc.

}

The \$ref keyword can then be used to point to a subschema by a unique name
rather than by where it is located. When using this method, the reference object
must be contained within the same schema. Sticking with the address example,
this approach would look like this:

"warehouseAddress": {

"title": "Warehouse Address",

"description": "The address of a warehouse.",

"\$ref": "\#address"

}

Finally, the \$ref keyword can also be used with other keywords such as the
combining keywords allOf, anyOf, and oneOf. The only difference is that those
keywords accept an array value and the references can be objects, so it would
need to be structured accordingly. As an example, if you need to define a schema
for a warehouse that needs to include both an address and a telephone number
(both of which are defined in the general schema as addressFullText and
telephoneNumber accordingly), it would look like this:

"warehouseIdentity": {

"title": "Warehouse Identity",

"description": "The address and telephone number of a warehouse.",

"allOf": [

{"\$ref": "generalSchema.json\#/definitions/addressFullText"},

{"\$ref": "generalSchema.json\#/definitions/telephoneNumber"}

]

}

**Examples**

**Cotton Bale Schema**

Below is an example of a partial Cotton Bale Schema based off of the universal
classification data format published by the USDA
([here](https://www.ams.usda.gov/sites/default/files/media/Cotton%20DB%20Understanding%20the%20Data.pdf)).
It has been condensed for example purposes.

{

"\$schema": "http://json-schema.org/schema\#",

"\$id": "https://cottontechnologyalliance.github.io/schemas/Bales/bale.json",

"title": "Cotton Bale Schema",

"type": "object",

"properties": {

"permanentBaleIdentification": {

"title": "Permament Bale Identification (PBI)",

"description":"A bar-coded bale identification tag, preprinted with the gin code
number and gin bale number (individually referenced below), that is placed
between the two halves of the sample for identification purposes. The Permanent
Bale Identification (PBI) tag gives each bale a unique 12-digit number that is
not repeated within a five year period.",

"type": "object",

"properties": {

"ginCodeNumber": {

"title": "Gin Code Number",

"description": "A number that composes the first five digits of the PBI. The
first two digits denote the Classing Office, and the last three digits identify
the gin. The local Classing Office assigns this code number.",

"type": "string",

"pattern": "\^[0-9]{5}\$"

},

"ginBaleNumber": {

"title": "Gin Bale Number",

"description": "A number that composes the last seven-digits of the PBI and is
assigned by the gin.",

"type": "string",

"pattern": "\^[0-9]{7}\$"

}

},

"required": [

"ginCodeNumber",

"ginBaleNumber"

]

},

"classificationDate": {

"title": "Classification Date",

"description": "Describes the date of classification of the cotton sample.",

"type": "object",

"properties": {

"classedDate": {

"title": "Date Classed",

"description": "The date the classification data for the bale was released by
the Classing Office.",

"\$ref": "generalSchema.json\#/definitions/date"

},

"cropYear": {

"title": "Crop Year",

"description": "The crop year of the cotton sample.",

"type": "string",

"pattern": "\^[0-9]{4}\$"

}

},

"required": [

"classedDate",

"cropYear"

]

},

"baleReceiving": {

"title": "Bale Receiving",

"description": "Describes how the sample was received and the module or trailer
identification associated with it.",

"type": "object",

"properties": {

"receivingType": {

"title": "Receiving Type",

"description": "A one-digit code that indicates whether the sample was outturned
as a single bale or as a bale that was module or trailer averaged. The codes are
described as follows: 0 = Single Bale, 1 = Module, 2 = Trailer",

"type": "string",

"enum": ["0", "1", "2"]

},

"moduleTrailerNumber": {

"title": "Module/Trailer Number",

"description": "A five-digit number that identifies the module/trailer number
assigned at the gin.",

"type": "string",

"pattern": "\^[0-9]{5}\$"

},

"baleCount": {

"title": "Bale Count",

"description": "The number of bales in the module/trailer that were released
with the module average calculations.",

"type": "integer",

"minimum": 0,

"maximum": 99

}

},

"required": [

"receivingType",

"moduleTrailerNumber",

"baleCount"

]

}

},

"required": [

"permanentBaleIdentification",

"classificationDate",

"baleReceiving"

]

}

**Cotton Bale Sample Data**

Once a schema is formatted, it can be compared to a JSON file with sample data
to make sure it validates. This is an example of JSON data that validates with
the above schema. Notice the required double quotes for string values (even if
they are numbers as strings) and the absence of quotes for numeric types.

{

"permanentBaleIdentification": {

"ginCodeNumber": “14842”,

"ginBaleNumber": “3188009”

},

"classificationDate": {

"classedDate": "2019-01-07",

"cropYear": “2018”

},

"baleReceiving": {

"receivingType": "2",

"moduleTrailerNumber": “11111”,

"baleCount": 25

}

}

Validators are available online to help ensure that the JSON data and JSON
schema match. One tool can be found here -
<https://www.jsonschemavalidator.net/>.

**Appendix**

**Appendix A: Reserved JavaScript Words**

A list of reserved JavaScript words that should be avoided in property names.

The words below are reserved by the JavaScript language and cannot be referred
to using dot notation. The list represents best knowledge of keywords at this
time; the list may change or vary based on your specific execution environment.

From the [ECMAScript Language Specification 5th
Edition](https://www.google.com/url?sa=D&q=http%3A%2F%2Fwww.ecma-international.org%2Fpublications%2Fstandards%2FEcma-262.htm)

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

**Appendix B: Top-Level Reserved Property Names**

The top-level of the JSON object may contain the following properties.

**apiVersion**

Property Value Type: string  
Parent: -

Represents the desired version of the service API in a request, and the version
of the service API that's served in the response. apiVersion should always be
present. This is not related to the version of the data. Versioning of data
should be handled through some other mechanism such as etags.

Example:

{ "apiVersion": "2.1" }

**context**

Property Value Type: string  
Parent: -

Client sets this value and server echos data in the response. This is useful in
JSON-P and batch situations , where the user can use the context to correlate
responses with requests. This property is a top-level property because
the context should present regardless of whether the response was successful or
an error. context differs from id in that context is specified by the user
while id is assigned by the service.

Example:

Request \#1:

https://www.google.com/myapi?context=bart

Request \#2:

https://www.google.com/myapi?context=lisa

Response \#1:

{

"context": "bart",

"data": {

"items": []

}

}

Response \#2:

{

"context": "lisa",

"data": {

"items": []

}

}

Common JavaScript handler code to process both responses:

function handleResponse(response) {

if (response.result.context == "bart") {

// Update the "Bart" section of the page.

} else if (response.result.context == "lisa") {

// Update the "Lisa" section of the page.

}

}

**id**

Property Value Type: string  
Parent: -

A server supplied identifier for the response (regardless of whether the
response is a success or an error). This is useful for correlating server logs
with individual responses received at a client.

Example:

{ "id": "1" }

**method**

Property Value Type: string  
Parent: -

Represents the operation to perform, or that was performed, on the data. In the
case of a JSON request, the method property can be used to indicate which
operation to perform on the data. In the case of a JSON response,
the method property can indicate the operation performed on the data.

One example of this is in JSON-RPC requests, where method indicates the
operation to perform on the params property:

{

"method": "people.get",

"params": {

"userId": "\@me",

"groupId": "\@self"

}

}

**params**

Property Value Type: object  
Parent: -

This object serves as a map of input parameters to send to an RPC request. It
can be used in conjunction with the method property to execute an RPC function.
If an RPC function does not need parameters, this property can be omitted.

Example:

{

"method": "people.get",

"params": {

"userId": "\@me",

"groupId": "\@self"

}

}

**data**

Property Value Type: object  
Parent: -

Container for all the data from a response. This property itself has many
reserved property names, which are described below. Services are free to add
their own data to this object. A JSON response should contain either
a data object or an error object, but not both. If both data and error are
present, the error object takes precedence.

**error**

Property Value Type: object  
Parent: -

Indicates that an error has occurred, with details about the error. The error
format supports either one or more errors returned from the service. A JSON
response should contain either a data object or an error object, but not both.
If both data and error are present, the error object takes precedence.

Example:

{

"apiVersion": "2.0",

"error": {

"code": 404,

"message": "File Not Found",

"errors": [{

"domain": "Calendar",

"reason": "ResourceNotFoundException",

"message": "File Not Found

}]

}

}

**Appendix C: Reserved Property Names in the Data Object**

The data property of the JSON object may contain the following properties.

**data.kind**

Property Value Type: string  
Parent: data

The kind property serves as a guide to what type of information this particular
object stores. It can be present at the data level, or at the items level, or in
any object where its helpful to distinguish between various types of objects. If
the kind object is present, it should be the first property in the object (See
the "Property Ordering" section below for more details).

Example:

// "Kind" indicates an "album" in the Picasa API.

{"data": {"kind": "album"}}

**data.fields**

Property Value Type: string  
Parent: data

Represents the fields present in the response when doing a partial GET, or the
fields present in a request when doing a partial PATCH. This property should
only exist during a partial GET/PATCH, and should not be empty.

Example:

{

"data": {

"kind": "user",

"fields": "author,id",

"id": "bart",

"author": "Bart"

}

}

**data.id**

Property Value Type: string  
Parent: data

A globally unique string used to reference the object. The specific details of
the id property are left up to the service.

Example:

{"data": {"id": "12345"}}

**data.lang**

Property Value Type: string (formatted as specified in BCP 47)  
Parent: data (or any child element)

Indicates the language of the rest of the properties in this object. This
property mimics HTML's lang property and XML's xml:lang properties. The value
should be a language value as defined in [BCP
47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt). If a single JSON object
contains data in multiple languages, the service is responsible for developing
and documenting an appropriate location for the lang property.

Example:

{"data": {

"items": [

{ "lang": "en",

"title": "Hello world!" },

{ "lang": "fr",

"title": "Bonjour monde!" }

]}

}

**data.updated**

Property Value Type: string (formatted as specified in RFC 3339)  
Parent: data

Indicates the last date/time ([RFC 3339](https://www.ietf.org/rfc/rfc3339.txt))
the item was updated, as defined by the service.

Example:

{"data": {"updated": "2007-11-06T16:34:41.000Z"}}

**data.deleted**

Property Value Type: boolean  
Parent: data (or any child element)

A marker element, that, when present, indicates the containing entry is deleted.
If deleted is present, its value must be true; a value of false can cause
confusion and should be avoided.

Example:

{"data": {

"items": [

{ "title": "A deleted entry",

"deleted": true

}

]}

}

**data.items**

Property Value Type: array  
Parent: data

The property name items is reserved to represent an array of items (for example,
photos in Picasa, videos in YouTube). This construct is intended to provide a
standard location for collections related to the current result. For example,
the JSON output could be plugged into a generic pagination system that knows to
page on the items array. If items exists, it should be the last property in
the data object (See the "Property Ordering" section below for more details).

Example:

{

"data": {

"items": [

{ /\* Object \#1 \*/ },

{ /\* Object \#2 \*/ },

...

]

}

}

Data

Dictionaries

**Warehouse Data Dictionary**

| **Name**                     | **Title**                    | **Type**    | **Required** | **Allowed Values**         | **Example Value**                                                                              | **Description**                                                                                                                                                                                                                                                                                                                                                                           |
|------------------------------|------------------------------|-------------|--------------|----------------------------|------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| warehouseIdentity            | Warehouse Identity           | Object      |              |                            |                                                                                                | Describes the entity involved in schema subject.                                                                                                                                                                                                                                                                                                                                          |
| entity                       | Entity                       | REF, Object | TRUE         |                            | "Test Warehouse",                                                                              | The details of the entity's identity.                                                                                                                                                                                                                                                                                                                                                     |
|                              |                              |             |              |                            |                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                           |
|                              |                              |             |              |                            | "1234 abc ln.",                                                                                | \*Note, this property references the entity and entityWarehouse definitions in entity data dictionary.                                                                                                                                                                                                                                                                                    |
|                              |                              |             |              |                            |                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                           |
|                              |                              |             |              |                            | "Memphis",                                                                                     | Schema references - "https://cottontechnologyalliance.github.io/Documentation/Common/entitySchema.json\#/definitions/entity",                                                                                                                                                                                                                                                             |
|                              |                              |             |              |                            |                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                           |
|                              |                              |             |              |                            | "TN",                                                                                          | "https://cottontechnologyalliance.github.io/Documentation/Common/entitySchema.json\#/definitions/entityWarehouse"                                                                                                                                                                                                                                                                         |
|                              |                              |             |              |                            |                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                           |
|                              |                              |             |              |                            | "38111",                                                                                       |                                                                                                                                                                                                                                                                                                                                                                                           |
|                              |                              |             |              |                            |                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                           |
|                              |                              |             |              |                            | "United States",                                                                               |                                                                                                                                                                                                                                                                                                                                                                                           |
|                              |                              |             |              |                            |                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                           |
|                              |                              |             |              |                            | "123456",                                                                                      |                                                                                                                                                                                                                                                                                                                                                                                           |
|                              |                              |             |              |                            |                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                           |
|                              |                              |             |              |                            | "1-1234",                                                                                      |                                                                                                                                                                                                                                                                                                                                                                                           |
|                              |                              |             |              |                            |                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                           |
|                              |                              |             |              |                            | false                                                                                          |                                                                                                                                                                                                                                                                                                                                                                                           |
| currency                     | Currency                     | Object      |              |                            |                                                                                                | The type of currency this warehouse uses.                                                                                                                                                                                                                                                                                                                                                 |
| currencyType                 | Currency Type                | REF         | TRUE         | "EUR", "GBP", "USD", "CNY" | "USD"                                                                                          | A unit of money or exchange.                                                                                                                                                                                                                                                                                                                                                              |
|                              |                              |             |              |                            |                                                                                                | \*Note, this property references the currencyCodeType definition in general data dictionary.                                                                                                                                                                                                                                                                                              |
|                              |                              |             |              |                            |                                                                                                | Schema reference - "https://cottontechnologyalliance.github.io/Documentation/Common/generalSchema.json\#/definitions/currencyCodeType"                                                                                                                                                                                                                                                    |
| unit                         | Unit                         | Object      |              |                            |                                                                                                | The unit each price is set to.                                                                                                                                                                                                                                                                                                                                                            |
| unitType                     | Unit Type                    | REF         | TRUE         | string                     | "bale"                                                                                         | The quantity things are measured in.                                                                                                                                                                                                                                                                                                                                                      |
|                              |                              |             |              |                            |                                                                                                | \*Note, this property references the unitStandard definition in general data dictionary.                                                                                                                                                                                                                                                                                                  |
|                              |                              |             |              |                            |                                                                                                | Schema reference - "https://cottontechnologyalliance.github.io/Documentation/Common/generalSchema.json\#/definitions/unitStandard"                                                                                                                                                                                                                                                        |
| warehouseTariffDate          | Warehouse Tariff Date        | Object      |              |                            |                                                                                                | The begin and end date for a warehouse tariff.                                                                                                                                                                                                                                                                                                                                            |
| beginDate                    | Tariff Begin Date            | REF         | TRUE         | 1/1/0001-12/31/2999        | "2018-11-06"                                                                                   | The effective date of the warehouse tariff.                                                                                                                                                                                                                                                                                                                                               |
|                              |                              |             |              |                            |                                                                                                | \*Note, this property references the date definition in general data dictionary.                                                                                                                                                                                                                                                                                                          |
|                              |                              |             |              |                            |                                                                                                | Schema reference - "https://cottontechnologyalliance.github.io/Documentation/Common/generalSchema.json\#/definitions/date"                                                                                                                                                                                                                                                                |
| endDate                      | Tariff End Date              | REF         | TRUE         | 1/1/0001-12/31/2999        | "2019-11-05"                                                                                   | The day before the effective date of the new year.                                                                                                                                                                                                                                                                                                                                        |
|                              |                              |             |              |                            |                                                                                                | \*Note, this property references the date definition in general data dictionary.                                                                                                                                                                                                                                                                                                          |
|                              |                              |             |              |                            |                                                                                                | Schema reference - "https://cottontechnologyalliance.github.io/Documentation/Common/generalSchema.json\#/definitions/date"                                                                                                                                                                                                                                                                |
| warehouseReceiving           | Warehouse Receiving          | Object      |              |                            |                                                                                                | Defines receiving cotton in a warehouse.                                                                                                                                                                                                                                                                                                                                                  |
| receivingRate                | Receiving                    | Number      | TRUE         | 0-50                       | 2.25                                                                                           | Cost of receiving, issuing of warehouse receipt, and placing in storage, per bale.                                                                                                                                                                                                                                                                                                        |
| receivingCertRate            | Certificated Receiving       | Number      | FALSE        | 0-50                       | 2                                                                                              | Cost of receiving, issuing of warehouse receipt, and placing in storage for certificated cotton, per bale.                                                                                                                                                                                                                                                                                |
| warehouseStorage             | Warehouse Storage            | Object      |              |                            |                                                                                                | Defines storing cotton in a warehouse.                                                                                                                                                                                                                                                                                                                                                    |
| storageRate                  | Storage                      | Number      | TRUE         | 0-50                       | 4                                                                                              | Cost of storing cotton in warehouse, per bale per unit time (day or month).                                                                                                                                                                                                                                                                                                               |
| storageCertRate              | Certificated Storage         | Number      | FALSE        | 0-50                       | 3                                                                                              | Cost of storage for certificated cotton, per bale per unit time (day or month).                                                                                                                                                                                                                                                                                                           |
| storageInsuranceRate         | Storage Insurance            | Number      | FALSE        | 0-50                       | 0.25                                                                                           | Additional charge for insurance while in storage, per bale per unit time (day or month).                                                                                                                                                                                                                                                                                                  |
| warehouseLoading             | Warehouse Loading            | Object      |              |                            |                                                                                                | Defines loading cotton at a warehouse.                                                                                                                                                                                                                                                                                                                                                    |
| loadingRate                  | Loading                      | Number      | TRUE         | 0-50                       | 5                                                                                              | Cost of picking out by tag number, removing cotton from storage, delivering to warehouse platform, and loading, per bale.                                                                                                                                                                                                                                                                 |
| warehouseCompression         | Warehouse Compression        | Object      |              |                            |                                                                                                | Defines compression of cotton at a warehouse.                                                                                                                                                                                                                                                                                                                                             |
| compressionRate              | Compression                  | Number      | TRUE         | 0-50                       | 7.5                                                                                            | Cost of compression of cotton at a warehouse, per bale.                                                                                                                                                                                                                                                                                                                                   |
| compressionPatchRate         | Application of Patch         | Number      | FALSE        | 0-50                       | 1                                                                                              | Cost of application of patch where necessary, per bale.                                                                                                                                                                                                                                                                                                                                   |
| compressionExtraRate         | Extra Compression            | Number      | FALSE        | 0-50                       | 1.5                                                                                            | Cost of extra compression for bales weighing over the weight limit, per bale.                                                                                                                                                                                                                                                                                                             |
| warehouseMarking             | Warehouse Marking            | Object      |              |                            |                                                                                                | Defines marking or branding cotton.                                                                                                                                                                                                                                                                                                                                                       |
| markingRate                  | Marking                      | Number      | TRUE         | 0-50                       | 1                                                                                              | Cost to apply mark or brand to cotton, per bale.                                                                                                                                                                                                                                                                                                                                          |
| markingExtraRate             | Extra Marking                | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of additional marking or branding in excess of character limit, per bale.                                                                                                                                                                                                                                                                                                            |
| warehouseClassing            | Warehouse Classing           | Object      |              |                            |                                                                                                | Defines classing and sampling cotton at a warehouse.                                                                                                                                                                                                                                                                                                                                      |
| samplingShipmentRate         | Sampling at Shipment         | Number      | TRUE         | 0-50                       | 4.25                                                                                           | Cost of sampling or resampling at time of shipment, per bale.                                                                                                                                                                                                                                                                                                                             |
| samplingStorageRate          | Sampling from Storage        | Number      | TRUE         | 0-50                       | 6                                                                                              | Cost of sampling or resampling, including removing cotton from and returning it to storage, per bale.                                                                                                                                                                                                                                                                                     |
| samplingOneSideRate          | Sampling from One Side       | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of sampling from one side only, per bale.                                                                                                                                                                                                                                                                                                                                            |
| classingCertRate             | Certificated Classing        | Number      | FALSE        | 0-50                       | 3                                                                                              | Cost of classing for certificated cotton, per bale.                                                                                                                                                                                                                                                                                                                                       |
| warehouseWeighing            | Warehouse Weighing           | Object      |              |                            |                                                                                                | Defines weighing cotton at a warehouse.                                                                                                                                                                                                                                                                                                                                                   |
| weighingShipmentRate         | Weighing at Shipment         | Number      | TRUE         | 0-50                       | 2                                                                                              | Cost of weighing or reweighing at time of shipment including furnishing original and copies of certified weight sheets, per bale.                                                                                                                                                                                                                                                         |
| weighingStorageRate          | Weighing from Storage        | Number      | TRUE         | 0-50                       | 3.25                                                                                           | Cost of weighing or reweighing, including removing cotton from and returning it to storage and furnishing original and copies of certified weight sheets, per bale.                                                                                                                                                                                                                       |
| weighingAndSamplingRate      | Weighing and Sampling        | Number      | TRUE         | 0-50                       | 7.5                                                                                            | Cost of weighing or reweighing at time of sampling from storage, including removing cotton from and returning it to storage and furnishing original and copies of certified weight sheets, per bale.                                                                                                                                                                                      |
| miscellaneous                | Miscellaneous Tariffs        | Object      |              |                            |                                                                                                | Additional warehouse tariffs.                                                                                                                                                                                                                                                                                                                                                             |
| receivingAdditionalFee       | Additional Receiving Fee     | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of any fees added while receiving order, such as any classing or program fees, per bale.                                                                                                                                                                                                                                                                                             |
| samplingExtraRate            | Extra Sampling               | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of drawing an extra set of samples, at time of any sampling, per bale.                                                                                                                                                                                                                                                                                                               |
| samplingSortingRate          | Special Sorting of Samples   | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of special sorting of samples, per sample.                                                                                                                                                                                                                                                                                                                                           |
| samplingDeliveryRate         | Delivery of Samples          | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of delivery of samples or types by postage, freight or express carrier, actual cost.                                                                                                                                                                                                                                                                                                 |
| samplingSackRate             | Sample Sacks                 | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of furnishing sacks for samples, per sack.                                                                                                                                                                                                                                                                                                                                           |
| samplingHolesRate            | Closing Sample Holes         | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of closing holes on samples, per bale.                                                                                                                                                                                                                                                                                                                                               |
| weighingSheetsRate           | Weight Sheets                | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of providing extra copies of weight sheets, per bale.                                                                                                                                                                                                                                                                                                                                |
| typingUnderRate              | Typing Under Weight          | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of typing - 25 pounds and under, per bale.                                                                                                                                                                                                                                                                                                                                           |
| typingOverRate               | Typing Over Weight           | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of typing - over 25 pounds, per bale.                                                                                                                                                                                                                                                                                                                                                |
| reconditioningBrushingRate   | Brushing Cotton              | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of brushing and/or blowing dirt and/or sand off cotton, per bale.                                                                                                                                                                                                                                                                                                                    |
| reconditioningDryingRate     | Drying Wet Cotton            | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of drying cotton received wet but undamaged, per bale.                                                                                                                                                                                                                                                                                                                               |
| reconditioningDamagedRate    | Damaged Cotton               | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of repairing plated, water packed or gin fall bales or picking damaged cotton, per bale.                                                                                                                                                                                                                                                                                             |
| reconditioningBailingRate    | Bailing                      | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of bailing loose, pickings or sweepings, per bale.                                                                                                                                                                                                                                                                                                                                   |
| reconditioningFumigationRate | Fumigation                   | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of removal from platform, non-vacuum fumigation, and the immediate return to warehouse platform, per bale.                                                                                                                                                                                                                                                                           |
| phytosanitaryRate            | Phytosanitary Certificate    | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of Phytosanitary Certificates of cotton for export, per load.                                                                                                                                                                                                                                                                                                                        |
| receivingBlockRate           | Receiving Block Storage      | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of receiving block storage, per bale.                                                                                                                                                                                                                                                                                                                                                |
| storageBlockRate             | Block Storage                | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of block storage, per bale per unit time (day or month).                                                                                                                                                                                                                                                                                                                             |
| loadingBlockRate             | Loading Block Storage        | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of loading out of block storage, per bale.                                                                                                                                                                                                                                                                                                                                           |
| loadingExpeditedRate         | Expedited Loading            | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of expedited loading of order, per bale.                                                                                                                                                                                                                                                                                                                                             |
| loadingFlatbedRate           | Flatbed Loading              | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of loading outbound flatbed trucks, per bale.                                                                                                                                                                                                                                                                                                                                        |
| handlingTransitRate          | Handling Transit Cotton      | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of handling transit cotton, per bale.                                                                                                                                                                                                                                                                                                                                                |
| unloadingRate                | Unloading                    | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of unloading and restocking of cotton, per bale.                                                                                                                                                                                                                                                                                                                                     |
| rehandlingRate               | Rehandling                   | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of rehandling after breakout because of delayed pickup, cancellation of order, or for any other purpose, per bale.                                                                                                                                                                                                                                                                   |
| rearrangingRate              | Rearranging                  | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of rearranging or reworking of cotton on or in truck for any purpose, per bale.                                                                                                                                                                                                                                                                                                      |
| consolidationRate            | Consolidation                | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of consolidation including unloading, checking and reloading to outbound conveyance, per bale.                                                                                                                                                                                                                                                                                       |
| surchargeFee                 | Surcharge Fee                | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of surcharge on orders containing 10 bales or less, per bale.                                                                                                                                                                                                                                                                                                                        |
| matchingTagsRate             | Matching Tags                | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of matching special tags to bales by bale number, per bale.                                                                                                                                                                                                                                                                                                                          |
| shippingTagsRate             | Shipping Tags                | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of applying shipper's tags, per bale.                                                                                                                                                                                                                                                                                                                                                |
| shippingExtraTiesRate        | Extra Shipping Ties          | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of extra ties if ties on bales are not reusable and extra ties are necessary, per bale.                                                                                                                                                                                                                                                                                              |
| shippingBoltSealRate         | Bolt Seal                    | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of applying bolt seal, per load.                                                                                                                                                                                                                                                                                                                                                     |
| shippingDrayageRate          | Drayage                      | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of drayage, where necessary, to rail, per bale.                                                                                                                                                                                                                                                                                                                                      |
| shippingOnHoldRate           | On-Hold                      | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of on-hold option, per bale.                                                                                                                                                                                                                                                                                                                                                         |
| shippingEarlyOrderRate       | Early Shipping Order         | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of additional fee for early shipping orders, per bale.                                                                                                                                                                                                                                                                                                                               |
| shippingChangeOrderRate      | Change of Shipping Order     | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of any change to an order following receipt of shipping order, per bale.                                                                                                                                                                                                                                                                                                             |
| shippingConversionOrderRate  | Conversion of Shipping Order | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of conversion of early shipping order to complete shipping order, per order.                                                                                                                                                                                                                                                                                                         |
| shippingSwappingOrderRate    | Swapping of Shipping Order   | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of swapping of shipping order per bale on any shipping order swapped, per bale.                                                                                                                                                                                                                                                                                                      |
| shippingResaleOrderRate      | Resale of Shipping Order     | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of resale of shipping order per side, with retention of agreed upon load date, per bale.                                                                                                                                                                                                                                                                                             |
| shippingDelayedPickUpRate    | Delayed Pick-up              | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of cotton that is picked up after the scheduled pick-up date, per bale.                                                                                                                                                                                                                                                                                                              |
| shippingCancellationRate     | Cancellation of Order        | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of cancellation of order and return to stock after breakout, per bale.                                                                                                                                                                                                                                                                                                               |
| receiptConversionRate        | Receipt Conversion           | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of converting electronic receipts to paper receipts or paper receipts to electronic receipts, per receipt.                                                                                                                                                                                                                                                                           |
| rangingInspectionRate        | Ranging for Inspection       | Number      | FALSE        | 0-50                       | 2.5                                                                                            | Cost of ranging cotton for inspection and return to storage if necessary, per bale.                                                                                                                                                                                                                                                                                                       |

**Entity Data Dictionary**

| **Name**              | **Title**               | **Type**    | **Required** | **Allowed Values**        | **Example Value**                                     | **Description**                                                                                                                                                                                                                                                             |
|-----------------------|-------------------------|-------------|--------------|---------------------------|-------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| entity                | Entity                  | Object      |              |                           |                                                       |                                                                                                                                                                                                                                                                             |
| entityID              | Entity ID               | Number      | TRUE         |                           | 11                                                    | The ID number of the specific entity.                                                                                                                                                                                                                                       |
| entityName            | Entity Name             | REF         | TRUE         | string                    | "Sample Company"                                      | The name of the entity.                                                                                                                                                                                                                                                     |
|                       |                         |             |              |                           |                                                       | \*Note, this property references the name definition in general data dictionary.                                                                                                                                                                                            |
|                       |                         |             |              |                           |                                                       | Schema reference - "https://cottontechnologyalliance.github.io/Documentation/Common/generalSchema.json\#/definitions/name"                                                                                                                                                  |
| entityAddress         | Entity Address          | Array       | FALSE        |                           |                                                       | The address(es) of the entity.                                                                                                                                                                                                                                              |
| address               | Address                 | REF, Object | TRUE         | string                    | "1234 abc ln.",                                       | A full address.                                                                                                                                                                                                                                                             |
|                       |                         |             |              |                           | "Memphis",                                            | \*Note, this property references the addressFullText definition in general data dictionary.                                                                                                                                                                                 |
|                       |                         |             |              |                           | "TN",                                                 | Schema reference - "https://cottontechnologyalliance.github.io/Documentation/Common/generalSchema.json\#/definitions/addressFullText"                                                                                                                                       |
|                       |                         |             |              |                           | "38111",                                              |                                                                                                                                                                                                                                                                             |
|                       |                         |             |              |                           | "United States"                                       |                                                                                                                                                                                                                                                                             |
| entityTelephoneNumber | Entity Telephone Number | Array       | FALSE        |                           |                                                       | The telephone number(s) of the entity.                                                                                                                                                                                                                                      |
| telephoneNumber       | Telephone Number        | REF, Object | TRUE         | string                    | "888-888-8888"                                        | The primary telephone number of the entity.                                                                                                                                                                                                                                 |
|                       |                         |             |              |                           |                                                       | \*Note, this property references the telephoneNumber definition in general data dictionary.                                                                                                                                                                                 |
|                       |                         |             |              |                           |                                                       | Schema reference - "https://cottontechnologyalliance.github.io/Documentation/Common/generalSchema.json\#/definitions/telephoneNumber"                                                                                                                                       |
| entityEmailAddress    | Entity Email Address    | Array       | FALSE        |                           |                                                       | The email address(es) of the entity.                                                                                                                                                                                                                                        |
| email                 | Email                   | REF, Object | TRUE         | string                    | "testemail\@example.com"                              | An email address.                                                                                                                                                                                                                                                           |
|                       |                         |             |              |                           |                                                       | \*Note, this property references the email definition in general data dictionary.                                                                                                                                                                                           |
|                       |                         |             |              |                           |                                                       | Schema reference - "https://cottontechnologyalliance.github.io/Documentation/Common/generalSchema.json\#/definitions/email"                                                                                                                                                 |
| entityType            | Entity Type             | Object      | TRUE         | One of: [entityWarehouse] |                                                       | The type of entity being used.                                                                                                                                                                                                                                              |
| entityWarehouse       | Warehouse Identity      | Object      |              |                           |                                                       | The specific properties of a warehouse.                                                                                                                                                                                                                                     |
| warehouseCode         | Warehouse Code          | String      | TRUE         |                           | "123456"                                              | The code that identifies the warehouse.                                                                                                                                                                                                                                     |
| warehouseLicense      | Warehouse License       | String      | FALSE        |                           | "1-1234"                                              | The USDA license number of the warehouse.                                                                                                                                                                                                                                   |
| warehouseCert         | Warehouse Certificated  | Boolean     | TRUE         |                           | FALSE                                                 | Indicates whether the warehouse is ICE certificated or not.                                                                                                                                                                                                                 |

**General Data Dictionary**

| **Name**         | **Title**          | **Type**     | **Required** | **Allowed Values**                                    | **Example Value**        | **Description**                                                                         |
|------------------|--------------------|--------------|--------------|-------------------------------------------------------|--------------------------|-----------------------------------------------------------------------------------------|
| date             | Date               | String       |              | 1/1/0001-12/31/2999                                   | "2018-11-06"             | A full date.                                                                            |
| name             | Name               | String       |              |                                                       | "Sample Company"         | The name of a person or organization.                                                   |
| addressFullText  | Address            | Object       |              |                                                       |                          | A complete address.                                                                     |
| addressType      | Address Type       | String, ENUM | FALSE        | "Primary", "Mailing"                                  | "Primary"                | The type of address                                                                     |
| addressLine1     | Address Line 1     | String       | TRUE         |                                                       | "1234 abc ln."           | The first line of the address.                                                          |
| addressLine2     | Address Line 2     | String       | FALSE        |                                                       | "Apt \# 102"             | The second line of the address, if necessary.                                           |
| city             | City               | String       | TRUE         |                                                       | "Memphis"                | The city the address is located in.                                                     |
| stateProvince    | State or Province  | String       | TRUE         |                                                       | "TN"                     | The state or province the address is located in.                                        |
| zipPostalCode    | ZIP or Postal Code | String       | TRUE         |                                                       | "38111"                  | The ZIP or postal code of the address.                                                  |
| country          | Country            | String       | FALSE        |                                                       | "USA"                    | A country, territory, dependency, or other such geopolitical subdivision of a location. |
| telephoneNumber  | Telephone Number   | Object       |              |                                                       |                          | A full telephone number.                                                                |
| telephoneType    | Telephone Type     | String, ENUM | FALSE        | "Primary", "Secondary", "Cell", "Work", "Home", "Fax" | "Primary"                | The type of telephone number.                                                           |
| number           | Number             | String       | TRUE         |                                                       | "888-888-8888"           | The digits of a telephone number.                                                       |
| email            | Email Address      | String       |              |                                                       | "testemail\@example.com" | An email address for a contact.                                                         |
| currencyCodeType | Currency Code Type | String, ENUM |              | "EUR", "GBP", "USD", "CNY"                            | "USD"                    | A data type for a currency that qualifies a monetary amount.                            |
| unitStandard     | Unit Standard      | String       |              |                                                       | "bale"                   | A quantity chosen as a standard in terms of which other quantities may be expressed.    |

Schemas

**Warehouse Schema**

{

"\$schema": "http://json-schema.org/schema\#",

"\$id":

"https://cottontechnologyalliance.github.io/Documentation/WarehouseTariff/warehouseTariff.json"

"title": "Warehouse Tariffs",

"type": "object",

  "properties": {

    "warehouseIdentity": {

      "title": "Warehouse Identity",

"description": "Describes the warehouse involved.",

"type": "object",

"allOf": [{"\$ref": "entitySchema.json\#/definitions/entity"}]

    },

    "currency": {

      "title": "Currency",

      "description": "The type of currency this warehouse uses.",

      "type": "object",

      "properties": {

        "currencyType": {

          "title": "Currency Type",

"description": "A unit of money or exchange.",

"type": "string",

          "\$ref": "generalSchema.json\#/definitions/currencyCodeType"

        }

      },

      "required": [

        "currencyType"

      ]

    },

    "unit": {

      "title": "Unit",

      "description": "The unit each price is set to.",

      "type": "object",

      "properties": {

        "unitType": {

          "title": "Unit Type",

"description": "The quantity things are measured in.",

"type": "string",

          "\$ref": "generalSchema.json\#/definitions/unitStandard"

        }

      },

      "required": [

        "unitType"

      ]

    },

    "warehouseTariffDate": {

      "title": "Warehouse Tariff Date",

      "description": "The begin and end date for a warehouse tariff.",

      "type": "object",

      "properties": {

        "beginDate": {

          "title": "Tariff Begin Date",

"description": "The effective date of the warehouse tariff.",

"type": "string",

          "\$ref": "generalSchema.json\#/definitions/date"

        },

        "endDate": {

          "title": "Tariff End Date",

"description": "The day before the effective date of the new year.",

"type": "string",

          "\$ref": "generalSchema.json\#/definitions/date"

        }

      },

      "required": [

        "beginDate",

        "endDate"

      ]

    },

    "warehouseReceiving": {

      "title": "Warehouse Receiving",

      "description": "Defines receiving cotton in a warehouse.",

      "type": "object",

      "properties": {

        "receivingRate": {

          "title": "Receiving",

"description": "Cost of receiving, issuing of warehouse receipt, and placing in
storage, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "receivingCertRate": {

          "title": "Certificated Receiving",

"description": "Cost of receiving, issuing of warehouse receipt, and placing in
storage for certificated cotton, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        }

      },

      "required": [

       "receivingRate"

      ]

    },

    "warehouseStorage": {

      "title": "Warehouse Storage",

      "description": "Defines storing cotton in a warehouse.",

      "type": "object",

      "properties": {

       "storageRate": {

          "title": "Storage",

"description": "Cost of storing cotton in warehouse, per bale per unit time (day
or month).",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "storageCertRate": {

          "title": "Certificated Storage",

"description": "Cost of storage for certificated cotton, per bale per unit time
(day or month).",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "storageInsuranceRate": {

          "title": "Storage Insurance",

"description": "Additional charge for insurance while in storage, per bale per
unit time (day or month).",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        }

      },

      "required": [

       "storageRate"

      ]

    },

    "warehouseLoading": {

      "title": "Warehouse Loading",

      "description": "Defines loading cotton at a warehouse.",

      "type": "object",

      "properties": {

        "loadingRate": {

          "title": "Loading",

"description": "Cost of picking out by tag number, removing cotton from storage,
delivering to warehouse platform, and loading, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        }

      },

      "required": [

       "loadingRate"

      ]

    },

    "warehouseCompression": {

      "title": "Warehouse Compression",

      "description": "Defines compression of cotton in a warehouse.",

      "type": "object",

      "properties": {

"compressionRate": {

"title": "Compression",

"description": "Cost of compression of cotton at a warehouse, per bale.",

"type": "number",

"\$ref": "\#/definitions/rateAmount"

},

"compressionPatchRate": {

"title": "Application of Patch",

"description": "Cost of application of patch where necessary, per bale.",

"type": "number",

"\$ref": "\#/definitions/rateAmount"

},

"compressionExtraRate": {

"title": "Extra Compression",

"description": "Cost of extra compression for bales weighing over the weight
limit, per bale.",

"type": "number",

"\$ref": "\#/definitions/rateAmount"

}

      },

      "required": [

       "compressionRate"

      ]

    },

    "warehouseMarking": {

      "title": "Warehouse Marking",

      "description": "Defines marking or branding cotton.",

      "type": "object",

      "properties": {

        "markingRate": {

          "title": "Marking",

"description": "Cost to apply mark or brand to cotton, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "markingExtraRate": {

          "title": "Extra Marking",

"description": "Cost of additional marking or branding in excess of character
limit, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        }

      },

      "required": [

        "markingRate"

      ]

    },

    "warehouseClassing": {

      "title": "Warehouse Classing",

      "description": "Defines classing and sampling cotton at a warehouse.",

      "type": "object",

      "properties": {

       "samplingShipmentRate": {

          "title": "Sampling at Shipment",

"description": "Cost of sampling or resampling at time of shipment, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

         },

       "samplingStorageRate": {

          "title": "Sampling from Storage",

"description": "Cost of sampling or resampling, Including removing cotton from
and returning it to storage, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

         },

       "samplingOneSideRate": {

          "title": "Sampling from One Side",

"description": "Cost of sampling from one side only, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "classingCertRate": {

          "title": "Certificated Classing",

"description": "Cost of classing for certificated cotton, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        }

      },

      "required": [

       "samplingShipmentRate",

       "samplingStorageRate"

      ]

    },

    "warehouseWeighing": {

      "title": "Warehouse Weighing",

      "description": "Defines weighing cotton in a warehouse.",

      "type": "object",

      "properties": {

       "weighingShipmentRate": {

          "title": "Weighing at Shipment",

"description": "Cost of weighing or reweighing at time of shipment including
furnishing original and copies of certified weight sheets, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

       },

       "weighingStorageRate": {

          "title": "Weighing from Storage",

"description": "Cost of weighing or reweighing, including removing cotton from
and returning it to storage and furnishing original and copies of certified
weight sheets, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "weighingAndSamplingRate": {

          "title": "Weighing and Sampling",

"description": "Cost of weighing or reweighing at time of sampling from storage,
including removing cotton from and returning it to storage and furnishing
original and copies of certified weight sheets, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        }

      },

      "required": [

       "weighingShipmentRate",

       "weighingStorageRate",

       "weighingAndSamplingRate"

      ]

    },

    "miscellaneous": {

      "title": "Miscellaneous Tariffs",

      "description": "Additional warehouse tariffs.",

      "type": "object",

      "additionalProperties": true,

      "properties": {

        "receivingAdditionalFee": {

          "title": "Additional Receiving Fee",

"description": "Cost of any fees added while receiving order, such as any
classing or program fees, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "samplingExtraRate": {

          "title": "Extra Sampling",

"description": "Cost of drawing an extra set of samples, at time of any
sampling, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "samplingSortingRate": {

          "title": "Special Sorting of Samples",

"description": "Cost of special sorting of samples, per sample.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "samplingDeliveryRate": {

          "title": "Delivery of Samples",

"description": "Cost of delivery of samples or types by postage, freight or
express carrier, actual cost.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "samplingSackRate": {

          "title": "Sample Sacks",

"description": "Cost of furnishing sacks for samples, per sack.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "samplingHolesRate": {

          "title": "Closing Sample Holes",

"description": "Cost of closing holes on samples, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "weighingSheetsRate": {

          "title": "Weight Sheets",

"description": "Cost of providing extra copies of weight sheets, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "typingUnderRate": {

          "title": "Typing Under Weight",

"description": "Cost of typing - 25 pounds and under, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "typingOverRate": {

          "title": "Typing Over Weight",

"description": "Cost of typing - over 25 pounds, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "reconditioningBrushingRate": {

          "title": "Brushing Cotton",

"description": "Cost of brushing and/or blowing dirt and/or sand off cotton, per
bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "reconditioningDryingRate": {

          "title": "Drying Wet Cotton",

"description": "Cost of drying cotton received wet but undamaged, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "reconditioningDamagedRate": {

          "title": "Damaged Cotton",

"description": "Cost of repairing plated, water packed or gin fall bales or
picking damaged cotton, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "reconditioningBailingRate": {

          "title": "Bailing",

"description": "Cost of bailing loose, pickings or sweepings, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "reconditioningFumigationRate": {

          "title": "Fumigation",

"description": "Cost of removal from platform, non-vacuum fumigation, and the
immediate return to warehouse platform, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "phytosanitaryRate": {

          "title": "Phytosanitary Certificate",

"description": "Cost of Phytosanitary Certificates of cotton for export, per
load.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "receivingBlockRate": {

          "title": "Receiving Block Storage",

"description": "Cost of receiving block storage, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "storageBlockRate": {

          "title": "Block Storage",

"description": "Cost of block storage, per bale per unit time (day or month).",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "loadingBlockRate": {

          "title": "Loading Block Storage",

"description": "Cost of loading out of block storage, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "loadingExpeditedRate": {

          "title": "Expedited Loading",

"description": "Cost of expedited loading of order, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "loadingFlatbedRate": {

          "title": "Flatbed Loading",

"description": "Cost of loading outbound flatbed trucks, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "handlingTransitRate": {

          "title": "Handling Transit Cotton",

"description": "Cost of handling transit cotton, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "unloadingRate": {

          "title": "Unloading",

"description": "Cost of unloading and restocking of cotton, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "rehandlingRate": {

          "title": "Rehandling",

"description": "Cost of rehandling after breakout because of delayed pickup,
cancellation of order, or for any other purpose, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "rearrangingRate": {

          "title": "Rearranging",

"description": "Cost of rearranging or reworking of cotton on or in truck for
any purpose, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "consolidationRate": {

          "title": "Consolidation",

"description": "Cost of consolidation including unloading, checking and
reloading to outbound conveyance, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "surchargeFee": {

          "title": "Surcharge Fee",

"description": "Cost of surcharge on orders containing 10 bales or less, per
bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "matchingTagsRate": {

          "title": "Matching Tags",

"description": "Cost of matching special tags to bales by bale number, per
bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "shippingTagsRate": {

          "title": "Shipping Tags",

"description": "Cost of applying shipper's tags, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "shippingExtraTiesRate": {

          "title": "Extra Shipping Ties",

"description": "Cost of extra ties if ties on bales are not reusable and extra
ties are necessary, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "shippingBoltSealRate": {

          "title": "Bolt Seal",

"description": "Cost of applying bolt seal, per load.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "shippingDrayageRate": {

          "title": "Drayage",

"description": "Cost of drayage, where necessary, to rail, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "shippingOnHoldRate": {

          "title": "On-Hold",

"description": "Cost of on-hold option, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "shippingEarlyOrderRate": {

          "title": "Early Shipping Order",

"description": "Cost of additional fee for early shipping orders, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "shippingChangeOrderRate": {

          "title": "Change of Shipping Order",

"description": "Cost of any change to an order following receipt of shipping
order, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "shippingConversionOrderRate": {

          "title": "Conversion of Shipping Order",

"description": "Cost of conversion of early shipping order to complete shipping
order, per order.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "shippingSwappingOrderRate": {

          "title": "Swapping of Shipping Order",

"description": "Cost of swapping of shipping order per bale on any shipping
order swapped, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "shippingResaleOrderRate": {

          "title": "Resale of Shipping Order",

"description": "Cost of resale of shipping order per side, with retention of
agreed upon load date, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "shippingDelayedPickUpRate": {

          "title": "Delayed Pick-Up",

"description": "Cost of cotton that is picked up after the scheduled pick-up
date, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "shippingCancellationRate": {

          "title": "Cancellation of Order",

"description": "Cost of cancellation of order and return to stock after
breakout, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "receiptConversionRate": {

          "title": "Receipt Conversion",

"description": "Cost of converting electronic receipts to paper receipts or
paper receipts to electronic receipts, per receipt.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        },

        "rangingInspectionRate": {

          "title": "Ranging for Inspection",

"description": "Cost of ranging cotton for inspection and return to storage if
necessary, per bale.",

"type": "number",

          "\$ref": "\#/definitions/rateAmount"

        }

      }

    }

  },

  "required": [

    "warehouseIdentity",

    "currency",

    "unit",

    "warehouseTariffDate",

    "warehouseReceiving",

    "warehouseStorage",

    "warehouseLoading",

    "warehouseCompression",

    "warehouseMarking",

    "warehouseClassing",

    "warehouseWeighing"

  ],

  "definitions": {

    "rateAmount": {

      "title": "Rate Amount",

      "description": "The monetary amount of each rate per unit",

      "type": "number",

      "minimum": 0,

      "maximum": 50

    }

  }

}

**Entity Schema**

{

"\$schema": "http://json-schema.org/draft-07/schema\#",

"\$id":
"https://cottontechnologyalliance.github.io/Documentation/Common/entitySchema.json",

  "title": "Entity",

  "type": "object",

  "definitions": {

   "entity": {

   "type": "object",

   "properties" : {

   "entityID": {

       "title": "Entity ID",

       "description": "The ID number of the specific entity",

       "type": "number"

     },

    "entityName": {

      "title": "Entity Name",

"description": "The name of the entity.",

      "\$ref": "generalSchema.json\#/definitions/name"

    },

    "entityAddress": {

      "title": "Entity Address",

      "description": "The address(es) of the entity.",

      "type": "array",

      "items": {

"type": "object",

"\$ref": "generalSchema.json\#/definitions/addressFullText"

}

    },

    "entityTelephoneNumber": {

      "title": "Entity Telephone Number",

      "description": "The telephone number(s) of the entity",

      "type": "array",

      "items": {

"type": "object",

"\$ref": "generalSchema.json\#/definitions/telephoneNumber"

}

    },

    "entityEmailAddress": {

      "title": "Entity Email Address",

      "description": "The email address(es) of the entity",

"type": "array",

"items": {

"type": "object",

"\$ref": "generalSchema.json\#/definitions/email"

}

    },

    "entityType": {

      "title": "Entity Type",

      "description": "The type of entity being used.",

      "type": "object",

      "oneOf": [

        {"\$ref": "\#/definitions/entityWarehouse"}

      ]

    }

  },

  "required": [

   "entityID",

   "entityName",

   "entityType"

  ]

   },

"entityWarehouse": {

"title": "Entity: Warehouse",

"description": "The specific properties of a warehouse.",

"type": "object",

"properties": {

"warehouseCode": {

"title": "Warehouse Code",

"description": "The code that identifies the warehouse.",

"type": "string"

},

"warehouseLicense": {

"title": "Warehouse License",

"description": "The USDA license number of the warehouse.",

"type": "string"

},

"warehouseCert": {

"title": "Warehouse Certificated",

"description": "Indicates whether the warehouse is ICE certificated or not.",

"type": "boolean"

}

},

"required": [

"warehouseCode",

"warehouseCert"

]

}

  }

}

**General Schema**

{

"\$schema": "http://json-schema.org/draft-07/schema\#",

"\$id":
"https://cottontechnologyalliance.github.io/Documentation/Common/generalSchema.json",

  "title": "General",

  "type": "object",

  "definitions": {

    "date": {

      "title": "Date",

      "description": "A full date.",

      "type": "string",

      "format": "date"

    },

    "name": {

      "title": "Name",

      "description": "The name of a person or organization.",

      "type": "string"

    },

    "addressFullText": {

      "title": "Address",

      "description": "A complete address.",

      "type": "object",

      "properties": {

"addressType": {

"title": "Address Type",

"description": "The type of address",

"type": "string",

"enum": ["Primary", "Mailing"],

"default": "Primary"

},

        "addressLine1": {

          "title": "Address Line 1",

          "description": "The first line of the address.",

          "type": "string"

        },

        "addressLine2": {

          "title": "Address Line 2",

          "description": "The second line of the address, if needed.",

          "type": "string"

        },

        "city": {

          "title": "City",

          "description": "The city the address is located in.",

          "type": "string"

        },

        "stateProvince": {

          "title": "State or Province",

          "description": "The state or province the address is located in.",

          "type": "string"

        },

        "zipPostalCode": {

          "title": "ZIP or Postal Code",

          "description": "The ZIP or postal code of the address.",

          "type": "string"

        },

        "country": {

          "title": "Country",

          "description": "A country, territory, dependency, or other such
geopolitical subdivision of a location.",

"type": "string",

"default": "USA"

        }

      },

      "required": [

        "addressLine1",

        "city",

        "stateProvince",

        "zipPostalCode"

      ]

    },

    "telephoneNumber": {

      "title": "Telephone Number",

      "description": "A full telephone number.",

"type": "object",

"properties": {

"telephoneType": {

"title": "Telephone Type",

"description": "The type of telephone number",

"type": "string",

"enum": ["Primary", "Secondary", "Cell", "Work", "Home", "Fax"],

"default": "Primary"

},

"number": {

"title": "Number",

"description": "The digits of the telephone number.",

"type": "string"

}

},

"required": [

"number"

]

    },

    "email": {

      "title": "Email Address",

      "description": "An email address for a contact.",

"type": "string",

"format": "email"

    },

    "currencyCodeType": {

      "title": "Currency Code Type",

"description": "A data type for a currency that qualifies a monetary amount.",

"type": "string",

"enum": ["EUR","GBP","USD", "CNY"],

"default": "USD"

    },

    "unitStandard": {

      "title": "Unit Standard",

      "description": "A quantity chosen as a standard in terms of which other
quantities may be expressed.",

      "type": "string"

    }

  }

}

Warehouse

Application

This sample application models how a schema can be integrated into a simple web
app and used for data collection, data integration, and validation. The
application uses JSON Editor Online for json integration and schema validation.
This tool was programmed into the page for the purposes of this app, but it can
also be accessed as its own webpage at <https://jsoneditoronline.org>.

The application initially features a list of warehouses. The warehouses can be
viewed, and tariff information can be edited through two ways.

The primary method this guide will focus on is through a JSON editor component
that allows the user to view the schema and edit values accordingly. The editor
allows the user to directly type the values in as well as import a local json
file. In both cases, the data is validated against the schema immediately and
the user is alerted of any errors (and will not be able to submit the data until
the errors are fixed). The editor also allows the user to export a json file
containing valid data to keep for reference. The editor pulls schemas directly
from the CTA repository, and is therefore a great tool for keeping up-to-date
schemas and referencing multiple schemas.

The other way is through a form consisting of input fields for the user, which
mirrors the schema structure and validation requirements. The purpose of this
method is to show a user-friendly version of viewing and quickly editing tariff
information in a standardized format, but it is not necessary for basic json
validation. Although this method uses the schema as an object model for the form
and binds data which can then be validated against the schema, it does not pull
directly from the schema repository and requires hard-coding much of the schema
into the application. In this case, it is been programmed to communicate with
the editor for validation and consistent data binding, but it is reliant on
prior knowledge of the schema structure and will not stay up-to-date with the
schema structure and requirements unless its code is also updated. It is
therefore meant more as an example of a possible implementation of data
collection and validation rather than a standard model.

Walkthrough

The initial page features a list of warehouses.

![](media/2f4ed87f7925d0fc367f5e0dce017a47.png)

Clicking on the “Form” button underneath the warehouse pulls up a table
representation of that warehouse’s current tariff information.

![](media/aaa4b5c191e8e3774a6083075155767b.png)

At the bottom of the table, there are buttons for both editing methods.

![](media/b2af04f7abe5756f5732ed6236daa1e3.png)

The “Edit Form” button takes us to the second method discussed at the beginning
of this section. As mentioned previously, this method is not mean to serve as
the primary model for json schema validation, so the walkthrough will be brief.
Clicking that button brings up a form version of this table where all of the
values are input fields.

![](media/6bc15832e8b3c9cfed9076d12150bc06.png)

As can be seen in these pictures, any fields containing invalid data or required
data that has not been entered will show error messages and the save button at
the bottom of the form is disabled until those errors are resolved.

![](media/87324287fdd1ec9c9a3889e454157d96.png)

Once the inputs are valid the form can be saved, and the warehouse tariff table
is updated accordingly.

![](media/5adccb1cb123ff9f81779cdc7ad02319.png)

Moving on to the main feature of the application. Clicking the “Edit Schema”
button at the bottom of the table pulls up a json editor. It is pre-populated
with whatever data is currently bound to that warehouse, but just as with the
form all values can be edited from this component. There are several features
within the editor to assist with schema validation and editing data. At the top
of the editor is a blue bar that allows the user to expand or collapse data
fields as well as change the view of the data. Clicking “Tree” (as can be seen
in the picture below) pulls up a drop-down list of different view options. Tree
view has been set to the default view in this case, but that setting can be
modified according to the user’s preference. An example of Code view is provided
below.

![](media/5567acfc5b5e98f8887d53cd85a4baa3.png)

![](media/35c4be2501d58694535062cd2127759e.png)

Because the editor sets the schema as soon as it’s pulled up, validation occurs
immediately with pre-populated data and when any field is edited or changed.
Error messages are located in-line in both tree and code views. An error icon
pops up next to any invalid field and hovering over the icon allows the user to
see what the error is.

![](media/8760ba951df436f7be3c8dbe40458cb8.png)

Additionally, the editor in this application has been designed so that data
changes can not be submitted until all errors are resolved.

![](media/a491d9202d8d26bfc76fcf2229b8edb8.png)

Two other features included from this screen are the “Import” and “Export”
buttons. “Import” allows the user to import a locally stored json file into the
editor. For instance, if a warehouse has a json file that already has all their
tariff information, they can import this file and the data fields will be
updated automatically rather than the user having to type in all the values.
Clicking on Import brings up a choose file option at the top of the editor.

![](media/5a75b2b2d4e3e98f2ce5fe9c5c706473.png)

Once a file has been chosen, the fields corresponding to the data included in
the json file will be automatically updated. Validation will also occur on
import, so anything in the file that doesn’t satisfy the schema requirements
will throw error icons.

![](media/ddfde592b661c07b5a22fbed8558636a.png)

Once the data is entered and valid, clicking the save button will update the
warehouse table so that the information can be viewed easily.

![](media/65eb36e6e0b5ce5107ce1d7c3b094a43.png)

Clicking on the Export button on the bottom of the editor allows the user to
save everything currently in the editor as a json document. This way it can be
kept for reference or used as an import in the future.

![](media/4b02a0d203849841cfb128285a50163d.png)

Opening the file from downloads looks like this:

![](media/1afc23821301a93c2b7ca0ff8b2685bd.png)

Lastly, the editor in this application has an option to switch between schemas.
For the purposes of this demo this application has been limited to binding data
related to warehouse tariffs, but this option allows for reusability across
various schemas. A sample address schema was constructed to show how the editor
responds to switching schemas. Clicking on the “Change Schema” button on the top
of the editor pulls up a drop-down list of schema options.

![](media/eb6b09b3961354e79a81d5f4a9dddef7.png)

Once a schema is clicked, the editor will temporarily store whatever data is
currently displayed in the editor and switch over to the new schema. Because the
data is stored before switching, the user can switch between schemas without
losing any values they may have entered. However, this temporary storage is
limited to the current editor session, so it is important to make sure data is
submitted through the Save button before closing the editor.

![](media/3a642fe835cafcad391b5d267e7028e6.png)

An important note here is that the editor is able to set schemas for validation,
but it will not display schema fields if there is no corresponding json data. In
this case, a json object with empty values for each property was loaded with the
schema to ensure that all fields were displayed. The tariff schema in this
editor has been programmed with default empty or 0 values in order to make it
easier for users to view all possible fields.

Resources

**Cotton Technology Alliance Sharepoint - Documentation and Data Dictionaries**

<https://theseam2.sharepoint.com/sites/cta/SitePages/Home.aspx>

**Cotton Technology Alliance Github – Documentation, Repository for Schemas and
Applications**

<https://github.com/CottonTechnologyAlliance/CottonSchemas>

**Warehouse Tariff Web Application**

<https://cottonledger.theseam.com/ipfs/QmNxXGCNfjDMdaHMR6pxzgc6VmYkwUNpZ4rYN798yjsKES/#/>

**JSON Schema Validators**

<https://jsoneditoronline.org/>

<https://www.jsonschemavalidator.net/>

**Other Helpful Sites**

Guides for Understanding JSON Schema:

<https://json-schema.org/>

<https://json-schema.org/understanding-json-schema/index.html>

Spec Documentation for JSON:

<http://www.json.org/>

More Information on JSON:

<https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON>

National Information Exchange Model – Help with Data Standards:

<https://beta.movement.niem.gov/#/>

<http://niem.github.io/json/reference/json-schema/>

<https://tools.niem.gov/niemtools/ssgt/SSGT-GetNamespace.iepd?namespaceKey=o1-15>
