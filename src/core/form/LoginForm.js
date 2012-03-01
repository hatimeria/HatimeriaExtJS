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
         * name of route for redirect after succesfull login
         *
         * @cfg {String} afterLogin
         */
        afterLogin: 'hatimeria_admin',
        
        /**
         * Absolute path to logo
         *
         * @cfg {String} logoUri 
         */
        logoUri: "/bundles/hatimeriaadmin/images/hatimeria_v_220.png",
        
        /**
         * Text which appears under form (like copyrights)
         *
         * @cfg {String} footer 
         */
        footer: null,
        
        /**
         * Constructor
         * 
         * @param {Object} cfg
         */
        constructor: function(cfg)
        {
            var me = this;
            var config = {
                submitConfig: {
                    text: this.__('submit'),
                    failureWindowTitle: this.__("failureTitle"),
                    success: function() { 
                        window.location = Routing.generate(cfg.afterLogin || me.afterLogin); 
                    }
                },
                buttonConfig: {
                    text: 'Zaloguj'
                },
                waitMessage: this.__('wait'),
                url: Routing.generate('fos_user_security_check')
            };
            
            Ext.apply(config, cfg || {});
            this.callParent([config]);
        },
        
        /**
         * Initialize component
         * 
         * @private
         */
        initComponent: function()
        {
            if (!this.footer) {
                this.footer = this.__('copyright');
            }
            
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
                    xtype: 'image',
                    border: 0,
                    width: 220,
                    height: 50,
                    src: this.logoUri ,
                    style: {margin: '20px auto'}
                }
            ];
            
            fields.push(fieldsConfig);
            
            fields.push({
                border: 0,
                width: 350,
                height: 27,
                id: 'hatimeria-powered-by',
                style: {margin: '20px 65px'},
                html: this.footer
            });
            
            return fields;
        }
    });
    
})();