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
});

Ext.require("Ext.form.action.DirectSubmit", function() {
    
    Ext.form.action.DirectSubmit.override({
        doSubmit: function() {
            var me = this,
                callback = Ext.Function.bind(me.onSuccess, me),
                formEl = me.buildForm(),
                isFormHandler = me.form.api.submit.prototype.constructor.directCfg.method.formHandler;

                if(isFormHandler) {
                    me.form.api.submit(formEl, callback, me);
                } else {
                    var values = me.form.getValues();
                    values = Ext.apply(values, me.params);
                    me.form.api.submit(values, callback);
                }
            Ext.removeNode(formEl);
        }
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