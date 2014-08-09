//(function() {

		// inject listen.js into current webpage
		var s = document.createElement('script');
		s.src = chrome.extension.getURL("js/listen.js");
		s.onload = function() {
		   this.parentNode.removeChild(this);
		};
		
		(document.head||document.documentElement).appendChild(s);

//})();