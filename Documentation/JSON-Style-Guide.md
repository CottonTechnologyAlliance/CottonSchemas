# Style guide for creating JSON schemas

* For more information on JSON, please see the [JSON Spec documentation](http://www.json.org/) and [JSON Style Guide](https://google.github.io/styleguide/jsoncstyleguide.xml)
* Additional JSON documentation [JSON Information](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON)

## Properties

### Names

* Property names should be surrounded by double quotes **(")**.
* The name should be meaningful.
* The first character should be a letter or an underscore **(_)** or a dollar sign **($)**.
* Subsequent characters may be letters, digits, underscores or dollar signs.
* Avoid all JavaScript keywords - see [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords) for the list of reserved words.
* Array properties should be plural.  All other property names should be singular.

### Values

* Property values should be string, numeric, object, array, boolean or null.
* Use double quotes **(")** to surround string values.
* Dates should adhere to [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt).
  * As a rule of thumb, use the date format produced from JavaScript's **Date** class. For example

  ```javascript
  > (new Date()).toISOString()
  > "2018-08-22T17:50:12.123Z"
  ```

* Time duration should follow the format specified by [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601#Durations) standard.
  * For example, a duration of three years, six months, four days, twelve hours, thirty minutes, and five seconds would look like this: ```P3Y6M4DT12H30M5S```
