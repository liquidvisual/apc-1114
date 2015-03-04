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
        var $status = $('<span class="status animated fadeIn"></span>');

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
                    displaySuccess(data);
                })
            .fail(function(data) {
                displayError(data);
            })
            .always(function(data) {
                console.log("The server responded with: "+data);
            });
        });

        //==================================================
        // Success
        //==================================================

        function displaySuccess(message) {
            if (message == "OK") {
                $status.text(message).removeClass('errors').addClass('success');
                $status.insertAfter($email);
                $form[0].reset();
                NProgress.done();
            } else {
                displayError(message);
            }
        }

        //==================================================
        // Error
        //==================================================

        function displayError(message) {
            $status.text(message).removeClass('success').addClass('errors');
            $status.insertAfter($email);
            NProgress.done();
        }
    }();
}());

//==================================================
//
//==================================================
