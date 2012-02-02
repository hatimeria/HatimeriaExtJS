(function() {
    
    Ext.define("Hatimeria.core.window.IFrameWindow", {
        extend: "Hatimeria.core.window.BaseWindow",
        alias: 'widget.iframewindow',
        src: null,
        
        constructor: function(cfg) {
            
            
            Ext.applyIf(cfg, {
                layout: 'fit',                
                width: 1024,
                height: 600
            })
            
            cfg.items = [{
                    html: '<iframe style="border: 0" width=' + (cfg.width - 20) + ' height=' + (cfg.height - 10) + ' src="' + cfg.src + '"/>'
              }
            ];
            
            delete cfg.src;
            
            this.callParent([cfg]);
        }
    });
    
})();
