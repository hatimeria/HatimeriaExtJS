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
                defaults: {
                    labelWidth: 80,
                    labelAlign: 'right',
                    width: 300,
                    border: 0
                },
                items: this.getFieldsConfig([
                    {
                        xtype: 'textfield',
                        fieldLabel: this.__('login'),
                        name: '_username',
                        allowBlank: false,
                        height: 25,
                        listeners: {
                            specialkey: {scope: this, fn: this.onFieldEnter}
                        }
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: this.__('password'),
                        inputType: 'password',
                        name: '_password',
                        allowBlank: false,
                        height: 25,
                        listeners: {
                            specialkey: {scope: this, fn: this.onFieldEnter}
                        }
                    }
                ])
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
        },
        
        /**
         * Fields configuration 
         * Method adds branded theme
         * 
         * @param {Array} fieldsConfig
         */
        getFieldsConfig: function(fieldsConfig)
        {
            var fields = [
                {
                    border: 0,
                    width: 250,
                    style:
                        'margin:20px auto;',
                    html: '<img src="' + this.logoUri + '"/>'
                }
            ];
            
            fields.push(fieldsConfig);
            
            fields.push({
                border: 0,
                width: 270,
                id: 'hatimeria-powered-by',
                style:
                    'margin:10px 125px;',
                html: '<img src="/bundles/hatimeriaadmin/images/hatimeria.ico"/><p>Powered by Hatimeria</p> <a href="http://www.hatimeria.pl">www.hatimeria.pl</a>'
            });
            
            return fields;
        }
    });
    
})();