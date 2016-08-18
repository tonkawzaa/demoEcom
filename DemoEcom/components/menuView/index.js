'use strict';

app.MenuView = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_settingsView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
(function () {
    //app.settingsView.set('title', 'Settings');
    app.settingsView.set('title', "MenuView");
    
})();

(function(parent) {
    
    var MenuViewModel = kendo.observable({
       
        logout: function() {
            localStorage.removeItem("access_token");
            cart=[] ;
            order=[];
            localStorage.setItem("cart",JSON.stringify(cart));
            localStorage.setItem("order",JSON.stringify(order));
            ///localStorage.clear();
            
        	//token = localStorage.getItem("token");
            //navigator.notification.alert(token);
            app.mobileApp.navigate('components/homeView/view.html');
        },
        });

    parent.set('MenuViewModel', MenuViewModel);
})(app.MenuView);
// END_CUSTOM_CODE_settingsView