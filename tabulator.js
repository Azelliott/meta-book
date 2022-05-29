/* globals $:false */
/* jshint esversion: 6 */ 

// ========== Table Functions =================== //

// Function to load data into localStorage
function populateTable() {
	Lockr.set(1, {
		id: 1,
		title: "Don Quixote",
		author: "Miguel De Cervantes",
		isbn: "978-0-99-7025549-1",
		rating: "3"
	});
	Lockr.set(2, {
		id: 2,
		title: "Robinson Crusoe",
		author: "Daniel Defoe",
		isbn: "931-1-83-1937145-1",
		rating: "5"
	});
	Lockr.set(3, {
		id: 3,
		title: "Nightmare Abbey",
		author: "Thomas Love Peacock",
		isbn: "975-2-71-3987452-5",
		rating: "4"
	});
	Lockr.set(4, {
		id: 4,
		title: "The Adventures of Huckleberry Finn",
		author: "Mark Twain",
		isbn: "934-3-36-7431291-1",
		rating: "5"
	});
	Lockr.set(5, {
		id: 5,
		title: "Moby Dick",
		author: "Herman Melville",
		isbn: "986-4-32-7413493-3",
		rating: "4"
	});
}

populateTable();


//show localStorage data in the table
var tabledata = JSON.stringify(Lockr.getAll());


// ====================== Table Config ============================== //

//create Tabulator on DOM element with id "table"
var table = new Tabulator("#table", {
	height: 580, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
	initialSort: [{
		column: "id",
		dir: "asc"
	}], //sort by this column first
	reactiveData: true,
	pagination: "local",
	paginationSize: 9,
	paginationSizeSelector: [9, 18, 27, 36],
	clipboard: true, // Copy data from table to clipboard
	clipboardPasteAction: "replace", // replace table data on paste
	data: tabledata, //assign data to table
	placeholder: "No Data Available", //display message to user on empty table
	layout: "fitColumns", //fit columns to width of table (optional)
	layoutColumnsOnNewData: true, //adjust width every time the table updates
	responsiveLayout: "collapse", // collapse rows that no longer fit
	columns: [ //Define Table Columns
		{
			field: "id",
            width: 60,
			sorter: "number",
		},
		{
			title: "Title",
			field: "title",
			resizable: false,
            minWidth:300,
			sorter: "string"
		},
		{
			title: "Author",
			field: "author",
			resizable: false,
            minWidth:300,
			sorter: "string"
		},
		{
			title: "ISBN",
			field: "isbn",
			resizable: false,
            minWidth:200,
			sorter: "number"
		},
		{
			title: "Rating",
			field: "rating",
			resizable: false,
			formatter: "star",
			sorter: "number",
            minWidth: 100,
			formatterParams: {
				stars: 5,
			}
		},
		{
			headerSort: false,
			formatter: "buttonCross",
			width: 60,
            minWidth: 60,
            responsive:0,
			resizable: false,
			cellClick: function(e, cell) {
				if (confirm("Are you sure you want to delete this  entry?")) // trigger delete dialog
					var data = cell.getRow().getData(); // Get row data
				Lockr.rm(data.id); // Get value of id field and remove from localStorage
				cell.getRow().delete(); // Remove row from table
				$.bootstrapGrowl("Record removed succesfully!", {
					ele: 'body', // which element to append to
					type: 'error', // (null, 'info', 'error', 'success')
					offset: {
						from: 'top',
						amount: 20
					}, // 'top', or 'bottom'
					align: 'right', // ('left', 'right', or 'center')
					width: 250, // (integer, or 'auto')
					delay: 4000, // allow delay
					allow_dismiss: true, //allow alert dismiss
					stackup_spacing: 10 // spacing between consecutively stacked growls.
				});
			}
		},
	],
});

//============= Download Functions ===============//

//trigger download of data.csv file
$("#download-csv").click(function(e) {
	table.download("csv", "data.csv");
});

//trigger download of data.json file
$("#download-json").click(function(e) {
	table.download("json", "data.json");
});

//trigger download of data.xlsx file
$("#download-xlsx").click(function(e) {
	table.download("xlsx", "data.xlsx", {
		sheetName: "MetaBook data"
	});
});

//trigger download of data.pdf file
$("#download-pdf").click(function(e) {
	table.download("pdf", "data.pdf", {
		orientation: "portrait", //set page orientation to portrait
		title: "MetaBook Report", //add title to report
	});
});