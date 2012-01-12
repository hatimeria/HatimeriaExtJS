/**
 * @class Hatimeria.treeselect.store.TreeSelectStore
 * @extends Ext.data.TreeStore
 * 
 * Store for TreeSelect (store must simulate Ext.data.Store)
 */
(function() {
    
    Ext.define('Hatimeria.treeselect.store.TreeSelectStore', {
        extend: 'Ext.data.TreeStore',
        
        paramsAsHash: true,
        
        /**
         * Loads all nodes
         * 
         * @param {Object} nodes
         */
        loadNodes: function(nodes)
        {
            this.getRootNode().appendChild(nodes);
            this.fireEvent('load', this);
        },
        
        /**
         * Count of nodes (always one)
         * 
         * @return {Number}
         */
        getCount: function()
        { 
            return 1; 
        },
        
        /**
         * Search node
         * 
         * @param {String} field
         * @param {String} value
         */
        findExact: function(field, value)
        {
            var find = function(nodes, field, value)
            {
                for (var i in nodes)
                {
                    if (nodes[i].get(field) == value)
                    {
                        return nodes[i];
                    }
                    else
                    {
                        var record = find(nodes[i].childNodes, field, value);
                        if (record != false)
                        {
                            return record;
                        }
                    }
                }
                
                return false;
            };
            
            var record = find(this.getRootNode().childNodes, field, value);
            
            return record;
        },
        
        /**
         * Get node from a pases position
         * 
         * @return {Ext.data.Model} records
         */
        getAt: function(record)
        {
            return record;
        }
    });
    
})();