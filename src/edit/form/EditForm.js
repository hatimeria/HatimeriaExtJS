/** 
 * Form embeded in VTabsPanel, BaseTab
 * 
 * @class Hatimeria.edit.form.EditForm
 * @extends Ext.form.Panel
 */
(function() {
    
    Ext.define('Hatimeria.edit.form.EditForm', {
        extend: 'Ext.form.Panel',
        mixins: {
            translationable: 'Hatimeria.core.mixins.Translationable'
        },
        alias: 'widget.editform',
        config: {
            
            /**
             * PanelViewer
             * 
             * @cfg {Hatimeria.edit.panel.VTabsPanel} panelViewer
             */
            panelViewer: undefined,
            
            /**
             * Data
             * 
             * @cfg {Object} dataCollection
             */
            dataCollection: {}
        },
        
        /**
         * Optional params passed to EditWindow
         * 
         * @property {} params
         */
        params: {},
        
        /**
         * Array width local-form fields using in validation 
         * (changes as checked according to followed fields)
         * 
         * @property [] localFields
         */
        localFields: [],
        
        /**
         * Default data which is set by defaults
         * 
         * @private
         * @property {String} defaultDataSnapshoot
         */
        defaultDataSnapshoot: undefined,
        
        /**
         * Locked?
         * 
         * @cfg {Boolean} locked
         */
        locked: false,
        
        /**
         * Initialize component
         * 
         * @private
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
         * @param {Object} data
         * @param {Object} params
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
         * Gets values from form
         * 
         * @return {Object}
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
         * @return {Object}
         */
        getParams: function()
        {
            return this.params;
        },
        
        /**
         * Optional parameter
         * 
         * @param {String} key
         * @return {Object}/{Boolean}
         */
        getParam: function(key)
        {
            return (typeof this.params[key] != 'undefined') ? this.params[key] : false ;
        },
        
        /**
         * Validates form
         * Must return bool value
         * 
         * @return {Boolean}
         */
        isValid: function()
        {
            return this.getForm().isValid();
        },
        
        /**
         * Event: fires when user attempt to close a window
         * Must return bool value
         * 
         * 
         * @private
         * @return {Boolean}
         */
        onBeforeClose: function()
        {
            return true;
        },
        
        /**
         * Event: fires when user attempts to save form
         * Must return bool value
         * 
         * @private
         * @param {Hatimeria.edit.window.BaseWindow} window
         * @return {Boolean}
         */
        onBeforeSave: function(window)
        {
            return true;
        },
        
        /**
         * Creates snapshop of data 
         * (need set localFields array)
         * 
         * @retrun {String} (JSON)
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
         * @return {String} (JSON)
         */
        getDefaultDataSnapshoot: function()
        {
            return this.defaultDataSnapshoot;
        },
        
        /**
         * Gets flag modified 
         * Must return bool value or undefined
         * 
         * @return {Boolean}
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
         * @return {Boolean}
         */
        isLocked: function()
        {
            return this.locked;
        },
        
        /**
         * Lock form
         * Disabling causes avoiding gettins values from form
         * 
         * @return {Boolean}
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
         * @return {Boolean}
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