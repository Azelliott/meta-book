$('#editModal').on('shown.bs.modal', function() {
	$(".modal-form").validate({
		// Specify validation rules
		rules: {
			// The key name on the left side is the name attribute
			// of an input field. Validation rules are defined
			// on the right side
			"modal-id": {
				required: true,
				number: true
			},
			"modal-bookTitle": "required",
			"modal-author": "required",
			"modal-isbn": "required",
			"modal-rating": {
				required: true,
				number: true,
				minlength: 1,
				maxlength: 5
			}

		},
		messages: {
			"modal-id": "Book ID number is required",
			"modal-bookTitle": "Book title cannot be empty",
			"modal-author": "Author field cannot be empty",
			"modal-isbn": "ISBN is required",
			"modal-rating": "Enter number between 1 and 5"
		}

	});


	$("#modal-save").on('click', function() {
		//This will check validation of form depending on rules
		$("#modal-id").focus();
		if ($(".modal-form").valid()) {
			//Get input values
			let id = $('#modal-id').val();
			let title = $('#modal-bookTitle').val();
			let author = $('#modal-author').val();
			let isbn = $('#modal-isbn').val();
			let rating = $('#modal-rating').val();

            // Add data to localStorage
			Lockr.set(id, {
				id: id,
				title: title,
				author: author,
				isbn: isbn,
				rating: rating
			});
			table.updateOrAddData(JSON.stringify(Lockr.getAll())) // Update existing or add new data
			$(".modal-form").trigger('reset') // Clear form inputs
			$.bootstrapGrowl("Record edited succesfully!", {
				ele: 'body', // which element to append to
				type: 'info', // (null, 'info', 'error', 'success')
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

})