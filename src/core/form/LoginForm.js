(function() {

    Ext.define("Hatimeria.core.form.LoginForm", {
        extend: "Hatimeria.core.form.BaseForm",
        transNS: "form.login",
        transDomain: 'HatimeriaExtJSBundle',

        /**
         * Constructor
         * 
         * @param {} cfg
         */
        constructor: function(cfg)
        {
            var config = cfg || {};
            config.url = Routing.generate('fos_user_security_check');

            this.callParent([config]);
        },

        /**
         * Initialize component
         */
        initComponent: function()
        {
            this.submitConfig = {
                text: this.__('submit'),
                failureWindowTitle: this.__("failureTitle"),
                success: function() { 
                    window.location = Routing.generate('homepage'); 
                }
            };

            var config = {
                layout: 'auto',
                bodyPadding: 10,
                border: 0,
                defaultType: 'textfield',
                items: [
                    {
                        fieldLabel: this.__('login'),
                        name: '_username',
                        allowBlank: false,
                        listeners: {
                            specialkey: {scope: this, fn: this.onFieldEnter}
                        }
                    },
                    {
                        fieldLabel: this.__('password'),
                        inputType: 'password',
                        name: '_password',
                        allowBlank: false,
                        listeners: {
                            specialkey: {scope: this, fn: this.onFieldEnter}
                        }
                    }
                ]
            };
            Ext.apply(this, Ext.apply(config, this.initialConfig));

            this.callParent();
        },
        
        /**
         * Hit enter on field
         */
        onFieldEnter: function(field, event)
        {
            if (event.getKey() == event.ENTER)
            {
                this.submitForm();
            }
        }
    });
    
})();