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
         * @param {Booolean} static context
         * @return {String}
         */
        __: function(key, placeholders)
        {
             var context = this;
            
            var _placeholders = placeholders || {};
            var translated = '';
            var domain = '';
            
            if (context.transDomain)
            {
                domain = context.transDomain;
            } else {
                domain = Ext.getClassName(context).split('.').shift();
                if(domain == 'Hatimeria') {
                    domain += 'ExtJS'
                }
                
                domain += 'Bundle';                
            }
            
            domain += ':';
            
            if (context.transNS)
            {
                var fullKey = domain + context.transNS + '.' + key;
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
