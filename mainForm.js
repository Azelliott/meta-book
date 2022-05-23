$(document).ready(function() {

	$("form").validate({
		// Specify validation rules
		rules: {
			// The key name on the left side is the name attribute
			// of an input field. Validation rules are defined
			// on the right side
			bookTitle: "required",
			author: "required",
			isbn: "required",
			rating: {
				required: true,
				number: true,
				range: [1, 5]

			}

		},
		messages: {
			bookTitle: "Book title cannot be empty",
			author: "Author field cannot be empty",
			isbn: "ISBN is required",
			rating: "Enter number between 1 and 5"
		}

	});

	$("#addButton").on('click', function() {
		//This will check validation of form depending on rules
		if ($(".form").valid()) {
			// Get input values
			let title = $('#bookTitle').val();
			let author = $('#author').val();
			let isbn = $('#isbn').val();
			let rating = $('#rating').val();

			var keys = []; // Create array for keys
			var keys = Object.keys(localStorage); // get keys from localStorage
			var max = Math.max(...keys); // get highest key number
			var m1 = max + 1; // add one to highest key number in localStorage
			// Add data to localStorage
			Lockr.set(m1, {
				id: m1,
				title: title,
				author: author,
				isbn: isbn,
				rating: rating
			});
			table.updateOrAddData(JSON.stringify(Lockr.getAll())) // Update existing or add new data
			$(".form").trigger('reset') // Clear form inputs
			// Trigger success alert
			$.bootstrapGrowl("Record saved succesfully!", {
				ele: 'body', // which element to append to
				type: 'success', // (null, 'info', 'error', 'success')
				offset: {
					from: 'top',
					amount: 20
				}, // 'top', or 'bottom'
				align: 'right', // ('left', 'right', or 'center')
				width: 250, // (integer, or 'auto')
				delay: 4000,
				allow_dismiss: true,
				stackup_spacing: 10 // spacing between consecutively stacked growls.
			});
		}
	});

});