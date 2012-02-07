/**
 * Current user instance
 * 
 * @class Hatimeria.core.user.User
 */
(function() {
    
    Ext.define('Hatimeria.core.user.User', {
        alternateClassName: ['User','_user'],
        singleton: true,
        /**
         * Is user signed in
         *
         * @property signedIn
         */
        signedIn: false,
        /**
         * Is admin
         * 
         * @property isAdmin
         */
        isAdmin: false,
        /**
         * If user is switched to another one account
         *
         * @property isSwitched
         */
        isSwitched: false,
        /**
         * User role from database
         * 
         * @property {Array} roles
         */
        roles: [],
        /**
         * User data
         * 
         * @property {Array} data
         */
        data: {
            username: null
        },
        
        /**
         * Populate user properties
         * 
         * @params {Array} data
         */
        populate: function(data) {
            this.roles = data.roles;
            this.data.username = data.username;
            this.isAdmin = this.hasRole("ROLE_ADMIN");
            this.signedIn = this.hasRole("ROLE_USER");
            this.isSwitched = data.is_switched;
        },
        
        /**
         * If user has role
         * 
         * @param {String} role Role Name
         * 
         * @return {Boolean}
         */
        hasRole: function(role) {
            return Ext.Array.contains(this.roles, role);
        }
    });
    
})();