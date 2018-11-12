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