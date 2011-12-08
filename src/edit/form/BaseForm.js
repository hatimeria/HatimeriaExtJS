/** 
 * Form embeded in VTabsPanel, BaseTab
 * 
 * @class Hatimeria.edit.form.BaseForm
 * @extends Ext.form.Panel
 */
(function() {
    
    Ext.define('Hatimeria.edit.form.BaseForm', {
        extend: 'Ext.form.Panel',
        mixins: {
            translationable: 'Hatimeria.core.mixins.Translationable'
        },
        alias: 'widget.baseform',
        config: {
            
            /**
             * PanelViewer
             * 
             * @var Hatimeria.edit.panel.VTabsPanel
             */
            panelViewer: undefined,
            
            /**
             * Data
             * 
             * @var {}
             */
            dataCollection: {}
        },
        
        /**
         * Optional params passed to EditWindow
         * 
         * @var {}
         */
        params: {},
        
        /**
         * Array width local-form fields
         * 
         * @var []
         */
        localFields: [],
        
        /**
         * Default data which is set by defaults
         * 
         * @var {}
         */
        defaultDataSnapshoot: undefined,
        
        /**
         * Locked?
         * 
         * @var bool
         */
        locked: false,
        
        /**
         * Initialize component
         */
        initComponent: function()
        {
            this.callParent();
            
            this.addEvents('populate');
            this.on('afterrender', function() {
                if (this.locked)
                {
                    this.lock();
                }
            });
        },
        
        /**
         * Sets Data
         * 
         * @param {} data
         */
        populate: function(data, params)
        {
            this.params = params || {};
            this.fireEvent('populate', data);
            this.setDataCollection(Ext.clone(data));
            this.getForm().setValues(data);
            this.defaultDataSnapshoot = this.createDataSnapshoot();
        },
        
        /**
         * Gets form values
         */
        retrieveData: function()
        {
            return this.getForm().getValues();
        },
        
        /**
         * Resets fields in form
         */
        resetData: function()
        {
            this.getForm().reset();
        },
        
        /**
         * Optional parameters
         * 
         * @return {}
         */
        getParams: function()
        {
            return this.params;
        },
        
        /**
         * Optional parameter
         * 
         * @return mixed
         */
        getParam: function(key)
        {
            return (typeof this.params[key] != 'undefined') ? this.params[key] : false ;
        },
        
        /**
         * Validates form
         * 
         * @important must return bool value
         * 
         * @return bool
         */
        isValid: function()
        {
            return this.getForm().isValid();
        },
        
        /**
         * Event: fires when user attempt to close a window
         * 
         * @important must return bool value
         * 
         * @return bool
         */
        onBeforeClose: function()
        {
            return true;
        },
        
        /**
         * Event: fires when user attempts to save form
         * 
         * @important must return bool value
         * 
         * @return bool
         */
        onBeforeSave: function(window)
        {
            return true;
        },
        
        /**
         * Creates snapshop of data 
         * (need localFields array)
         * 
         * @retrun string (JSON)
         */
        createDataSnapshoot: function()
        {
            if (typeof this.localFields == 'object' && this.localFields.length > 0)
            {
                var snapshoot = {};
                var field;
                var data = this.retrieveData();
                
                for (var i in this.localFields)
                {
                    field = this.localFields[i];
                    snapshoot[field]= data[field];
                }
                
                return JSON.stringify(snapshoot);
            }
            
            return false;
        },
    
        /**
         * Default data snapshoot
         * 
         * @return string (JSON)
         */
        getDefaultDataSnapshoot: function()
        {
            return this.defaultDataSnapshoot;
        },
        
        /**
         * Gets flag modified 
         * 
         * @important must return bool value or undefined
         * @return bool
         */
        isFormModified: function()
        {
            if (typeof this.localFields == 'object' && this.localFields.length > 0)
            {
                return (this.getDefaultDataSnapshoot() != this.createDataSnapshoot(this.retrieveData()));
            }
            
            return undefined;
        },
        
        /**
         * Is UI locked?
         * 
         * @return bool
         */
        isLocked: function()
        {
            return this.locked;
        },
        
        /**
         * Lock form
         * 
         * @important (disabling causes avoiding gettins values from form)
         * @return bool
         */
        lock: function()
        {
            if (this.rendered)
            {
                this.getEl().mask();
            }
            
            this.locked = true;
        },
        
        /**
         * Unlocks UI
         * 
         * @return bool
         */
        unlock: function()
        {
            if (this.rendered)
            {
                this.getEl().unmask();
            }
            
            this.locked = false;
        }
        
    });
    
})();