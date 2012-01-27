/**
 * Date Range Field
 * 
 * @class Hatimeria.core.field.DateRangeField
 * @extends Ext.form.field.Basic
 */
(function() {
    
    Ext.define('Hatimeria.core.field.DateRangeField', {
        extend: 'Ext.form.field.Picker',
        
        /**
         * @cfg {Object} value
         */
        value: {
            from: new Date,
            to: new Date
        },
        
        /**
         * Type of data which will be returned ("object"/"string"/"d/m/Y")
         *
         * @cfg {String} returnFormat
         */
        returnFormat: 'string',
        
        /**
         * Default width
         * 
         * @cfg {Number} width
         */
        width: 170,
        
        /**
         * @cfg {String} format corresponding to Ext.util.Format.date()
         */
        format: 'd/m/Y',
        
        /**
         * @private
         * @property {Array}
         */
        rangeBoilerplates: [
            {key: 'today',   value: 'Dzisiejsze'},
            {key: 'week',    value: 'Z ostatniego tygodnia'},
            {key: 'twoweek', value: 'Z ostatnich dwóch tygodni'},
            {key: 'month',   value: 'Z ostatniego miesiąca'},
            {key: 'year',    value: 'Z ostatniego roku'}
        ],
        
        pickerAlign: 'bl',
        
        /**
         * @private
         */
        matchFieldWidth: false,
        
        constructor: function(cfg)
        {
            var config = {
            };
            Ext.apply(config, cfg || {});
            this.callParent([config]);
        },
        
        /**
         * Converts string to value Object
         * 
         * @param {String} value
         * @private
         */
        dateRangeToObject: function(value)
        {
            var dates = value.split(/\s+\-\s+/);
            var date = {
                from: this.convertToDate(dates[0]),
                to: this.convertToDate(dates[1])
            }
            
            return date;
        },
        
        /**
         * String to object {Date}
         * 
         * @param {String}
         * @return {Date}
         */
        convertToDate: function(value)
        {
            if (typeof value == 'object')
            {
                if (value instanceof Date)
                {
                    return value;
                }
                else
                {
                    throw new Error('Object must be instance of Date');
                }
            }
            else
            {
                return Ext.Date.parse(value, this.format);
            }
        },
        
        /**
         * Guess!
         * 
         * @param {Object}
         */
        setValue: function(value)
        {
            var defaultValue = {
                from: new Date, 
                to: new Date
            };
            
            if (!Ext.isObject(value))
            {
                value = this.defaultValue;
            }
            
            value = Ext.apply(defaultValue, value);
            value.from = this.convertToDate(value.from);
            value.to = this.convertToDate(value.to);
            this.lastValue = value;
            
            return this.callParent([value]);
        },
        
        /**
         * @param {String} value Must be {from: {Date}, to: {Date}}
         * @return {String}
         */
        valueToRaw: function(value)
        {
            var strFrom = Ext.Date.format(value.from, this.format);
            var strTo = Ext.Date.format(value.to, this.format);
            
            return strFrom + ' - ' + strTo;
        },
        
        /**
         * Conversion from text to object
         * 
         * @param {String}
         * @return {Object}
         */
        rawToValue: function(value)
        {
            return this.dateRangeToObject(value);
        },
        
        /**
         * Check if dates are equal
         * 
         * @return {Boolean}
         */
        isEqualRangeDate: function(newVal, oldVal)
        {
            return Ext.JSON.encode(newVal) == Ext.JSON.encode(oldVal);
        },
        
        /**
         * Check if value changed
         * 
         * @param {Boolean} force optional to force event
         */
        checkChange: function(force)
        {
            if (!this.suspendCheckChange)
            {
                var me = this,
                    newVal = me.getValue(),
                    oldVal = me.lastValue;
                    
                if (!this.isDateRangeValid(newVal))
                {
                    me.onChange(newVal, oldVal);
                    return false;
                }
                    
                if ((!me.isEqualRangeDate(newVal, oldVal) || force) && !me.isDestroyed)
                {
                    me.lastValue = newVal;
                    var newValFormatted = me.getUnifiedReturnValue(newVal);
                    var oldValFormatted = me.getUnifiedReturnValue(oldVal);
                    me.fireEvent('change', me, newValFormatted, oldValFormatted);
                    me.onChange(newVal, oldVal);
                }
            }
        },
        
        /**
         * Creates instance of picker
         */
        createPicker: function()
        {
            var _this = this;
            var picker = Ext.create('Ext.container.Container', {
                floating: true,
                border: 0,
                width: 405,
                height: 260,
                hidden: true,
                padding: 5,
                ownerCt: this.ownerCt,
                pickerField: this,
                layout: 'auto',
                items: [
                    {
                        itemId: 'boilerplates-combobox',
                        xtype: 'combobox',
                        margin: '10 0 0 10',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['key', 'value'],
                            data: this.rangeBoilerplates
                        }),
                        editable: false,
                        fieldLabel: 'Wybierz przedział',
                        valueField: 'key',
                        displayField: 'value'
                    },
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        itemId: 'pickers-panel',
                        border: 0,
                        defaults: {margin: 5},
                        items: [
                            Ext.create('Ext.picker.Date', {
                                itemId: 'picker-from',
                                format: this.format,
                                handler: function(picker, date) {
                                    _this.onDateSelect('from', date);
                                }
                            }),
                            Ext.create('Ext.picker.Date', {
                                itemId: 'picker-to',
                                format: this.format,
                                handler: function(picker, date) {
                                    _this.onDateSelect('to', date)
                                }
                            })
                        ]
                    }
                ]
            });
            
            this.picker = picker;
            
            return this.picker;
        },
        
        /**
         * Apply date values to pickers
         * 
         * @param {Object} value {from:Date, to:Date}
         */
        applyToPicker: function(value)
        {
            if (this.picker)
            {
                this.picker.down('#picker-from').setValue(value.from);
                this.picker.down('#picker-to').setValue(value.to);
            }
        },
        
        /**
         * Event: react on expanding picker
         */
        onExpand: function()
        {
            this.applyToPicker(this.value);
        },
        
        /**
         * Apply new date
         * 
         * @param {String} type
         * @param {Date} date
         */
        onDateSelect: function(type, date)
        {
            this.value[type] = date;
            this.setValue(this.value);
            this.checkChange(true);
        },
        
        /**
         * Validator for raw date range
         * 
         * @return {Boolean}
         */
        isRawDateRangeValid: function(value)
        {
            value = this.dateRangeToObject(value);
            
            return (value.from && value.to);
        },
        
        /**
         * Check if date range object is valid
         * 
         * @param {Object} value
         * @return {Boolean}
         */
        isDateRangeValid: function(value)
        {
            return value.from && value.to && typeof value.from.getDate == 'function' && typeof value.to.getDate == 'function' ;
        },
        
        /**
         * Validate raw value
         * 
         * @return {Boolean}/{String}
         */
        validator: function(value)
        {
            if (!this.isRawDateRangeValid(value))
            {
                return "Daty są w nieprawidłowym formacie!";
            }
            
            return true;
        },
        
        /**
         * Convert declared output format
         * 
         * @param {Object} value Must be {from:Date, to:Date}
         * @return {Object}
         */
        getUnifiedReturnValue: function(value)
        {
            if (this.returnFormat == 'object')
            {
                return value;
            }
            
            var format = (this.returnFormat == 'string') ? this.format : this.returnFormat;
            
            return {
                from: Ext.Date.format(value.from, format),
                  to: Ext.Date.format(value.to, format)
            };
        },
        
        /**
         * Submit output
         * 
         * @return {Object}
         */
        getSubmitValue: function()
        {
            return this.getUnifiedReturnValue(this.value);
        }
        
    });
    
})();
