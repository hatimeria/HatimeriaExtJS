/** 
 * Tranlation
 * Component should be mixex to each other components
 * 
 * @class Hatimeria.core.mixins.Securable
 * @extend Ext.Base
 */
(function() {
    
    Ext.define('Hatimeria.core.mixins.Securable', {
        extend: 'Ext.Base',
        
        /**
         * Check if user has this permission
         *
         * @param role Role name
         */
        secure: function(role) {
            if(User.signedIn) {
                if(!User.hasRole(role)) {
                    window.location = Routing.generate('hatimeria_error_403');
                }
                
            } else {
                window.location = App.Direct.signinUrl;
            }
            
        }
    });
})();