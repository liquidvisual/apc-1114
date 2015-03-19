/*
    FORMS.JS - Last updated: 27.02.15
*/
//-----------------------------------------------------------------
// Variables
//-----------------------------------------------------------------
//-----------------------------------------------------------------
//
//-----------------------------------------------------------------

 ;(function(){
    'use strict';

    var init = function(){

        var $form = $('.newsletter-subscribe-form');
        var $email = $form.find('input');

        $form.submit(function(event) {
            var $this = $(this);
            event.preventDefault();

            // Email Validation
            if (!$email.val().match(/^([a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,4}$)/i)) {
                displayError('Please provide a valid email');
                return;
            }

            // Begin loadbar animation
            NProgress.start();

            $.ajax({
                    type: 'POST',
                    url: $this.attr('action'),
                    // data: JSON.stringify($this.serializeArray()),
                    data: $(this).serialize(),
                    cache: false
            }).done(function(data) {
                    displaySuccess(data.Message);
                    console.log("The server responded with success: "+data);
                })
            .fail(function(data) {
                displayError(data.Message);
                console.log("The server responded with error: "+data);
            })
            .always(function(data) {
                console.log("The server responded with: "+data);
            });
        });

        //==================================================
        // Success
        //==================================================

        function displaySuccess(response) {
            var $status = $('<span class="status animated fadeIn"></span>');
            $form.find('span.status').remove();
            $status.insertAfter($email).removeClass('success errors');
            if (response == "OK") {
                $status.text(response).removeClass('errors').addClass('success');
                $form[0].reset();
                NProgress.done();
            } else {
                displayError(response);
            }
        }

        //==================================================
        // Error
        //==================================================

        function displayError(response) {
            var $status = $('<span class="status animated fadeIn"></span>');
            $form.find('span.status').remove();
            $status.insertAfter($email).removeClass('success errors');
            $status.text(response).removeClass('success').addClass('errors');
            NProgress.done();
        }
    }();
}());

//==================================================
//
//==================================================
