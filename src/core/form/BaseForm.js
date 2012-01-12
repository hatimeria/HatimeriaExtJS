/**
 * Base form class
 * 
 * @class Hatimeria.core.form.BaseForm
 * @extends Ext.form.Panel
 */
Ext.define("Hatimeria.core.form.BaseForm", {
    extend: "Ext.form.Panel",
    requires: [
        'Ext.form.action.DirectLoad',
        'Hatimeria.core.response.FormHandler'
    ],
    mixins: {
        translationable: 'Hatimeria.core.mixins.Translationable'
    },
    transDomain: 'HatimeriaExtJSBundle',
    
    /**
     * @cfg {Object} submitConfig
     * 
     *     submitConfig: {
     *         text: 'button text',
     *         submit: DirectFN,
     *         iconCls: 'buttnon-icon-class',
     *         success: function() {
     *             // After success
     *         }
     *     }
     */
    
    /**
     * Submit button
     * 
     * @private
     * @property Ext.button.Button
     */
    submitHandler: undefined,
    
    /**
     * Constructor
     * 
     * @param {Object} cfg
     * @private
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
        
        this.addEvents('recordsaved');
        
        this.callParent([config]);
        
        // Data may be also returned in 'record':
        Ext.form.action.DirectLoad.override({
            onSuccess: function(response){
                var result = this.processResponse(response),
                    form = this.form;
                    
                // HACK:
                if (!result.data && result.record)   
                {
                    result.data = result.record;
                }
                    
                if (result === true || !result.success || !result.data) {
                    this.failureType = Ext.form.action.Action.LOAD_FAILURE;
                    form.afterAction(this, false);
                    return;
                }
                form.clearInvalid();
                form.setValues(result.data || result.record);
                form.afterAction(this, true);
            }
        });
    },

    /**
     * Initialization
     * 
     * @private
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
     * 
     * @private
     */
    mountSubmit: function()
    {
        var config = this.submitConfig;
        
        // Add button only if submitConfig.text defined:
        if (typeof config.text != 'undefined')
        {
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
        }
    },
    
    /**
     * Submits form
     */
    submitForm: function()
    {
        var _this = this;
        var form = this.getForm();
        if (!form.isValid())
        {
            return;
        }
        var el = this.up('window') || this.up('container') || this;

        if (this.isFormProxyEnabled())
        {
            form.submit(this.getSubmitHandler());
            // @todo add recordsaved fire event when successfull
        }
        else
        {
            if (this.isRecordProxyEnabled())
            {
                _this.saveRecord();
            } 
            else {
                Ext.Msg.show({
                    msg: "No record bound to form, api or submit config provided"
                });
                
                return;
            }
        }
        
        if (Ext.isObject(el))
        {
            this.mask = new Ext.LoadMask(el, {msg: 'Czekaj...'});
            this.mask.show();
        }        
    },
    
    /**
     * Check if form has configured API
     * 
     * @return {Boolean}
     */
    isFormProxyEnabled: function()
    {
        var form = this.getForm();
        
        return (form.api && form.api.submit) || form.url;
    },
    
    /**
     * Check if record has configured proxy
     * 
     * @return {Boolean}
     */
    isRecordProxyEnabled: function()
    {
        var form = this.getForm();
        
        return form.getRecord() && !Ext.isEmpty(form.getRecord().proxy.api)
    },
    
    /**
     * Save record (only if record proxy configured)
     */
    saveRecord: function()
    {
        var form = this.getForm();
        var _this = this;
        var record = form.getRecord();
        Ext.apply(record.data, form.getValues());
        record.save(
        {
            success: function(rec, result, success) {
                _this.onAnyAction();
                _this.fireEvent('recordsaved');
                _this.getSubmitHandler().success(_this, result.records[0].data);
            },
            failure: function(rec, result, success) {
                _this.onAnyAction();
                _this.getSubmitHandler().failure(_this, {result: {msg: result.error}})
            }
        });
    },
    
    /**
     * Submit handler
     * 
     * @return {Hatimeria.core.response.FormHandler}
     */
    getSubmitHandler: function()
    {
        if (!this.submitHandler)
        {
            var config = this.submitConfig || {};
            this.submitHandler = Ext.create("Hatimeria.core.response.FormHandler", {
                failureWindowTitle: config.failureWindowTitle || this.__('form.alert_title'),
                success: config.success || function() {},
                formPanel: this
            });
        }
        
        return this.submitHandler;
    },
    
    /**
     * Gets field by name
     * 
     * @param {String} name
     * @return {Ext.form.Field}
     */
    getFieldByName: function(name)
    {
        return this.getForm().findField(name);
    },
    
    /**
     * Event: fires when any action completes
     * 
     * @private
     */
    onAnyAction: function()
    {
        if (Ext.isObject(this.mask))
        {
            this.mask.hide();
        }
    }
});
