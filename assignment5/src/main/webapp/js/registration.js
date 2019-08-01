var captcha;

$(document).ready(function() {
	$('.alert').hide();
  // DOM ready 
  captcha = $('#botdetect-captcha').captcha({ 
    captchaEndpoint: 
      './simple-captcha-endpoint' 
  });
  

  $("#registrationButton").click(function () {
	  
	  // the user-entered captcha code value to be validated at the backend side 
	  var userEnteredCaptchaCode = captcha.getUserEnteredCaptchaCode(); 
	  
	  // the id of a captcha instance that the user tried to solve 
	  var captchaId = captcha.getCaptchaId(); 

	  var postData = { 
	    userEnteredCaptchaCode: userEnteredCaptchaCode, 
	    captchaId: captchaId 
	  }; 
	  
	  $.ajax({
		    url: "./capthca/validation",
		    data: JSON.stringify(postData),
		    contentType: 'application/json; charset=utf-8', 
		    type: "POST",
		    dataType: "text",
		    success: function(data) {
		    	if (data === "success") {
			    	$("#registrationForm").submit();
		    	} else {
		    		$("#alertMsg").html("Please input the correct captcha code!");
		    		$('.alert').show();
		    		captcha.reloadImage();
		    	}
		    },
		});
  });
});
