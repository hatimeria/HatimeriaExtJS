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

Ext.require('Ext.form.action.DirectLoad', function() {
        // Data may be also returned in 'record':
        Ext.form.action.DirectLoad.override({
            onSuccess: function(response){
                var result = this.processResponse(response),
                    form = this.form;
                    
                // HACK:
                if (!result.data && result.record)   
                {
                    result.data = result.record;
                }
                    
                if (result === true || !result.success || !result.data) {
                    this.failureType = Ext.form.action.Action.LOAD_FAILURE;
                    form.afterAction(this, false);
                    return;
                }
                form.clearInvalid();
                form.setValues(result.data || result.record);
                form.afterAction(this, true);
            }
        });  
});

Ext.require("Ext.Element", function() {
    Ext.Element.prototype.showChildrenWithBorders = function() {
        Ext.each(this.query('*'), function(e) {
            var el = new Ext.Element(e);
            var border = el.getBorderWidth('l');
            if(border > 0) {
                console.log(el.id, border);
                console.log(e);
            }
        });
    };
}) 