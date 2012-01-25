(function() {
    
    Ext.define("Hatimeria.core.window.LoginWindow", {
        extend: "Ext.window.Window",
        mixins: {
            translationable: 'Hatimeria.core.mixins.Translationable'
        },    
        transDomain: 'HatimeriaExtJSBundle',
        
        /**
         * Class name of login form
         *
         * @cfg {String} loginFormClassName
         */
        loginFormClassName: 'Hatimeria.core.form.LoginForm',
        
        constructor: function(cfg)
        {
            cfg = cfg || {};
            
            var clsName = cfg.loginFormClassName || this.loginFormClassName ; 
            var config = {
                title: this.__("window.login.title"),
                width: 510,
                height: 350,
                closable: false,
                resizable: false,
                layout: {
                    type: 'fit',
                    align: 'center'
                },  
                items: [
                    Ext.create(clsName, {
                        defaults: {
                            width: 400
                        }
                    })
                ]
            };
            Ext.apply(config, cfg || {});
            this.callParent([config]);
        }
    });
    
})();
