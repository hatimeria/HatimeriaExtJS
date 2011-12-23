/**
 * Test unit
 * 
 * @hide
 */
(function() {
    
    Ext.ns('TestUnit');
    
    var createNew = function(text) {
        Ext.getCmp('test-panel').add(Ext.create('Ext.panel.Panel', {
            html: text,
            border: 0,
            padding: 5,
            margin: 5,
            style: {
                'border-bottom': '1px solid #eee'
            }
        }));
    };
    
    TestUnit = {
        init: function()
        {
            Ext.create('Ext.panel.Panel', {
                id: 'test-panel',
                title: 'Testy',
                width: 800,
                layout: 'auto',
                scroll: true,
                renderTo: 'ext-app'
            });
        },
        
        group: function(name)
        {
            Ext.getCmp('test-panel').add(Ext.create('Ext.panel.Panel', {
                html: '<span style="font-weight: bold;">'+name+':</span>',
                border: 0,
                padding: 5,
                margin: 5,
                style: {
                    'border-bottom': '2px solid #eee'
                }
            }));
        },
        
        test: function(expression, value, description)
        {
            var 
                html = "",
                cls,
                result;
            
            if (expression === value)
            {
                result = '<span style="color: #00B235; font-weight: bold;">OK</span>';
                cls = "ok";
            }
            else
            {
                result = '<span style="color: #F00; font-weight: bold;">Failed</span>';
                cls = "failed";
            }
            
            html = Ext.String.format('<span style="font-weight: bold;">Testig:</span> <span>{0}:</span> <span class="result_{1}">{2}</span>', description, cls, result);
            
            createNew(html);
        },
        
        isType: function(object, type, description)
        {
            var 
                html = "",
                cls,
                result;
            
            if (typeof object === type)
            {
                result = '<span style="color: #00B235; font-weight: bold;">OK</span>';
                cls = "ok";
            }
            else
            {
                result = '<span style="color: #F00; font-weight: bold;">Failed</span>';
                cls = "failed";
            }
            
            html = Ext.String.format('<span style="font-weight: bold;">Testig Type:</span> <span>{0}</span> should be <em style="font-weight: bold;">{1}</e>, is: <em style="font-weight: bold;">{2}</em> <span class="result_{3}">{4}</span>', description, type, typeof object, cls, result);
            
            createNew(html);
        }
    }
   
})();