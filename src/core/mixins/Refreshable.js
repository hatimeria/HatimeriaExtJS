/** 
 * Refreshable
 * 
 * runs component refreshing process in given interval
 * 
 * @class Hatimeria.core.mixins.Refreshable
 * @extend Ext.Base
 */
(function() {
    
    Ext.define('Hatimeria.core.mixins.Refreshable', {
        extend: 'Ext.Base',
        
        refresherId: null,
        refreshInterval: null,
        refreshMinutesInterval: 1,
        automateRefreshFn: null,
        
        restartRefresher: function() {
            // stop previous updater process
            if(this.refresherId) {
                clearInterval(this.refresherId);
            }
            
            this.startRefresher();
        },
        
        startRefresher: function() {
            
            this.refreshInterval = this.refreshMinutesInterval*60*1000;
            var store = this.store;
            if(this.automateRefreshFn == null && store != null) {
                this.automateRefreshFn = function() {
                    store.load();
                }
            }
            
            this.refresherId = setInterval(Ext.bind(this.automateRefreshFn, this), this.refreshInterval);
        }
    });
})();