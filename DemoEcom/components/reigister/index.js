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
    var reigisterViewModel = kendo.observable({

    });
    parent.set('reigisterViewModel', reigisterViewModel);
})(app.reigisterView)
// END_CUSTOM_CODE_homeView