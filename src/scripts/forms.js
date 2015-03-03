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
                    type: 'GET',
                    url: $this.attr('action'),
                    data: JSON.stringify($this.serializeArray()),
                    cache: false,
                    success: function(){ displaySuccess("Thanks for signing up!") },
                    error: function(){ displayError("We're sorry, there was an error") }
            });
        });

        //==================================================
        // Success
        //==================================================

        function displaySuccess(message) {
            $status.text(message).removeClass('errors').addClass('success');
            $status.insertAfter($email);
            $form[0].reset();
            NProgress.done();
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
