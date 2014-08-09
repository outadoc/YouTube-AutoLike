(function() {

	var intervalId = 0;
	setTimeout(setup, 5000);

	function setup() {
		var player =
			document.getElementById('movie_player') ||
			document.getElementsByTagName('embed')[0];

		if(player != null && player.getDuration) {
			if(!isVideoLiked()) {
				intervalId = setInterval(function() {
					console.log("checkin'...");

					if(player.getDuration() / 2 < player.getCurrentTime()) {
						if(!isVideoLiked()) {
							console.log("50% in! trying to like the video...");
							likeVideo();
						}

						clearInterval(intervalId);
					}

				}, 2000);
			} else {
				console.log("video was already liked, not listening");
			}

		} else {
			console.error("no youtube player here... :c");
		}
	}

	function isVideoLiked() {
		var likeDOM = document.getElementById("watch-like");

		if(likeDOM != null && likeDOM.className.indexOf("yt-uix-button-toggled") != -1) {
			return true;
		} else {
			return false;
		}
	}

	function likeVideo() {
		var likeDOM = document.getElementById("watch-like");
		console.log("clicking!");
		likeDOM.click();
	}

})();
