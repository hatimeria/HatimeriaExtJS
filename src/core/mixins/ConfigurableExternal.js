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
                    Ext.merge(this, config);
                }
            }
            
            return false;
        },
        
        /**
         * Reference to connected object
         * 
         * @return {Object}/{Boolean}
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