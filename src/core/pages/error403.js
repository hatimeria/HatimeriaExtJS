Ext.define('Hatimeria.core.window.Error403Window', {
    extend: "Hatimeria.core.window.BaseWindow",
    transNS: 'error403',

    constructor: function() {
        var config = {
            title: this.__("title"),
            bodyStyle: 'background: white',
            bodyPadding: 50,
            html: this.__("content")
        };

        this.callParent([config]);
    }
});

/**
 * Error 403 page
 */
Ext.onReady(function() {
    Ext.create("Hatimeria.core.window.Error403Window").show();
});