Ext.define("Hatimeria.core.form.BaseForm", {
    extend: "Ext.form.Panel",
    mixins: {
        translationable: 'Hatimeria.core.mixins.Translationable'
    },
    transDomain: 'HatimeriaExtJSBundle',

    
    /**
     * Constructor
     * 
     * @param {} cfg
     */
    constructor: function(cfg)
    {
        var config = cfg || {};
        
        if (typeof this.submitConfig == 'object')
        {
            if (typeof this.submitConfig.submit == 'function')
            {
                Ext.merge(config, {api: {
                    submit: this.submitConfig.submit    
                }});
            }
        }

        if (typeof cfg.submitConfig == 'object' && typeof cfg.submitConfig.submit == 'function')
        {
            Ext.merge(config, {api: {
                submit: cfg.submitConfig.submit
            }});
        }
        
        this.callParent([config]);
    },

    /**
     * Initialization
     */
    initComponent: function()
    {
        if (this.submitConfig)
        {
            this.mountSubmit();
        }
        
        this.callParent();
    },
    
    /**
     * Mount submit features
     */
    mountSubmit: function()
    {
        var config = this.submitConfig;
        var submitHandler = Ext.create("Hatimeria.core.response.FormHandler", {
            failureWindowTitle: config.failureWindowTitle || this.__('form.alert_title'),
            success: config.success || function() {},
            formPanel: this
        });
        
        var submitButton = {
            text: config.text,
            cls: this.submitConfig.iconCls || 'ux-button',
            handler: function(button) {
                var form = this.up('form').getForm();
                if (form.isValid())
                {
                    form.submit(submitHandler);
                }
            }
        };
        
        this.submitHandler = submitHandler;
        
        if (!this.buttons)
        {
            this.buttons = [];
        }
        
        this.buttons.push(submitButton);
    },
    
    /**
     * Gets field by name
     * 
     * @param string name
     */
    getFieldByName: function(name)
    {
        return this.getForm().findField(name);
    }
});
