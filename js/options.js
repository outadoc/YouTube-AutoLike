/* Auto-Like for YouTube // options.js
   Copyright (c) 2014 outa[dev].
*/

function updateEventListeners() {
	//unbind all the existing click listeners so they don't have duplicates
	$('button.remove').unbind('click');
	$('button.add').unbind('click');
	
	//implement and bind removal functionnality
	$('button.remove').click(function() {
		//get the list of the lines of the table
		var tableLines = $('#whitelist tr');
		var wasLastLine = false;
		
		//if we deleted the last line of the table, remember it
		if(tableLines[tableLines.length-1] == $(this).parent().parent().get(0)) {
			wasLastLine = true;
		}
		
		//delete the line of the button we clicked
		$(this).parent().parent().remove();
		
		//if we just deleted the last line of the table
		if(wasLastLine) {
			//update the list of lines
			tableLines = $('#whitelist tr');
			//re-add the addition button on the last line (which isn't the same anymore)
			$($(tableLines[tableLines.length-1]).children('td')[1]).append('<button class="add">+</button>');
		}
		
		//update events listners so the new buttons react correctly
		updateEventListeners();
	});
	
	//implement and bind addition functionnality
	$('button.add').click(function() {
		//add two fields and a "remove" button
		var content = '<tr><td><input type="text" class="author" value=""></td>';
			content += '<td><button class="remove">-</button>';
			content += '<button class="add">+</button></td></tr>';
		
		$('#whitelist table tr button.add').remove();
		$('#whitelist table').append(content);
		
		//update events listners so the new buttons react correctly
		updateEventListeners();
	});
}

//when the user clicks save
$('input[name="save"]').click(function() {
	//the DOM textfields containing the names of the authors
	var authorsDOM = $('#whitelist .author');
	//the array that will contain the final array of filter properties
	var list = [];
	
	//for each author
	for(var i = 0; i < authorsDOM.length; i++) {
		//add the object containing the properties of the filter to the final array
		if(authorsDOM[i].value != "" && authorsDOM[i].value != null) {
			list[i] = authorsDOM[i].value
		}
	}
	
	//saving the whitelist with the Chrome storage API
	chrome.storage.sync.set({
		'whitelist': list
	}, function() {
		alert('Saved successfully!');
	});
});

//getting the whitelist using the Chrome storage API
chrome.storage.sync.get('whitelist', function(item) {
	//if the list has already been set and isn't empty
	if(item.whitelist != null && item.whitelist.length > 0) {
		//begin with adding a table and its header
		var content = '<table><tr><th>Author</th></tr>';
		
		//for each filter
		for(var i = 0; i < item.whitelist.length; i++) {
			//if the field is null, make it empty instead
			if(item.whitelist[i] == null) { item.whitelist[i] = ''; }
			
			//add two fields and a "remove" button for each line of the table
			content += '<tr><td><input type="text" class="author" value="' + item.whitelist[i] + '"></input></td><td>';
			
			//if it's not the first field
			if(i > 0 || item.whitelist.length > 1) {
				content += '<button class="remove">-</button>';
			}
			
			//if it's the last field, add an "add" button so the user can add fields later
			if(i == item.whitelist.length - 1) {
				content += '<button class="add">+</button>';
			}
			
			//close the line of the table
			content += '</td></tr>';
		}
		
		//close the table
		$('#whitelist').append(content + '</table>');
		
		//add event listeners to the buttons
		updateEventListeners();
	} else {
		//add a blank line so at least something shows up
		chrome.storage.sync.set({
			'whitelist': ['']
		}, function() {
			//reload the page
			document.location.reload(true);
		});
	}
});