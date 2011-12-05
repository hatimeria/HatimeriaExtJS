/**
 * Config Manager
 * 
 * @description Manager registers extra config for other classes that implements: Hatimeria.core.mixins.ConfigurableExternal
 * @usage:
 *   Before start application include:
 *   Ext.require("Hatimeria.core.utils.ConfigManager");
 *   Ext.onReady(function() {
 *   
 *     var manager = Ext.ClassManager.get("Hatimeria.core.utils.ConfigManager");
 *     manager.register('TargetClass', {
 *       listeners: {
 *         afterrender: function() { console.log('IT WORKS'); }
 *       }
 *     });
 *   });
 */
(function() {
    
    Ext.define('Hatimeria.core.utils.ConfigManager', {
        singleton: true,
        
        /**
         * Map of classes
         * 
         * [className => 'CustomClassName']
         */
        map: {},
        
        /**
         * Registers a new object
         * 
         * @param string className
         * @param string objectConfig
         */
        register: function(className, objectConfig)
        {
            this.map[className] = objectConfig;
        },
        
        /**
         * Gets object
         * 
         * @param string classNames
         * @return {}
         */
        get: function(className)
        {
            return this.map[className];
        },
        
        /**
         * Check if manager has class
         * 
         * @param string className
         */
        has: function(className)
        {
            return (typeof (this.map[className]) != 'undefined');
        },
        
        /**
         * Gets map of classes to custom classes
         * 
         * @return {}
         */
        getMap: function()
        {
            return this.map;
        }
        
    });
    
})();