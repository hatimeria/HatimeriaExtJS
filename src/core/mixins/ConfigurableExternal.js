/**
 * Behavior enables ability of using external configs
 * 
 * @class Hatimeria.core.mixins.ConfigurableExternal
 */
(function() {
    
    Ext.define('Hatimeria.core.mixins.ConfigurableExternal', {
        requires: [
            'Hatimeria.core.utils.ConfigManager'
        ],
        
        externalConfig: undefined,
        
        /**
         * Singleton: Mixins manager
         * 
         * @return {Hatimeria.core.utils.ConfigManager}
         */
        getConfigManager: function()
        {
            return Ext.ClassManager.get('Hatimeria.core.utils.ConfigManager');
        },
        
        /**
         * Merge in external config (if exists)
         * 
         * @param {Object} cfg
         * @return {Object}/{Boolean}
         */
        mergeExternal: function(cfg)
        {
            var config = this.getConnectedConfig();
            
            if (config !== false)
            {
                if (typeof cfg != 'undefined')
                {
                    return Ext.merge(cfg, config);
                }
                else
                {
                    return Ext.merge(this, config);
                }
            }
            
            return false;
        },
        
        /**
         * Reference to connected object
         * 
         * @return {Object}/{Boolean}
         */
        getConnectedConfig: function(cls)
        {
            if(typeof cls == 'undefined') {
                cls = this.$className;
            }
            
            if (typeof this.externalConfig == 'undefined')
            {
                if (this.getConfigManager().has(cls))
                {
                    this.externalConfig = this.getConfigManager().get(cls);
                }
                else
                {
                    this.externalConfig = false;
                }
            }
            
            return this.externalConfig;
        }
    });
    
})();