/** 
 * Sorting combobox
 */

(function() {
    
    Ext.define('Hatimeria.dvgrid.form.SortComboBox', {
        extend: 'Ext.form.ComboBox',
        mixins: {
            translationable: 'Hatimeria.core.mixins.Translationable'
        },
        transNS: 'dualviewgrid',
        
        /**
         * Initializes component
         */
        initComponent: function()
        {
            if (!this.initialConfig.applyColumns)
            {
                throw new Error('Need to specified a "applyColumns"');
            }
            
            var cfg = {
                store: this.prepareStore(this.initialConfig.applyColumns),
                fieldLabel: this.__('sort'),
                displayField: 'label',
                valueField: 'field',
                queryModel: 'local'
            };
            
            Ext.apply(this, Ext.apply(cfg, this.initialConfig))
            this.callParent();
        },
        
        /**
         * Prepares store according to specified Model 
         * 
         * @param {} columns
         * @return []
         */
        prepareStore: function(columns)
        {
            var data = []
            for (var columnName in columns)
            {
                if (typeof columns[columnName].sortable != 'undefined' && columns[columnName].sortable == false)
                {
                    // if column is defined as sortable:false, then omit.
                    continue;
                }
                
                data.push({field: columnName, label: this.__(columnName)});
            }
            
            return Ext.create('Ext.data.Store', {
                fields: ['field', 'label'],
                data: data
            });
        }
        
    });
    
})();
