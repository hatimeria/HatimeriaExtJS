Ext.define("Hatimeria.core.form.BaseForm", {
    extend: "Ext.form.Panel",
    mixins: {
        translationable: 'Hatimeria.core.mixins.Translationable'
    },
    transDomain: 'HatimeriaExtJSBundle',
    
    /**
     * Submit button
     * 
     * @var Ext.button.Button
     */
    submitHandler: undefined,
    
    /**
     * Constructor
     * 
     * @param {} cfg
     */
    constructor: function(cfg)
    {
        var config = cfg || {};
        
        if (typeof this.submitConfig == 'object' && typeof this.submitConfig.submit == 'function')
        {
            Ext.merge(config, {api: {
                submit: this.submitConfig.submit    
            }});
        }
        
        if (typeof cfg == 'object' && typeof cfg.submitConfig == 'object' && typeof cfg.submitConfig.submit == 'function')
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
        
        this.getForm().on({
            actionfailed: {scope: this, fn: this.onAnyAction},
            actioncomplete: {scope: this, fn: this.onAnyAction}
        });
    },
    
    /**
     * Mount submit features
     */
    mountSubmit: function()
    {
        var config = this.submitConfig;
        this.submitHandler = Ext.create("Hatimeria.core.response.FormHandler", {
            failureWindowTitle: config.failureWindowTitle || this.__('form.alert_title'),
            success: config.success || function() {},
            formPanel: this
        });
        
        var submitButton = {
            text: config.text,
            scope: this,
            cls: this.submitConfig.iconCls || 'ux-button',
            handler: function(button) {
                this.submitForm();
            }
        };
        
        if (!this.buttons)
        {
            this.buttons = [];
        }
        
        this.buttons.push(submitButton);
    },
    
    /**
     * Submits form
     */
    submitForm: function()
    {
        var form = this.getForm();
        if (form.isValid())
        {
            console.log(form)
            var el = this.up('window');
            if (Ext.isObject(el))
            {
                this.mask = new Ext.LoadMask(el, {msg: 'Czekaj...'});
                this.mask.show();
            }
            form.submit(this.getSubmitHandler());
        }
    },
    
    /**
     * Submit handler
     */
    getSubmitHandler: function()
    {
        return this.submitHandler;
    },
    
    /**
     * Gets field by name
     * 
     * @param string name
     */
    getFieldByName: function(name)
    {
        return this.getForm().findField(name);
    },
    
    /**
     * Event: fires when any action completes
     */
    onAnyAction: function()
    {
        if (Ext.isObject(this.mask))
        {
            this.mask.hide();
        }
    }
});
