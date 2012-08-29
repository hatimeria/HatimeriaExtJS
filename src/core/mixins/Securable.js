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
            
            var roles = [];
            
            if(Ext.isArray(role)) {
                roles = role;
            } else {
                roles = [role];
            }
            
            if(!User.signedIn) {
                window.location = App.Direct.signinUrl;
            }
            
            var granted = false;
            
            Ext.each(roles, function(role) {
                if(User.hasRole(role)) {
                    granted = true;
                } 
            })
            
            if(!granted) {
                window.location = Routing.generate('hatimeria_error_403');
            }
        }
    });
})();