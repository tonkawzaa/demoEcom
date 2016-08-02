'use strict';

app.reigisterView = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_homeView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
(function () {
    app.reigisterView.set('title', 'reigister');
})();
(function (parent) {
    var access_token= null ;
    var reigisterViewModel = kendo.observable({
        fields: {
            
            name : '',
            email : '',
            password : '',
            password_confirmation : '',
            /*
            name : 'top',
            email : 'top@gmail.com',
            password : '123456',
            password_confirmation : '123456',
            */
        },
        submit: function(e) {
            var validator = $("#signup1_form").data("kendoValidator");
            //navigator.notification.alert(validator.validate());
            if (validator.validate())
            {
               // navigator.notification.alert(reigisterViewModel.fields);
                $.ajax({
                        type: "POST",
                        url: server_location+"/api/internal/signup",
                        contentType: "application/json",
                        data: JSON.stringify({ 
                                                client_id:client_id,
                                                client_secret:client_secret,
                                                name: reigisterViewModel.fields.name,
                                                email:reigisterViewModel.fields.email,
                                                password:reigisterViewModel.fields.password,
                                                password_confirmation:reigisterViewModel.fields.password_confirmation,
                                             }),
                        success: function(result) {
                            //navigator.notification.alert(result);
                            if(result.access_token)
                            {
                               //navigator.notification.alert(result.access_token);
                                
                                access_token = result.access_token ;
                                localStorage.clear();
                                localStorage.setItem("access_token",access_token);

                                //navigator.notification.alert(access_token);
                                app.mobileApp.navigate('components/contactsView/view.html');
                                
                                
                            }else if(result.error)
                            {
                                navigator.notification.alert(result.error_description);
                            }
                        },
                        error: function(result) {
                            //navigator.notification.alert(result);
                            navigator.notification.alert("เชื่อมต่อผิดพลาด");
                            
                        }
                  });
            }
            
          //  navigator.notification.alert(client_id);
          //  navigator.notification.alert(client_secret);
            
        },
        gohome: function() {
                app.mobileApp.navigate('components/homeView/view.html');
        },

    });
    parent.set('reigisterViewModel', reigisterViewModel);
})(app.reigisterView)
// END_CUSTOM_CODE_homeView