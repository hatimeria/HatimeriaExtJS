/*
 * Handle common http error codes: 404, 403
 * 
 * @todo 
 * - 500 fatal without output
 */ 

if (typeof window.console != 'object')
{
    window.console = {
        log: Ext.emptyFn,
        error: Ext.emptyFn,
        info: Ext.emptyFn,
        debug: Ext.emptyFn
    };
}

Ext.require('Ext.direct.Manager', function() {
    
    /**
     * Creates new window if does not exists yet.
     */
    var createWindow = function(mode, message)
    {
        // Only one window may appear:
        if (Ext.WindowManager.get('error-window'))
        {
            return false;
        }

        if (mode == 'dev')
        {
            return Ext.create('Ext.window.Window', {
                id: 'error-window',
                title: __('HatimeriaExtJSBundle:direct.title'),
                html: message,
                width: 1000,
                height: 600,
                autoScroll: true,
                bodyStyle: 'background: white; padding: 15px'
            });
        }
        else
        {
            return Ext.create('Ext.window.Window', {
                id: 'error-window',
                extend: "Ext.Window",
                title: __('HatimeriaExtJSBundle:direct.title'),
                html: message || ('<p style="text-align:center; font-size: 14px; line-height: 20px;">' + __('HatimeriaExtJSBundle:direct.try_later') + '</p>'),
                width: 350,
                height: 200,
                autoScroll: true,
                bodyStyle: 'background: white; padding: 15px'
            });
        }
    }
    
    Ext.direct.Manager.on('event', function(response) {
        
        // accesible if ext exception is thrown
        var xhr = response.xhr;
        
        if (xhr) {
            var errorWindow = createWindow(App.Direct.environment, (App.Direct.environment == 'prod' ? null : xhr.responseText));
            
            // status 0: when somebody cancells loading page (by escape or click some links)
            if (errorWindow && xhr.status !== 0)
            {
                errorWindow.show();
            }
        }

        // normal response content;
        var result = response.result;

        if (!result) return;

        // only errors are handled
        if (typeof result.success != 'undefined'  && result.success && !result.exception) return;

        switch(result.code)
        {
            case 404:
                // @todo change to something better
                createWindow('prod').show();
                break;
            case 403:
                if (App.Direct.signinUrl) {
                    window.location = App.Direct.signinUrl;
                } else {
                    createWindow('prod', __('HatimeriaExtJSBundle:direct.forbidden')).show();
                }
                break;
        }
    });

    Ext.ns("App.Direct");
});