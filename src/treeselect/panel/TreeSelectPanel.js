/**
 * @class Hatimeria.treeselect.tree.TreeSelectPanel
 * @extends Ext.tree.Panel
 */
(function() {
    
    Ext.require('Hatimeria.core.response.DirectHandler');
    
    Ext.define('Hatimeria.treeselect.tree.TreeSelectPanel', {
        extend: 'Ext.tree.Panel',
        
        startWidth: undefined,
        
        /**
         * Initializes panel
         * @private
         */
        initComponent: function()
        {
            var config = {
                floating: true,
                title: false,
                width: 200,
                height: 150
            };
            
            Ext.apply(this, Ext.apply(config, this.initialConfig || {}));
            this.callParent();
        },
        
        /**
         * Selects current node
         * 
         * @private
         * @param {Ext.data.Model} node
         */
        getNode: function(node)
        {
            
        }
    });
    
})();
