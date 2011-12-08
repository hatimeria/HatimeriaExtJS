/**
 * Edit Window
 * 
 * @class Hatimeria.edit.window.EditWindow
 * @extends Ext.window.Window
 */
(function() {
    
    Ext.define('Hatimeria.edit.window.EditWindow', {
        extend: 'Ext.window.Window',
        config: {
            
            /**
             * Parameters
             * 
             * @cfg {Object} params Persist params
             */
            params: {},
            
            /**
             * Data
             * 
             * @cfg {Object} data
             */
            data: undefined
        },
        
        /**
         * Initializes component
         * 
         * @private
         */
        initComponent: function()
        {
            var config = {
                width: 960,
                height: 600,
                buttons: [
                    Ext.create('Ext.button.Button', {
                        itemId: 'btn-save',
                        text: this.__('window.save'),
                        scope: this,
                        cls: 'ux-btn-save ext-pink-button',
                        handler: this.save
                    })
                ]
            };
            
            Ext.apply(this.initialConfig, Ext.apply(config, this.initialConfig || {}));
            
            this.callParent();
            
            this.addEvents([
                
                /**
                 * Save data
                 * @event save 
                 */
                'save',
                
                /**
                 * After save
                 * @event aftersave
                 */
                'aftersave',
                
                /**
                 * Error during save data
                 * @event errorsave
                 */
                'errorsave',
                
                /**
                 * Populating form with data
                 * @event populate
                 */
                'populate',
                
                /**
                 * Event rises when all is OK and window may be killed
                 * @event beforekill
                 */
                'beforekill'
            ]);
            
            this.on({
                afterrender: function() {
                    if (this.activateTab)
                    {
                        this.switchTab(this.activateTab);
                    }
                    this.loadData();
                },
                beforeclose: function() {
                    return this.onBeforeClose();
                }
            });
        },
        
        /**
         * Loads data and trigger populating forms
         * 
         * @private
         */
        loadData: function()
        {
            if (typeof this.getData() == 'object')
            {
                this.populate(this.getData());
                this.fireEvent('populate', this.getData());
                return true;
            }
            
            var mask = new Ext.LoadMask(this, {msg: this.__('window.loading')});
            mask.show();
            
            var params = {};
            Ext.apply(params, this.getParams() || {});
            
            Ext.create('Hatimeria.core.response.DirectHandler', {
                fn: this.api.load,
                params: params,
                scope: this,
                success: function(result) {
                    this.populate(result.record);
                    this.fireEvent('populate', result.record);
                    mask.hide();
                },
                error: function() {
                    mask.hide();
                    
                    return true;
                }
            });
            
            return true;
        },
        
        /**
         * Tabs panel with forms
         * 
         * @return {Ext.tab.Panel}
         */
        getTabs: function()
        {
            return this.getComponent('window-edit-tabs');
        },
        
        /**
         * Event: saves data
         * 
         * @private
         * @return {Boolean}
         */
        save: function()
        {
            if (!this.formsValid())
            {
                // Switch first invalid tab (form)
                this.getTabs().setActiveTab(this.getFirstDirtyTab());
                
                return false;
            }
            
            if (this.beforeSave())
            {
                this.doSave(this);
            }
            
            return true;
        },
        
        /**
         * Saves data
         */
        doSave: function()
        {
            var data = this.getFormsData();
            
            this.fireEvent('save', data);
            
            // Merging with incomming params:
            Ext.apply(data, this.getParams() || {});
            
            var mask = new Ext.LoadMask(this.getEl(), {msg: this.__('window.saving')});
            mask.show();
            
            Ext.create('Hatimeria.core.response.DirectHandler', {
                fn: this.api.submit,
                scope: this,
                params: data,
                success: function(result) {
                    this.fireEvent('aftersave', this, data, result.record);
                    mask.hide();
                    this.destroy();
                },
                error: function(response) {
                    mask.hide();
                    this.fireEvent('errorsave', response, data);
                    
                    if (typeof response.msg == 'object')
                    {
                        this.markDirty(response.msg);
                    }
                    
                    return true;
                }
            });
        },
        
        /**
         * Populating forms
         * 
         * @param {Object} data
         */
        populate: function(data)
        {
            this.setWindowTitle(data);
            this.getTabs().populate(data, this.getParams() || {});
        },
        
        /**
         * Returns dirty data from forms
         * 
         * @return {Object}
         */
        getFormsData: function()
        {
            return this.getTabs().retrieveFormData();
        },
        
        /**
         * Sets Title
         * 
         * @param {Object} data
         */
        setWindowTitle: function(data)
        {
            
        },
        
        /**
         * All forms valid?
         * 
         * @return {Boolean}
         */
        formsValid: function()
        {
            return this.getTabs().formsValid();
        },
        
        /**
         * First dirty tab
         * 
         * @return {Hatimeria.edit.form.BaseForm}
         */
        getFirstDirtyTab: function()
        {
            return this.getTabs().getComponent(this.getTabs().getDirtyForms()[0]);
        },
        
        /**
         * Mark Dirty
         * 
         * @param {Object} messages
         */
        markDirty: function(messages)
        {
            for (var name in messages)
            {
                // Only first item from object:
                this.getTabs().postValidate(name, messages[name]);
                
                break;
            }
        },
        
        /**
         * Action run when user attempt to save changes
         * 
         * @private
         * @return Boolena
         */
        beforeSave: function()
        {
            return this.getTabs().beforeSave(this);
        },
        
        /**
         * Event: fires when user attempts to close a window
         * 
         * @private
         * @return bool
         */
        onBeforeClose: function()
        {
            var _this = this;
            
            if (this.getTabs().hasModifiedForms())
            {
                // Some forms were modified, stop killing window, show confirm:
                
                Ext.Msg.confirm('Uwaga!', 'Wszystkie wprowadzone zmiany w formularzach zostaną utracone<br/>Czy zamknąć okno?', function(response) {
                    if (response == 'yes')
                    {
                        _this.fireEvent('beforekill', _this);
                        // All forms agrees to close?
                        if (_this.getTabs().beforeClose())
                        {
                            // Kill:
                            _this.fireEvent('kill')
                            _this.destroy();
                        }
                    }
                });
                
                return false;
            }
            else
            {
                // All forms agrees to close?
                return this.getTabs().beforeClose();
            }
        },
        
        /**
         * Switch to custom tab
         * 
         * @param {Integer} number
         */
        switchTab: function(number)
        {
            this.getTabs().setActiveTab(number);
        }
        
    });
    
})();