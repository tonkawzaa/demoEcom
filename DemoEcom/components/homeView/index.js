'use strict';

app.homeView = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_homeView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
(function () {
    app.homeView.set('title', 'Odoo Mobile Commerce');
})();
(function (parent) {
    var access_token= null ;
    var homeViewModel = kendo.observable({
        
        fields: {
            
            email : '',
            password : '',
            /*
            email : 'top@gmail.com',
            password : '123456',
            */
        },
        submit: function(e) {
            var validator = $("#homeViewModel").data("kendoValidator");
           // navigator.notification.alert(validator.validate());
            
            if (validator.validate())
            {
               // navigator.notification.alert(reigisterViewModel.fields);
                $.ajax({
                        type: "POST",
                        url: server_location+"/api/login",
                        contentType: "application/json",
                        data: JSON.stringify({ 
                                                client_id:client_id,
                                                client_secret:client_secret,
                                                login:homeViewModel.fields.email,
                                                password:homeViewModel.fields.password,
                                             }),
                        success: function(result) {
                            //navigator.notification.alert(result);
                            
                            if(result.access_token)
                            {
                               //navigator.notification.alert(result.access_token);
                                
                                access_token = result.access_token ;
                                localStorage.setItem("access_token",access_token);

                                //navigator.notification.alert(access_token);
                                //app.mobileApp.navigate('components/categoriesView/view.html');
                                app.mobileApp.navigate('components/checkinView/view.html');
                                
                                
                            }else if(result.error)
                            {
                                navigator.notification.alert(result.error_description);
                            }
                            
                        },
                        error: function(result) {
                            navigator.notification.alert(result);
                            //navigator.notification.alert("เชื่อมต่อผิดพลาด");
                            
                        }
                  });
            }
            
          //  navigator.notification.alert(client_id);
          //  navigator.notification.alert(client_secret);
            
            
        },
        
        gotermofuse: function() {
                app.mobileApp.navigate('components/termsofuse/view.html');
        },
    });
    parent.set('homeViewModel', homeViewModel);
})(app.homeView)
// END_CUSTOM_CODE_homeView