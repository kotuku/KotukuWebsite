$(document).ready(function() {
	$('#contact-form').submit(function(e) {
	    e.preventDefault();
		var buttonCopy = $('#contact-form button').html(),
			errorMessage = $('#contact-form button').data('error-message'),
			sendingMessage = $('#contact-form button').data('sending-message'),
			okMessage = $('#contact-form button').data('ok-message'),
			hasError = false;
		
		$('#contact-form .error-message').remove();
		
		$('.requiredField').each(function() {
			if($.trim($(this).val()) == '') {
				var errorText = $(this).data('error-empty');
				$(this).parents('.controls').append('<span class="error-message" style="display:none;">'+errorText+'.</span>').find('.error-message').fadeIn('fast');
				$(this).addClass('inputError');
				hasError = true;
			} else if($(this).is("input[type='email']") || $(this).attr('name')==='email') {
				var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
				if(!emailReg.test($.trim($(this).val()))) {
					var invalidEmail = $(this).data('error-invalid');
					$(this).parents('.controls').append('<span class="error-message" style="display:none;">'+invalidEmail+'.</span>').find('.error-message').fadeIn('fast');
					$(this).addClass('inputError');
					hasError = true;
				}
			}
		});
		
		if(hasError) {
			$('#contact-form button').html('<i class="fa fa-times"></i>'+errorMessage);
			setTimeout(function(){
				$('#contact-form button').html(buttonCopy);
			},2000);
		}
		else {
		    
		    $.ajax({
		        url: $(this).attr('action'),
		        method: 'POST',
		        data: $(this).serialize(),
		        dataType: 'json',
		        beforeSend: function () {
		            $('#contact-form button').html('<i class="fa fa-spinner fa-spin"></i>' + sendingMessage);
		        },
		        success: function (data) {
		            $('#contact-form button').html('<i class="fa fa-check"></i>' + okMessage);
		        },
		        error: function (err) {
		            $('#contact-form button').html('There was an error!');
		        }
		    });
		}
		
		return false;	
	});
});