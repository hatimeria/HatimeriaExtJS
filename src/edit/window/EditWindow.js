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
             * @var string
             */
            params: {},
            
            /**
             * Data
             * 
             * @var Data
             */
            data: undefined
        },
        
        /**
         * Initializes component
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
                'save',
                'aftersave',
                'errorsave',
                'populate'
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
         * @return Ext.tab.Panel
         */
        getTabs: function()
        {
            return this.getComponent('window-edit-tabs');
        },
        
        /**
         * Event: saves data
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
         * @param {} data
         */
        populate: function(data)
        {
            this.setWindowTitle(data);
            this.getTabs().populate(data, this.getParams() || {});
        },
        
        /**
         * Returns dirty data from forms
         * 
         * @return {}
         */
        getFormsData: function()
        {
            return this.getTabs().retrieveFormData();
        },
        
        /**
         * Sets Title
         */
        setWindowTitle: function(data)
        {
            
        },
        
        /**
         * Forms valid?
         * 
         * @return valid
         */
        formsValid: function()
        {
            return this.getTabs().formsValid();
        },
        
        /**
         * First dirty tab
         */
        getFirstDirtyTab: function()
        {
            return this.getTabs().getComponent(this.getTabs().getDirtyForms()[0]);
        },
        
        /**
         * Mark Dirty
         * 
         * @param {} messages
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
         * Event: fires when user attempt to save changes
         * 
         * @return bool
         */
        beforeSave: function()
        {
            return this.getTabs().beforeSave(this);
        },
        
        /**
         * Event: fires when user attempts to close a window
         * 
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
                        // All forms agrees to close?
                        if (_this.getTabs().beforeClose())
                        {
                            // Kill:
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
         * @param int number
         */
        switchTab: function(number)
        {
            this.getTabs().setActiveTab(number);
        }
        
    });
    
})();