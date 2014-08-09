(function() {

	chrome.storage.sync.get('whitelist', function(item) {	
		if(item.whitelist != null) {
			alert(JSON.stringify(item.whitelist));
		}
	});

})();