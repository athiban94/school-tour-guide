$( document ).ready(function() {
    $(".signup-action-btn").click(function(event){
        formId = 'form-create-user';
        if(!validateFormFields(formId)) {
            event.preventDefault();
        }
    });

    $(".login-action-btn").click(function(event){
        formId = 'user-login-user';
        if(!validateFormFields(formId)) {
            event.preventDefault();
        }
    });

    $("button.comment-submit").click(function(event){
        commentText = $(".comment-div-wrapper textarea.comment-area").val();
        restaurantId = $(".retaurant_id").val();
        if(!commentText || commentText === "") {
            $(".comment-div-wrapper textarea.comment-area").addClass("validate-input");
            return false;
        }
        postData = {
            'commenttext' : commentText,
            'restaurantid' : restaurantId
        }
        $.ajax({
            type: 'POST',
            url: '/comment/addcomment',
            data: postData,
            success: function(response) {
                console.log(response);
                if(response.validation) {
                    $('.user-comments').append('<div class="comment-text">"' + response.commenttext + '"</div>');
                    $('.user-comments').append('<div class="username-text">- ' + response.username + '</div>');
                    $(".user-review-section").hide();
                    return false;
                } else {
                    alert(response.message);
                }
            },
            error: function(error) {
                console.log("Exception Caught: " + error);
            }
        });
    });

    $(".wishlist-add-wrapper .place-options").click(function(event){
        option = $(this).attr('data-action');
        if(option == "wishlist") {
            $(this).addClass("added-to-wishlist");
        } else {
            $(this).addClass("upvoted");
        }
    });


});

function validateFormFields(formId) {
    validation = true;
    $( "#"+ formId +" input" ).each(function() {
        if(!$(this).val()) {
            validation = false;
            $(this).addClass("validate-input");
        }
    });
    return validation;
}