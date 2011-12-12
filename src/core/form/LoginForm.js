/**
 * Login Form
 *
 * @class Hatimeria.core.form.LoginForm
 * @extends Hatimeria.core.form.BaseForm
 */
(function() {

    Ext.define("Hatimeria.core.form.LoginForm", {
        extend: "Hatimeria.core.form.BaseForm",
        transNS: "form.login",
        transDomain: 'HatimeriaExtJSBundle',

        /**
         * Constructor
         * 
         * @private
         * @param {Object} cfg
         */
        constructor: function(cfg)
        {
            var config = cfg || {};
            config.url = Routing.generate('fos_user_security_check');
            
            if(config.logoUri) {
               this.logoUri = config.logoUri;
            } else {
               this.logoUri = "/bundles/hatimeriaadmin/images/hatimeria_v_220.png"
            }

            this.callParent([config]);
        },

        /**
         * Initialize component
         * 
         * @private
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
                        border: 0,
                        width: 250,
                        style:
                            'margin:20px auto;',
                        html: '<img src="' + this.logoUri + '"/>'
                    },
                    {
                        fieldLabel: this.__('login'),
                        name: '_username',
                        allowBlank: false,
                        width: 400,
                        height: 25,
                        style:
                            'margin-left:25px;',
                        listeners: {
                            specialkey: {scope: this, fn: this.onFieldEnter}
                        }
                    },
                    {
                        fieldLabel: this.__('password'),
                        inputType: 'password',
                        name: '_password',
                        allowBlank: false,
                        width: 400,
                        height: 25,
                        style:
                            'margin-left:25px;',
                        listeners: {
                            specialkey: {scope: this, fn: this.onFieldEnter}
                        }
                    },
                    {
                        border: 0,
                        width: 270,
                        id: 'hatimeria-powered-by',
                        style:
                            'margin:10px 125px;',
                        html: '<img src="/bundles/hatimeriaadmin/images/hatimeria.ico"/><p>Powered by Hatimeria</p> <a href="http://www.hatimeria.pl">www.hatimeria.pl</a>'
                    }
                ]
            };
            Ext.apply(this, Ext.apply(config, this.initialConfig));

            this.callParent();
        },
        
        /**
         * Hit enter on field
         * 
         * @private
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