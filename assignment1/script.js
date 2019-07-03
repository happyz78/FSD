window.onload = function () {

    // Video
    var video = $("#video");

    // Buttons
    var playButton = $("#play");
    var pauseButton = $("#pause");
    var plusButton = $("#plus");
    var minusButton = $("#minus");
    var repeatButton = $("#repeat");
    var muteButton = $("#mute");

    // Event listener for the play/pause button
    playButton.click(function () {
        // Play the video
        video.get(0).play();
        pauseButton.attr("disabled", false);
        playButton.attr("disabled", true);
    });
    pauseButton.click(function () {
        // Pause the video
        video.get(0).pause();
        playButton.attr("disabled", false);
        pauseButton.attr("disabled", true);
    });

    video.get(0).addEventListener('ended',function() {
        playButton.attr("disabled", false);
        pauseButton.attr("disabled", true);
    },false);

    if (plusButton) {
        plusButton.click(function () {
            var volume = video.get(0).volume + 0.1;
            if (volume > 1) {
                volume = 1;
            }
            video.get(0).volume = volume;
        });
    }
    if (minusButton) {
        minusButton.click(function () {
            var volume = video.get(0).volume - 0.1;
            if (volume < 0) {
                volume = 0;
            }
            video.get(0).volume = volume;
        });
    }
    if (repeatButton) {
        repeatButton.click(function () {
            video.get(0).load();
            video.get(0).play();
            pauseButton.attr("disabled", false);
            playButton.attr("disabled", true);
        });
    }
    if (muteButton) {
        muteButton.click(function () {
            if (video.get(0).muted == false) {
                // Mute the video
                video.get(0).muted = true;
            } else {
                // Unmute the video
                video.get(0).muted = false;
            }
        });
    }

    var processBar = $("#process-bar");
    if (processBar) {
        // Update the seek bar as the video plays
        video.get(0).addEventListener("timeupdate", function () {
            // Calculate the slider value
            var value = (100 / video.get(0).duration) * video.get(0).currentTime;
            if (value) {
                // Update the slider value
                processBar.val(value);
            }
        });
    }
    var likeButton = $("#like");
    var likeLabel = $("#likeLabel");
    var value = localStorage.getItem("like");
    if (likeButton) {
        likeButton.click(function () {
            if (value) {
                value = parseInt(value) + 1;
            } else {
                value = 1;
            }
            localStorage.setItem("like", value);
            likeLabel.html(value);
        });

        if (value) {
            likeLabel.html(value);
        }
    }
    var dislikeButton = $("#dislike");
    var dislikeLabel = $("#dislikeLabel");
    var disvalue = localStorage.getItem("dislike");
    if (dislikeButton) {
        dislikeButton.click(function () {
            if (disvalue) {
                disvalue = parseInt(disvalue) + 1;
            } else {
                disvalue = 1;
            }
            localStorage.setItem("dislike", disvalue);
            dislikeLabel.html(disvalue);
        });
        if (disvalue) {
            dislikeLabel.html(disvalue);
        }
    }
}

var v = new Array();
v[0] = "video\\Introduction to HTML5.mp4";
v[1] = "video\\Introduction to Styling with CSS3.mp4";
v[2] = "video\\Introduction to Bootstrap 4.mp4";
v[3] = "video\\Learn to create website with HTML5, CSS3 and Bootstrap4.mp4";
v[4] = "video\\Introduction to Javascript.mp4";
function play(type) {
    var video = document.getElementById('video');
    video.setAttribute("src", v[type]);
    video.load();
    var playButton = $("#play");
    var pauseButton = $("#pause");
    // Play the video
    video.play();
    pauseButton.attr("disabled", false);
    playButton.attr("disabled", true);
    
    var processBar = $("#process-bar");
    processBar.val(0);
}