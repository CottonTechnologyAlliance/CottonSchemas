# Application Demos

## Warehouse Tariff Sample Application Walkthrough
This sample application models how a schema can be integrated into a simple web app and used for data collection, data integration, and validation. The application uses JSON Editor Online for json integration and schema validation. This tool was programmed into the page for the purposes of this app, but it can also be accessed as its own webpage at [jsoneditoronline.org](https://jsoneditoronline.org).

The application initially features a list of warehouses. The warehouses can be viewed, and tariff information can be edited through two ways.

The primary method this guide will focus on is through a JSON editor component that allows the user to view the schema and edit values accordingly. The editor allows the user to directly type the values in as well as import a local json file. In both cases, the data is validated against the schema immediately and the user is alerted of any errors (and will not be able to submit the data until the errors are fixed). The editor also allows the user to export a json file containing valid data to keep for reference. The editor pulls schemas directly from the CTA repository, and is therefore a great tool for keeping up-to-date schemas and referencing multiple schemas.

The other way is through a form consisting of input fields for the user, which mirrors the schema structure and validation requirements. The purpose of this method is to show a user-friendly version of viewing and quickly editing tariff information in a standardized format, but it is not necessary for basic json validation. Although this method uses the schema as an object model for the form and binds data which can then be validated against the schema, it does not pull directly from the schema repository and requires hard-coding much of the schema into the application. In this case, it is been programmed to communicate with the editor for validation and consistent data binding, but it is reliant on prior knowledge of the schema structure and will not stay up-to-date with the schema structure and requirements unless its code is also updated. It is therefore meant more as an example of a possible implementation of data collection and validation rather than a standard model.

---

The initial page features a list of warehouses. 
<br/>   
![](/Images/warehouse-list.PNG)

Clicking on the “Form” button underneath the warehouse pulls up a table representation of that warehouse’s current tariff information.  
<br/>
![](/Images/empty-tariff-table.PNG)

At the bottom of the table, there are buttons for both editing methods.  
<br/>
![](/Images/table-edit-buttons.PNG)

The “Edit Form” button takes us to the second method discussed at the beginning of this section. As mentioned previously, this method is not mean to serve as the primary model for json schema validation, so the walkthrough will be brief. Clicking that button brings up a form version of this table where all the values are input fields.  
<br/>
![](/Images/form-input.PNG)

As can be seen in these pictures, any fields containing invalid data or required data that has not been entered will show error messages and the save button at the bottom of the form is disabled until those errors are resolved.  
<br/>
![](/Images/form-save-button.PNG)

Once the inputs are valid the form can be saved, and the warehouse tariff table is updated accordingly.  
<br/>
![](/Images/form-table-update.PNG)

Moving on to the main feature of the application. Clicking the “Edit Schema” button at the bottom of the table pulls up a json editor. It is pre-populated with whatever data is currently bound to that warehouse, but just as with the form all values can be edited from this component. There are several features within the editor to assist with schema validation and editing data. At the top of the editor is a blue bar that allows the user to expand or collapse data fields as well as change the view of the data. Clicking “Tree” (as can be seen in the picture below) pulls up a drop-down list of different view options. Tree view has been set to the default view in this case, but that setting can be modified according to the user’s preference. An example of Code view is provided below.  
  
![](/Images/editor-code.PNG)

Because the editor sets the schema as soon as it’s pulled up, validation occurs immediately with pre-populated data and when any field is edited or changed. Error messages are located in-line in both tree and code views. An error icon pops up next to any invalid field and hovering over the icon allows the user to see what the error is.  
<br/>
![](/Images/editor-error.PNG)

Additionally, the editor in this application has been designed so that data changes cannot be submitted until all errors are resolved.  
<br/>
![](/Images/editor-submit-error.PNG)

Two other features included from this screen are the “Import” and “Export” buttons. “Import” allows the user to import a locally stored json file into the editor. For instance, if a warehouse has a json file that already has all their tariff information, they can import this file and the data fields will be updated automatically rather than the user having to type in all the values. Clicking on Import brings up a choose file option at the top of the editor.  
<br/>
![](/Images/editor-tree.PNG)  
<br/>
![](/Images/editor-choose-file.PNG)

Once a file has been chosen, the fields corresponding to the data included in the json file will be automatically updated. Validation will also occur on import, so anything in the file that doesn’t satisfy the schema requirements will throw error icons.  
<br/>
![](/Images/editor-import.PNG)

Once the data is entered and valid, clicking the save button will update the warehouse tariff table so that the information can be viewed easily.  
<br/>
![](/Images/editor-table-update.PNG)

Clicking on the Export button on the bottom of the editor allows the user to save everything currently in the editor as a json document. This way it can be kept for reference or used as an import in the future.  
<br/>
![](/Images/editor-export.PNG)

Opening the file from downloads looks like this:  
<br/>
![](/Images/download-file.PNG)

Lastly, the editor in this application has an option to switch between schemas. For the purposes of this demo this application has been limited to binding data related to warehouse tariffs, but this option allows for reusability across various schemas. A sample address schema was constructed to show how the editor responds to switching schemas. Clicking on the “Change Schema” button on the top of the editor pulls up a drop-down list of schema options.  
<br/>
![](/Images/editor-change-schema.PNG)

Once a schema is clicked, the editor will temporarily store whatever data is currently displayed in the editor and switch over to the new schema. Because the data is stored before switching, the user can switch between schemas without losing any values they may have entered. However, this temporary storage is limited to the current editor session, so it is important to make sure data is submitted through the Save button before closing the editor.  
<br/>
![](/Images/address-schema.PNG)

**An important note here is that the editor can set schemas for validation, but it will not display schema fields if there is no corresponding json data. In this case, a json object with empty values for each property was loaded with the schema to ensure that all fields were displayed. The tariff schema in this editor has been programmed with default empty or 0 values in order to make it easier for users to view all possible fields.**
