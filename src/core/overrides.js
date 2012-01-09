Ext.require('Ext.data.reader.Json', function() {
    
    /**
     * Override JsonReader to deeply look at object property, according to "mapping"
     */
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

    /**
     * Add groups from store allGroups property, fixes applying new group to record after grid is rendered
     */
    Ext.require('Ext.data.Store', function() {
        Ext.data.Store.override('getGroups', function(requestGroupString) {
            var records = this.data.items,
                length = records.length,
                groups = [],
                pointers = {},
                record,
                groupStr,
                group,
                i;
                
                if(this.allGroups) {
                    Ext.each(this.allGroups, function(name) {
                        var group = {name: name, children: []};
                        groups.push(group);
                        pointers[name] = group;
                    });
                }
                
            for (i = 0; i < length; i++) {
                record = records[i];
                groupStr = this.getGroupString(record);
                group = pointers[groupStr];

                if (group === undefined) {
                    group = {
                        name: groupStr,
                        children: []
                    };

                    groups.push(group);
                    pointers[groupStr] = group;
                }

                group.children.push(record);
            }

            return requestGroupString ? pointers[requestGroupString] : groups;
        });
    });
});

