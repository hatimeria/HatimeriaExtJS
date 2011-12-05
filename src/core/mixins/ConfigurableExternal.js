/**
 * Callable
 */
(function() {
    
    Ext.require('Hatimeria.core.utils.ConfigManager');
    
    Ext.define('Hatimeria.core.mixins.ConfigurableExternal', {
        
        externalConfig: undefined,
        
        /**
         * Singleton: Mixins manager
         */
        getConfigManager: function()
        {
            return Ext.ClassManager.get('Hatimeria.core.utils.ConfigManager');
        },
        
        /**
         * Merge in external config (if exists)
         * 
         * @param OPTONAL {} cfg
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
                    Ext.merge(this, config);
                }
            }
            
            return false;
        },
        
        /**
         * Reference to connected object
         */
        getConnectedConfig: function()
        {
            if (typeof this.externalConfig == 'undefined')
            {
                if (this.getConfigManager().has(this.$className))
                {
                    this.externalConfig = this.getConfigManager().get(this.$className);
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