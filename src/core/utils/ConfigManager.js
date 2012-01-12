/**
 * Config Manager
 * 
 * @class Hatimeria.core.utils.ConfigManager
 * 
 * Manager registers extra config for other classes that implements: Hatimeria.core.mixins.ConfigurableExternal
 * 
 *     Before start application include:
 * @example
 *     Ext.require("Hatimeria.core.utils.ConfigManager");
 *     Ext.onReady(function() {
 * 
 *     var manager = Ext.ClassManager.get("Hatimeria.core.utils.ConfigManager");
 *       manager.register('TargetClass', {
 *          listeners: {
 *            afterrender: function() { console.log('IT WORKS'); }
 *          }
 *       });
 *     });
 */
(function() {
    
    Ext.define('Hatimeria.core.utils.ConfigManager', {
        singleton: true,
        
        /**
         * Map of classes
         * 
         * @private
         * @property {Object} map
         * [className => 'CustomClassName']
         */
        map: {},
        
        /**
         * Registers a new object
         * 
         * @param {String} className
         * @param {String} objectConfig
         */
        register: function(className, objectConfig)
        {
            this.map[className] = objectConfig;
        },
        
        /**
         * Gets object
         * 
         * @param {String} classNames
         * @return {Object}
         */
        get: function(className)
        {
            return this.map[className];
        },
        
        /**
         * Check if manager has class
         * 
         * @param {String} className
         */
        has: function(className)
        {
            return (typeof (this.map[className]) != 'undefined');
        },
        
        /**
         * Gets map of classes to custom classes
         * 
         * @return {Object}
         */
        getMap: function()
        {
            return this.map;
        }
        
    });
    
})();