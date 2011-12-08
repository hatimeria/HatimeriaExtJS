/**
 * Tabs for embedding forms
 * 
 * @class Hatimeria.edit.tab.BaseTab
 * @extends Ext.tab.Panel
 */
(function() {
    
    Ext.define('Hatimeria.edit.tab.BaseTab', {
        extend: 'Ext.tab.Panel',
        itemId: 'window-edit-tabs',
        config: {
            
            /**
             * Data
             * 
             * @var {}
             */
            dataCollection: {}
        },
        
        /**
         * Dirty forms
         * 
         * @var []
         */
        dirtyForms: [],
        
        /**
         * Check whether component alias is panel form
         * 
         * @param string alias
         * @return bool
         */
        isTabForm: function(alias)
        {
            return (alias == 'widget.baseform');
        },
        
        /**
         * Process all tabs
         * 
         * @param function callback
         */
        processTabs: function(callback)
        {
            var _this = this;
            var i = 0 ;
            this.cascade(function(item) { 
                if (_this.isTabForm(item.alias))
                {
                    callback.call(_this, item, i++);
                }
            });
        },
        
        /**
         * Populate 
         * 
         * @param {} data 
         * @param {} params
         */
        populate: function(data, params)
        {
            this.setDataCollection(data);
            
            this.items.each(function(item) {
                item.populate(data, params);
            });
        },
        
        /**
         * Retrieves dirty data from forms
         * 
         * @return {}
         */
        retrieveFormData: function()
        {
            var data = Ext.clone(this.getDataCollection());
            
            this.processTabs(function(item) { 
                Ext.apply(data, item.retrieveData());
            });
            
            return data;
        },
        
        /**
         * Validates all forms
         * 
         * @return bool
         */
        formsValid: function()
        {
            var _this = this;
            this.dirtyForms = [];
            
            this.processTabs(function(item) { 
                if (!item.isValid())
                {
                    _this.dirtyForms.push(item.id);
                }
            });
            
            return (this.dirtyForms.length == 0);
        },
        
        /**
         * Dirty forms
         * 
         * @return []
         */
        getDirtyForms: function()
        {
            return this.dirtyForms;
        },
        
        /**
         * Post validate (after XHR)
         * 
         * @param string fieldName
         * @param string message
         */
        postValidate: function(fieldName, message)
        {
            var fields = [];
            var field;
            
            this.processTabs(function(item) { 
                field = item.getForm().findField(fieldName);
                if (field)
                {
                    fields.push({
                        'field': field,
                        'form': item
                    });
                }
            });
            
            if (fields.length)
            {
                var firstItem = fields[0];
                this.setActiveTab(firstItem.form);
                firstItem.field.markInvalid(message);
            }
            else
            {
                Ext.Msg.alert('Uwaga!', message);
            }
        },
        
        /**
         * Action executed when user attempt close a window
         * 
         * @return bool
         */
        beforeClose: function()
        {
            var fails = 0;
            
            this.processTabs(function(item) {
                if (!item.onBeforeClose())
                {
                    fails++;
                }
            });
            
            return (fails === 0);
        },
        
        /**
         * Action executed before save data
         * 
         * @param Hatimeria.edit.window.EditWindow window
         * @return bool
         */
        beforeSave: function(window)
        {
            var fails = 0;
            
            this.processTabs(function(item) {
                if (!item.onBeforeSave(window))
                {
                    fails++;
                }
            });
            
            return (fails === 0);
        },
        
        /**
         * Check if any of forms were modified
         * 
         * @retrun bool
         */
        hasModifiedForms: function()
        {
            var count = 0;
            
            this.processTabs(function(item) {
                var modified = item.isFormModified();
                if (typeof modified != 'undefined')
                {
                    if (modified)
                    {
                        count++;
                    }
                }
            });
        
            return (count > 0);
        }
    });
    
})();