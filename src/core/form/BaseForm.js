/**
 * Base form class
 * 
 *     <pre><code>
 *     Ext.define("Foo.bar.Form", {
 *         submitConfig: {
 *           text: 'Save button text', // default: translated
 *           button: true, // include button? Default: true
 *           submit: DirectFN, // default: run record.save 
 *           iconCls: 'button-icon-class',   // DEPRECATED!
 *           icon: 'button-icon',            // DEPRECATED!
 *           success: function() {
 *              // After success backend operation
 *           }
 *         },
 *         
 *         // optional:
 *         buttonConfig: {
 *           // all features of Ext.button.Button component
 *         }
 *     });
 *     </code></pre>
 * 
 * @class Hatimeria.core.form.BaseForm
 * @extends Ext.form.Panel
 */
Ext.define("Hatimeria.core.form.BaseForm", {
    extend: "Ext.form.Panel",
    alias: 'widget.h-form',
    requires: [
        'Ext.form.action.DirectLoad',
        'Hatimeria.core.response.FormHandler'
    ],
    mixins: {
        configurable: 'Hatimeria.core.mixins.ConfigurableExternal',
        translationable: 'Hatimeria.core.mixins.Translationable'
    },
    transNS: 'form',
    
    /**
     * @cfg {Object} submitConfig
     */
    submitConfig: null,
    
    /**
     * Defaults of submitConfig
     * @property {Object} defaultSubmitConfig
     * @private 
     */
    defaultSubmitConfig: {
        button: true
    },
    
    /**
     * Button config
     * All features of {Ext.button.Button} component.
     * @cfg {Object} buttonConfig
     */
    buttonConfig:  null,
    
    /**
     * Default button config
     * @property {Object} defaultButtonConfig
     * @private
     */
    defaultButtonConfig: {
        cls: 'ux-button',
        text: null
    },
    
    /**
     * Message on wait mask, defaults to translated form.wait
     *
     * @cfg {String} waitMessage
     */
    waitMessage: null,
    
    /**
     * Submit button
     * 
     * @private
     * @property Ext.button.Button
     */
    submitHandler: undefined,
    
    /**
     * Used for translation for current class not extended one
     * 
     * @private
     */
    translate: function(key, placeholders)
    {
        return this.statics().prototype.__(key, placeholders);
    },
    
    /**
     * Constructor
     * 
     * @param {Object} cfg
     * @private
     */
    constructor: function(cfg)
    {
        var config = cfg || {};
        
        this.applyExternals(cfg);
        
        config = this.finalConfig(config, 'submitConfig');
        config = this.finalConfig(config, 'buttonConfig');

        if (typeof config.submitConfig.submit == 'function')
        {
            var submit = config.submitConfig.submit;
            if (submit.directCfg.method.formHandler != true) {
                console.error(submit.directCfg.action + '.' + 
                    submit.directCfg.method.name + " doesn't have @form annotation");
            }

            Ext.merge(config, {api: {
                submit: config.submitConfig.submit
            }});
        }
        
        if (config.buttonConfig.text === null) {
            config.buttonConfig.text = this.translate('save');
        }
        
        config.defaults = config.defaults || {};
        
        Ext.apply(config.defaults, {
            labelAlign: 'right',
            labelSeparator: '',
            labelStyle: 'color: #666',
            msgTarget: 'under'
        });
        
        this.addEvents(
        
            /**
             * @event recordsaved
             */
            'recordsaved'
        );
        
        this.callParent([config]);
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
     * Resolves final config of property
     * 
     * @param {Object} config
     * @param {String} varname
     * @return {Object}
     */
    finalConfig: function(config, varname)
    {
        // first copy defaults:
        var 
            defs = Ext.clone(this['default' + Ext.String.capitalize(varname)]),
            baseConfig
        
        if (this[varname]) {
            // if config in class is overwriten, we need create baseConfig from defaults merged with property from class
            baseConfig = Ext.apply(defs, this[varname]);
        }
        else {
            // otherwise we create baseConfig from default config
            baseConfig = defs;
        }
        
        // then baseConfig is merged with injected config
        baseConfig = Ext.apply(baseConfig, config[varname] || {});
        
        // we save resolved config to right property (then it will be written to "this")
        config[varname] = baseConfig;
        
        return config;
    },
    
    /**
     * Mount submit features
     * 
     * @private
     */
    mountSubmit: function()
    {
        var config = this.submitConfig;

        if (config.button)
        {
            // backward compatibility:
            Ext.copyTo(this.buttonConfig, this.submitConfig, ['iconCls', 'icon', 'text']);

            // Base button configuration:
            Ext.apply(this.buttonConfig, {
                scope: this,
                handler: function(button) {
                    this.submitForm();
                }
            });

            if (!this.buttons)
            {
                this.buttons = [];
            }

            this.buttons.push(this.buttonConfig);
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
        var el = this.getMaskedObject() || this.up('window') || this.up('container') || this;

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
            this.mask = new Ext.LoadMask(el, {msg: this.waitMessage || this.translate('wait')});
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
        
        return form.getRecord() && !Ext.isEmpty(form.getRecord().proxy.api) ;
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
        record.save({
            success: function(rec, result, success) {
                _this.onAnyAction();
                _this.fireEvent('recordsaved', record, result);
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
                failureWindowTitle: config.failureWindowTitle || this.translate('alert_title'),
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
    },
    
    /**
     * Merges external config
     * 
     * @param {} config
     * @return {}
     */
    applyExternals: function(cfg)
    {
        var config = this.getConnectedConfig();

        if (config && config.items)
        {
            for (var i in config.items)
            {
                cfg.items.push(config.items[i]);
            }
        }

        return cfg;
    },
    
    /**
     * Return object that will be masked on any actions
     * 
     * @return {Ext.container.Container}
     */
    getMaskedObject: function()
    {
        return false;
    }
});
