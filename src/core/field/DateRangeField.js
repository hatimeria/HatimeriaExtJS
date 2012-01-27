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
         * 
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
        
        /**
         * @private
         * @property {Object}
         */
        storedValue: {},
        
        constructor: function(cfg)
        {
            var config = {
            };
            Ext.apply(config, cfg || {});
            this.callParent([config]);
        },
        
        /**
         * Initialize of component
         */
        initComponent: function()
        {
            this.addEvents(
                /**
                 * @event datechange
                 */
                'datechange'
            );
            
            this.callParent();
        },
        
        /**
         * @param {Object}
         * @private
         */
        dateStringToObject: function(value)
        {
            return value;
        },
        
        /**
         * Guess!
         * 
         * @param {Object}
         */
        setValue: function(value)
        {
            var defValue = {from: new Date, to: new Date};
            if (!Ext.isObject(value))
            {
                value = defValue;
            }
            
            value = Ext.apply(defValue, value);
            Ext.copyTo(this.value, this.storedValue);

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
                        layout: 'hbox',
                        border: 0,
                        defaults: {margin: 5},
                        items: [
                            Ext.create('Ext.picker.Date', {
                                format: this.format,
                                minDate: this.from,
                                handler: function(picker, date) {
                                    _this.onDateSelect('from', date);
                                }
                            }),
                            Ext.create('Ext.picker.Date', {
                                format: this.format,
                                minDate: this.to,
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
         * 
         */
        onDateSelect: function(type, date)
        {
            this.storedValue[type] = date;
            this.setValue(this.storedValue);
        }
        
    });
    

})();
