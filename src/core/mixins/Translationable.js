/** 
 * Tranlation
 * Component should be mixex to each other components
 * 
 * @class Hatimeria.core.mixins.Translationable
 * @extend Ext.Base
 */
(function() {
    
    Ext.define('Hatimeria.core.mixins.Translationable', {
        extend: 'Ext.Base',
        /**
         * @cfg {String} domain name
         * 
         */
        transDomain: null,
        /**
         * @cfg {String} key namespace/prefix
         * 
         */        
        transNS: null,
        
        /**
         * Translate by key
         * 
         * @param {String} key
         * @param {Object} placeholders
         * @return {String}
         */
        __: function(key, placeholders)
        {
            var _placeholders = placeholders || {};
            var translated = '';
            var domain = '';
            
            if (typeof this.transDomain != 'undefined')
            {
                domain = this.transDomain + ':';
            }
            
            if (this.transNS)
            {
                var fullKey = domain + this.transNS + '.' + key;
                translated = __(fullKey, _placeholders);
                
                // if key not exists: return raw key (without domain and transNS)
                if (translated == fullKey) {
                    translated = __(key, _placeholders);
                } else {
                    return translated;
                }
                
                if (translated == key) {
                    return fullKey;
                } else {
                    return translated;
                }
            }
            
            return __(domain + key, _placeholders);
        }
    });
    
})();
