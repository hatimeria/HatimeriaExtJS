Ext.require('Ext.data.reader.Json', function() {
    
    Ext.data.reader.Json.override('createAccessor', function() {
        var re = /[\[\.]/;

        return function(expr) {
            if (Ext.isEmpty(expr)) {
                return Ext.emptyFn;
            }
            if (Ext.isFunction(expr)) {
                return expr;
            }
            
            if (this.useSimpleAccessors !== true) {
                var sExpr = String(expr);
                var i = sExpr.search(re);
                if (i >= 0) {
                    var properties = sExpr.split(".");
                    var property = '';
                    var path = 'obj.';
                    var functionBody = '';
                    
                    while(properties.length) {
                        property = properties.shift();
                        path += property;
                        
                        if(properties.length == 0) {
                            functionBody += ' return ' + path + ';';
                        } else {
                            functionBody += "if(" + path + " !== null) "
                        }
                        path += '.';
                    }
                    
                    functionBody += ' return null';
                    
                    return Ext.functionFactory('obj', functionBody);
                }
            }
            
            return function(obj) {
                return obj[expr];
            };
        };
    }());
    
});

