/**
 * Combobox with tree panel (as boundlist)
 *
 * @class Hatimeria.treeselect.field.TreeSelectField
 * @extends Hatimeria.core.field.DeferComboBox
 */
(function() {
    
    Ext.define('Hatimeria.core.field.CategoryComboBox', {
        extend: 'Hatimeria.core.field.DeferComboBox',
        requires: [
            'Hatimeria.treeselect.tree.TreeSelectPanel',
            'Hatimeria.treeselect.store.TreeSelectStore',
            'Hatimeria.core.response.DirectHandler'
        ],
        alias: 'widget.ux-category',
        config: {
            directFn: Ext.emptyFn
        },
        
        /**
         * Constructor
         * 
         * @private
         */
        constructor: function(config)
        {
            this.initConfig(config);
            this.callParent([config]);
            
            return this;
        },
        
        /**
         * Initialize component
         * 
         * @private
         */
        initComponent: function()
        {
            var _this = this;
            var config = {
                valueField: 'id',
                queryMode: 'local',
                displayField: 'text',
                store: Ext.create('Hatimeria.treeselect.store.TreeSelectStore', {
                    root: {
                        id: 'root',
                        expanded: true,
                        text: 'Wszystkie',
                        children: []
                    }
                })
            };
            
            Ext.apply(this, Ext.apply(config, this.initialConfig || {}));
            this.callParent();
            
            this.on('afterrender', function() {
                Ext.create('Hatimeria.core.response.DirectHandler', {
                   fn: this.getDirectFn(),
                   scope: this,
                   success: function(result) {
                       var nodes = result.record;
                       var expand = function(nodes)
                       {
                           for (var i in nodes)
                           {
                               nodes[i].expanded = true;
                               if (!nodes[i].children || nodes[i].children.length == 0)
                               {
                                   nodes[i].leaf = true;
                               }
                               expand(nodes[i].children)
                           }
                       }
                       expand(nodes);
                       
                       _this.store.loadNodes(nodes);
                   }
                });
            });
        },
        
        /**
         * Creates a picker
         * 
         * @private
         * @return {Ext.Component}
         */
        createPicker: function()
        {
            var picker = Ext.create('Hatimeria.treeselect.tree.TreeSelectPanel', {
                ownerCt: this.ownerCt,
                store: this.store
            });
            
            this.mon(picker, {
                itemclick: this.onItemClick,
                scope: this
            });
            
            this.mon(picker.getSelectionModel(), {
                selectionChange: this.onListSelectionChange,
                scope: this
            });
            
            this.picker = picker;
            
            return picker;
        }
            
    });
    
})();