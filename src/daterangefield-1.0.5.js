/**
 * Provides a date range input field with a {@link Genapp.DateRangePicker} dropdown and automatic date validation.
 *  
 * @class Genapp.form.DateRangeField
 * @extends Ext.form.DateField
 * @constructor Create a new DateRangeField
 * @param {Object} config
 * @xtype daterangefield
 */

Ext.namespace('Genapp.form');

Genapp.form.DateRangeField = Ext.define("Ext.ux.DateRange", {
    extend: 'Ext.form.field.Date',
    /**
     * @cfg {String} minText
     * The error text to display when the date in the cell is before <tt>{@link #minValue}</tt> (defaults to
     * <tt>'The date in this field must be after {minValue}'</tt>).
     */
    minText: "The dates in this field must be equal to or after {0}",
    /**
     * @cfg {String} maxText
     * The error text to display when the date in the cell is after <tt>{@link #maxValue}</tt> (defaults to
     * <tt>'The date in this field must be before {maxValue}'</tt>).
     */
    maxText: "The dates in this field must be equal to or before {0}",
    /**
     * @cfg {String} reverseText
     * The error text to display when the dates are reversed (defaults to
     * <tt>'The end date must be posterior to the start date'</tt>).
     */
    reverseText: "The end date must be posterior to the start date",
    /**
     * @cfg {String} notEqualText
     * The error text to display when the dates are equal (defaults to
     * <tt>'The end date can't be equal to the start date'</tt>).
     */
    notEqualText: "The end date can't be equal to the start date",
    /**
     * @cfg {String} dateSeparator
     * The separator text to display between the dates (defaults to <tt>' - '</tt>)
     */
    dateSeparator: ' - ',
    /**
     * @cfg {String} endDatePrefix
     * The prefix for the end date (defaults to <tt>'<= '</tt>)
     */
    endDatePrefix: '<= ',
    /**
     * @cfg {String} startDatePrefix
     * The prefix for the start date (defaults to <tt>'>= '</tt>)
     */
    startDatePrefix: '>= ',
    /**
     * @cfg {Boolean} usePrefix if true, endDatePrefix and startDatePrefix are used (defaults to true).
     * Otherwise minValue and maxValue are used.
     */
    usePrefix: true,
    /**
     * @cfg {Boolean} hideValidationButton if true, hide the menu validation button (defaults to false).
     */
    hideValidationButton : false,
    /**
     * @cfg {Boolean} authorizeEqualValues if true, a unique value 
     * can be entered for the min and the max values.
     * If false, the min and max values can't be equal (defaults to true).
     */
    authorizeEqualValues : true,
    /**
     * @cfg {Boolean} mergeEqualValues if true and if the max and min values
     * are equal, an unique value will be displayed instead of the min and max values.
     * (authorizeEqualValues must be set to true)
     * If false, the min and max values are displayed normally even if they are equals (defaults to true).
     */
    mergeEqualValues : true,
    /**
     * @cfg {Boolean} autoReverse if true, reverse the min and max values if max < min (defaults to true).
     */
    autoReverse : true,
    /**
     * @cfg {Date/String} minValue
     * The minimum allowed date. Can be either a Javascript date object or a string date in a
     * valid format (defaults to 'new Date(0)').
     */
    minValue : new Date(0),
    /**
     * @cfg {Date/String} maxValue
     * The maximum allowed date. Can be either a Javascript date object or a string date in a
     * valid format (defaults to 'new Date(2999,11,31)').
     */
    maxValue : new Date(2999,11,31),
    /**
     * @cfg {Date/String} minDefaultValue
     * The minimum default date. Can be either a Javascript date object or a string date in a
     * valid format (defaults to 'new Date()').
     */
    minDefaultValue : new Date(),
    /**
     * @cfg {Date/String} maxDefaultValue
     * The maximum default date. Can be either a Javascript date object or a string date in a
     * valid format (defaults to 'new Date()').
     */
    maxDefaultValue : new Date(),

    /**
     * Replaces any existing disabled dates with new values and refreshes the DateRangePicker.
     * @param {Array} disabledDates An array of date strings (see the <tt>{@link #disabledDates}</tt> config
     * for details on supported values) used to disable a pattern of dates.
     */
    setDisabledDates : function(dd){
        this.disabledDates = dd;
        this.initDisabledDays();
        if(this.menu){
            this.menu.rangePicker.startDatePicker.setDisabledDates(this.disabledDatesRE);
            this.menu.rangePicker.endDatePicker.setDisabledDates(this.disabledDatesRE);
        }
    },

    /**
     * Replaces any existing disabled days (by index, 0-6) with new values and refreshes the DateRangePicker.
     * @param {Array} disabledDays An array of disabled day indexes. See the <tt>{@link #disabledDays}</tt>
     * config for details on supported values.
     */
    setDisabledDays : function(dd){
        this.disabledDays = dd;
        if(this.menu){
            this.menu.rangePicker.startDatePicker.setDisabledDays(dd);
            this.menu.rangePicker.endDatePicker.setDisabledDays(dd);
        }
    },

    /**
     * Replaces any existing <tt>{@link #minValue}</tt> with the new value and refreshes the DateRangePicker.
     * @param {Date} value The minimum date that can be selected
     */
    setMinValue : function(dt){
        this.minValue = (typeof dt == "string" ? this.parseDate(dt) : dt);
        if(this.menu){
            this.menu.rangePicker.startDatePicker.setMinDate(this.minValue);
            this.menu.rangePicker.endDatePicker.setMinDate(this.minValue);
        }
    },

    /**
     * Replaces any existing <tt>{@link #maxValue}</tt> with the new value and refreshes the DateRangePicker.
     * @param {Date} value The maximum date that can be selected
     */
    setMaxValue : function(dt){
        this.maxValue = (typeof dt == "string" ? this.parseDate(dt) : dt);
        if(this.menu){
            this.menu.rangePicker.startDatePicker.setMaxDate(this.maxValue);
            this.menu.rangePicker.endDatePicker.setMaxDate(this.maxValue);
        }
    },

    /**
     * Runs all of NumberFields validations and returns an array of any errors. Note that this first
     * runs TextField's validations, so the returned array is an amalgamation of all field errors.
     * The additional validation checks are testing that the date format is valid, that the chosen
     * date is within the min and max date constraints set, that the date chosen is not in the disabledDates
     * regex and that the day chosed is not one of the disabledDays.
     * @param {Mixed} value The value to get errors for (defaults to the current field value)
     * @return {Array} All validation errors for this field
     */
    getErrors: function(value) {
        var errors = Ext.form.DateField.superclass.getErrors.apply(this, arguments);
        
        value = this.formatDate(value || this.processValue(this.getRawValue()));
        
        if (value.length < 1){ // if it's blank and textfield didn't flag it then it's valid
             return errors;
        }
        var values = value.split(this.dateSeparator);
        if (values.length != 1 && values.length != 2){
            errors.push(String.format(this.invalidText, value, this.format+this.dateSeparator+this.format));
            return errors;
        }
        var rangeDate = this.parseRangeDate(value);
        if(values.length == 1){
            if (!rangeDate){
                errors.push(String.format(this.invalidText, value, this.format));
                return errors;
            }
            var scErrors = Ext.form.DateField.superclass.getErrors.call(this, value);
            if (!Ext.isEmpty(scErrors)){
                errors.push(String.format(this.invalidText, value, this.format));
                return errors;
            }
        }else if(values.length == 2){
            if (!rangeDate){
                errors.push(String.format(this.invalidText, value, this.format+this.dateSeparator+this.format));
                return errors;
            }
            var scErrors = Ext.form.DateField.superclass.getErrors.call(this, value);
            if (!Ext.isEmpty(scErrors)){
                errors.push(String.format(this.invalidText, value, this.format+this.dateSeparator+this.format));
                return errors;
            }
            if (rangeDate.endDate.getTime() - rangeDate.startDate.getTime() < 0){
                errors.push(this.reverseText);
                return errors;
            }
            if (!this.authorizeEqualValues && rangeDate.endDate.getElapsed(rangeDate.startDate) == 0){
                errors.push(this.notEqualText);
                return errors;
            }
        }
        //Checks if the start date is in the interval [minDate,maxDate]
        if (rangeDate.startDate != null){
            if (rangeDate.startDate.getTime() - this.minValue.getTime() < 0){
                errors.push(String.format(this.minText, this.formatDate(this.minValue)));
                return errors;
            }
            if (this.maxValue.getTime() - rangeDate.startDate.getTime() < 0){
                errors.push(String.format(this.maxText, this.formatDate(this.maxValue)));
                return errors;
            }
        }
        //Checks if the end date is in the interval [minDate,maxDate]
        if (rangeDate.endDate != null){
            if (rangeDate.endDate.getTime() - this.minValue.getTime() < 0){
                errors.push(String.format(this.minText, this.formatDate(this.minValue)));
                return errors;
            }
            if (this.maxValue.getTime() - rangeDate.endDate.getTime() < 0){
                errors.push(String.format(this.maxText, this.formatDate(this.maxValue)));
                return errors;
            }
        }
        return errors;
    },

    // private
    // return a range date object or null for failed parse operations
    parseRangeDate : function(value){
        if(!value){
            return null;
        }
        if(this.isRangeDate(value)){
            return value;
        }
        if(Ext.isDate(value)){
            return {startDate:value, endDate:value};
        }
        var values = value.split(this.dateSeparator);
        if(values.length == 1){
            var sdpIndex = value.indexOf(this.startDatePrefix,0);
            var edpIndex = value.indexOf(this.endDatePrefix,0);
            if(sdpIndex != -1){
            // Case ">= YYYY/MM/DD"
                var startDate = this.parseDate.call(this, value.substring(sdpIndex + this.startDatePrefix.length));
                if(startDate){
                    return {startDate:startDate, endDate:null};
                }else{
                    return null;
                }
            }else if(edpIndex != -1){
            // Case "<= YYYY/MM/DD"
                var endDate = this.parseDate.call(this, value.substring(edpIndex + this.endDatePrefix.length));
                if(endDate){
                    return {startDate:null, endDate:endDate};
                }else{
                    return null;
                }
            }else{
            // Case "YYYY/MM/DD"
                var date = this.parseDate.call(this, value);
                if(date){
                    return {startDate:date, endDate:date};
                }else{
                    return null;
                }
            }
        }else if(values.length == 2){
            // Case "YYYY/MM/DD - YYYY/MM/DD"
            var sv = Date.parseDate(values[0], this.format);
            var ev = Date.parseDate(values[1], this.format);
            if((!sv || !ev) && this.altFormats){
                if(!this.altFormatsArray){
                    this.altFormatsArray = this.altFormats.split("|");
                }
                var i,len;
                if(!sv){
                    for(i = 0, len = this.altFormatsArray.length; i < len && !sv; i++){
                        sv = Date.parseDate(values[0], this.altFormatsArray[i]);
                    }
                }
                if(!ev){
                    for(i = 0, len = this.altFormatsArray.length; i < len && !ev; i++){
                        ev = Date.parseDate(values[1], this.altFormatsArray[i]);
                    }
                }
            }
            if(!sv || !ev){
                return null;
            }else{
                return {startDate:sv, endDate:ev};
            }
        }else{
            return null;
        }
    },

    // private
    formatDate : function(date){
        if(Ext.isDate(date)){
            return Genapp.form.DateRangeField.superclass.formatDate.call(this, date);
        }
        if(this.isRangeDate(date)){
            if(date.startDate == null && date.endDate != null){
                if(this.usePrefix){
                    return this.endDatePrefix + date.endDate.format(this.format);
                }else{
                    return this.minValue.format(this.format) + this.dateSeparator + date.endDate.format(this.format);
                }
            }else if(date.startDate != null && date.endDate == null){
                if(this.usePrefix){
                    return this.startDatePrefix + date.startDate.format(this.format);
                }else{
                    return date.startDate.format(this.format) + this.dateSeparator + this.maxValue.format(this.format);
                }
            }else if(date.startDate != null && date.endDate != null){
                if(this.mergeEqualValues && date.endDate.getElapsed(date.startDate) == 0){
                    return date.startDate.format(this.format);
                }else if(this.autoReverse && date.endDate.getTime() - date.startDate.getTime() < 0){
                    return date.endDate.format(this.format) + this.dateSeparator + date.startDate.format(this.format);
                }else{
                    return date.startDate.format(this.format) + this.dateSeparator + date.endDate.format(this.format);
                }
            }else{
                return '';
            }
        }else{
            return date;
        }
    },

    /**
     * The function that handle the trigger's click event.
     * Implements the default empty TriggerField.onTriggerClick function to display the DateRangePicker
     * @method onTriggerClick
     * @hide
     */
    onTriggerClick : function(){
        if(this.disabled){
            return;
        }
        if(!this.menu){
            /**
             * The field menu (displayed on a trigger click).
             * @property menu
             * @type Genapp.menu.DateRangeMenu
             */
            this.menu = new Genapp.menu.DateRangeMenu({
                hideOnClick: false,
                hideValidationButton: this.hideValidationButton,
                showToday: this.showToday
            });
        }
        this.onFocus();
        if(typeof this.minDefaultValue === 'string'){
            this.minDefaultValue = new Date(this.minDefaultValue);
        }
        if(typeof this.maxDefaultValue === 'string'){
            this.maxDefaultValue = new Date(this.maxDefaultValue);
        }
        Ext.apply(this.menu.rangePicker.startDatePicker,  {
            minDate : this.minValue,
            maxDate : this.maxValue,
            defaultValue : this.minDefaultValue,
            disabledDatesRE : this.disabledDatesRE,
            disabledDatesText : this.disabledDatesText,
            disabledDays : this.disabledDays,
            disabledDaysText : this.disabledDaysText,
            format : this.format,
            showToday : this.showToday,
            minText : String.format(this.minText, this.formatDate(this.minValue)),
            maxText : String.format(this.maxText, this.formatDate(this.maxValue))
        });
        Ext.apply(this.menu.rangePicker.endDatePicker,  {
            minDate : this.minValue,
            maxDate : this.maxValue,
            defaultValue : this.maxDefaultValue,
            disabledDatesRE : this.disabledDatesRE,
            disabledDatesText : this.disabledDatesText,
            disabledDays : this.disabledDays,
            disabledDaysText : this.disabledDaysText,
            format : this.format,
            showToday : this.showToday,
            minText : String.format(this.minText, this.formatDate(this.minValue)),
            maxText : String.format(this.maxText, this.formatDate(this.maxValue))
        });

        var values = this.getValue();
        var minv = this.minDefaultValue;
        var maxv = this.maxDefaultValue;
        if(Ext.isDate(values)){
            minv = values;
            maxv = values;
        }else if(this.isRangeDate(values)){
            if(values.startDate != null){
                minv = values.startDate;
            }
            if(values.endDate != null){
                maxv = values.endDate;
            }
        }

        this.menu.rangePicker.startDatePicker.setValue(minv);
        this.menu.rangePicker.endDatePicker.setValue(maxv);

        this.menu.show(this.el, "tl-bl?");
        this.menuEvents('on');
    },

    /**
     * Checks if the object is a correct range date
     * @param {Object} rangeDate The rangeDate to check. <br/>
     * An object containing the following properties:<br/>
     *      <ul><li><b>startDate</b> : Date <br/>the start date</li>
     *      <li><b>endDate</b> : Date <br/>the end date</li></ul>
     * @return {Boolean} true if the object is a range date
     */
    isRangeDate : function(rangeDate){
        return (Ext.isObject(rangeDate) && (Ext.isDate(rangeDate.startDate) || rangeDate.startDate == null) && (Ext.isDate(rangeDate.endDate) || rangeDate.endDate == null));
    },
    
    /**
     * Returns the current date value of the date field.
     * @return {Date} The date value
     */
    getValue : function(){
        return this.parseRangeDate(Ext.form.DateField.superclass.getValue.call(this)) || "";
    },
    
    /**
     * Sets the value of the date field.  You can pass a date object or any string that can be
     * parsed into a valid date, using <tt>{@link #format}</tt> as the date format, according
     * to the same rules as {@link Date#parseDate} (the default format used is <tt>"m/d/Y"</tt>).
     * <br />Usage:
     * <pre><code>
//All of these calls set the same date value (May 4, 2006)

//Pass a date object:
var dt = new Date('5/4/2006');
dateField.setValue(dt);

//Pass a date string (default format):
dateField.setValue('05/04/2006');

//Pass a date string (custom format):
dateField.format = 'Y-m-d';
dateField.setValue('2006-05-04');
</code></pre>
     * @param {String/Date} date The date or valid date string
     * @return {Ext.form.Field} this
     */
    setValue : function(date){
        return Ext.form.DateField.superclass.setValue.call(this, this.formatDate(this.parseRangeDate(date)));
    },
    
    // private
    beforeBlur : function(){
        var v = this.parseRangeDate(this.getRawValue());
        if(v){
            this.setValue(v);
        }
    }
});
/**
 * 
 * A menu containing a {@link Genapp.DateRangePicker} Component.
 * 
 * @class Genapp.menu.DateRangeMenu
 * @extends Ext.menu.DateMenu
 * @constructor Create a new DateRangeMenu
 * @param {Object} config
 * @xtype daterangemenu
 */

Ext.namespace('Genapp.menu');

Genapp.menu.DateRangeMenu = Ext.define("Ext.ux.DateRangeMenu", {
    extend: 'Ext.menu.DatePicker',
    /**
     * @cfg {String/Object} layout
     * Specify the layout manager class for this container either as an Object or as a String.
     * See {@link Ext.Container#layout layout manager} also.
     * Default to 'table'.
     * Note: The layout 'menu' doesn't work on FF3.5,
     * the rangePicker items are not rendered 
     * because the rangePicker is hidden... 
     * But it's working on IE ???
     */
    layout:'table', 
    /**
     * @cfg {String} cls
     * An optional extra CSS class that will be added to this component's Element (defaults to 'x-date-range-menu').
     * This can be useful for adding customized styles to the component or any of its children using standard CSS rules.
     */
    cls: 'x-date-range-menu',

    // private
    initComponent: function(){
        this.on('beforeshow', this.onBeforeShow, this);
        /**
         * The {@link Genapp.DateRangePicker} instance for this DateRangeMenu
         * @property rangePicker
         * @type Genapp.DateRangePicker
         */
        Ext.apply(this, {
            plain: true,
            showSeparator: false,
            items: [this.rangePicker = new Genapp.DateRangePicker(this.initialConfig)]
        });
        this.rangePicker.purgeListeners();
        Ext.menu.DateMenu.superclass.initComponent.call(this);
        this.relayEvents(this.rangePicker, ["select"]);
    },

    // private
    onBeforeShow: function(){
        if (this.rangePicker){
            this.rangePicker.startDatePicker.hideMonthPicker(true);
            this.rangePicker.endDatePicker.hideMonthPicker(true);
        }
    },

    /**
     * Displays this menu at a specific xy position
     * @param {Array} xyPosition Contains X & Y [x, y] values for the position at which to show the menu (coordinates are page-based)
     * @param {Ext.menu.Menu} parentMenu (optional) This menu's parent menu, if applicable (defaults to undefined)
     */
    showAt : function(xy, parentMenu, /* private: */_e){
        this.parentMenu = parentMenu;
        if(!this.el){
            this.render();
        }
        if(_e !== false){
            this.fireEvent("beforeshow", this);
            xy = this.el.adjustForConstraints(xy);
        }
        this.el.setXY(xy);
        if(this.enableScrolling){
            this.constrainScroll(xy[1]);     
        }
        this.el.show();
        Ext.menu.Menu.superclass.onShow.call(this);
        this.hidden = false;
        this.focus();
        this.fireEvent("show", this);
    }
});
/**
 * Simple date range picker class.
 * 
 * @class Genapp.DateRangePicker
 * @extends Ext.Panel
 * @constructor Create a new DateRangePicker
 * @param {Object} config The config object
 * @xtype daterangepicker
 */

Ext.namespace('Genapp');

Genapp.DateRangePicker = Ext.define("Genapp.DateRangePicker", {
    extend: 'Ext.panel.Panel',
    /**
     * @cfg {String/Object} layout
     * Specify the layout manager class for this container either as an Object or as a String.
     * See {@link Ext.Container#layout layout manager} also.
     * Default to 'column'.
     */
    layout: 'column',
    /**
     * @cfg {String} cls
     * An optional extra CSS class that will be added to this component's Element (defaults to 'x-menu-date-range-item').
     * This can be useful for adding customized styles to the component or any of its children using standard CSS rules.
     */
    cls: 'x-menu-date-range-item',
    /**
     * @cfg {String} buttonAlign
     * The alignment of any {@link #buttons} added to this panel.  Valid values are 'right',
     * 'left' and 'center' (defaults to 'center').
     */
    buttonAlign: 'center',
    /**
     * @cfg {Boolean} hideValidationButton if true hide the menu validation button (defaults to false).
     */
    hideValidationButton : false,
    /**
     * @cfg {String} tbarStartDateButtonText
     * The tbar start date button text (defaults to <tt>'Start Date ...'</tt>)
     */
    tbarStartDateButtonText:'Start Date ...',
    /**
     * @cfg {String} tbarRangeDateButtonText
     * The tbar range date button text (defaults to <tt>'Range Date'</tt>)
     */
    tbarRangeDateButtonText:'Range Date',
    /**
     * @cfg {String} tbarEndDateButtonText
     * The tbar end date button text (defaults to <tt>'... End Date'</tt>)
     */
    tbarEndDateButtonText:'... End Date',
    /**
     * @cfg {String} fbarOkButtonText
     * The fbar ok button text (defaults to <tt>'ok'</tt>)
     */
    fbarOkButtonText:'ok',
    /**
     * The selected dates (Default to '{startDate:null, endDate:null}'). Read-only.
     * @type Object
     * @property selectedDate
     */
    selectedDate: {startDate:null, endDate:null},

    // private
    initComponent : function(){
        this.items = [
            /**
             * The start date picker (The left picker).
             * @property startDatePicker
             * @type Ext.DatePicker
             */
            this.startDatePicker = new Ext.DatePicker(Ext.apply({
                internalRender: this.strict || !Ext.isIE,
                ctCls: 'x-menu-date-item',
                columnWidth: .5
                }, this.initialConfig)
            ),{
                xtype:'spacer',
                width:5,
                html:'&nbsp;' // For FF and IE8
            },
            /**
             * The end date picker (The right picker).
             * @property endDatePicker
             * @type Ext.DatePicker
             */
            this.endDatePicker = new Ext.DatePicker(Ext.apply({
                internalRender: this.strict || !Ext.isIE,
                ctCls: 'x-menu-date-item',
                columnWidth: .5
                }, this.initialConfig)
            )
        ];

        this.startDatePicker.on('select',this.startDateSelect, this);
        this.endDatePicker.on('select',this.endDateSelect, this);

        /**
         * The top toolbar.
         * @property tbar
         * @type Ext.Toolbar
         */
        this.tbar= new Ext.Toolbar({
             items: [
             this.startDateButton = new Ext.Button({
                 text: this.tbarStartDateButtonText,
                 cls: 'x-menu-date-range-item-start-date-button',
                 enableToggle: true,
                 allowDepress: false,
                 toggleGroup: 'DateButtonsGroup',
                 toggleHandler: this.onStartDatePress.createDelegate(this)
             }),
             this.rangeDateButton = new Ext.Button({
                 text: this.tbarRangeDateButtonText,
                 cls: 'x-menu-date-range-item-range-date-button',
                 pressed:true,
                 enableToggle: true,
                 allowDepress: false,
                 toggleGroup: 'DateButtonsGroup',
                 toggleHandler: this.onRangeDatePress.createDelegate(this)
             }),'->',
             this.endDateButton = new Ext.Button({
                 text: this.tbarEndDateButtonText,
                 cls: 'x-menu-date-range-item-end-date-button',
                 enableToggle: true,
                 allowDepress: false,
                 toggleGroup: 'DateButtonsGroup',
                 toggleHandler: this.onEndDatePress.createDelegate(this)
             })]
         });

        if(!this.hideValidationButton){
            this.fbar = new Ext.Toolbar({
                cls: 'x-date-bottom',
                items: [{
                    xtype:'button',
                    text:this.fbarOkButtonText,
                    width:'auto',
                    handler:this.onOkButtonPress.createDelegate(this)
                }]
            });
        }

        Genapp.DateRangePicker.superclass.initComponent.call(this);
    },

    // private
    onRangeDatePress: function (button, state){
        if(state){
            this.startDatePicker.enable();
            this.endDatePicker.enable();
            this.resetDates();
        }
    },

    // private
    onStartDatePress: function (button, state){
        if(state){
            this.startDatePicker.enable();
            this.endDatePicker.disable();
            this.resetDates();
        }
    },

    // private
    onEndDatePress: function (button, state){
        if(state){
            this.startDatePicker.disable();
            this.endDatePicker.enable();
            this.resetDates();
        }
    },

    // private
    startDateSelect: function (startDatePicker, date){
        this.selectedDate.startDate = date;
        if(this.startDateButton.pressed){
            this.returnSelectedDate();
        }else{ // rangeDateButton is pressed
            if(this.selectedDate.endDate !== null){
                this.returnSelectedDate();
            }
        }
    },

    // private
    endDateSelect: function (endDatePicker, date){
        this.selectedDate.endDate = date;
        if(this.endDateButton.pressed){
            this.returnSelectedDate();
        }else{ // rangeDateButton is pressed
            if(this.selectedDate.startDate !== null){
                this.returnSelectedDate();
            }
        }
    },

    // private
    resetselectedDate: function(){
        this.selectedDate = {
            startDate:null,
            endDate:null
        };
    },

    /**
     * Reset the dates
     */
    resetDates: function(){
        this.resetselectedDate();
        this.startDatePicker.setValue(this.startDatePicker.defaultValue);
        this.endDatePicker.setValue(this.endDatePicker.defaultValue);
    },

    // private
    returnSelectedDate: function(){
        this.fireEvent('select', this, this.selectedDate);
        this.resetselectedDate();
    },

    /**
     * Checks if the date is in the interval [minDate,maxDate] of the picker
     */
    isEnabledDate: function (picker){
        if((picker.activeDate.getTime() - picker.minDate.getTime() >= 0) 
                && (picker.maxDate.getTime() - picker.activeDate.getTime() >= 0)){
            return true;
        } else {
            return false;
        }
    },

    // private
    onOkButtonPress: function (button, state){
        if (state){
            if (this.startDateButton.pressed){
                if (this.isEnabledDate(this.startDatePicker)){
                    this.selectedDate = {
                        startDate:this.startDatePicker.activeDate,
                        endDate:null
                    };
                    this.returnSelectedDate();
                }
            } else if(this.endDateButton.pressed){
                if (this.isEnabledDate(this.endDatePicker)){
                    this.selectedDate = {
                        startDate:null,
                        endDate:this.endDatePicker.activeDate
                    };
                    this.returnSelectedDate();
                }
            } else {
                if (this.isEnabledDate(this.startDatePicker) && this.isEnabledDate(this.endDatePicker)){
                    this.selectedDate = {
                        startDate:this.startDatePicker.activeDate,
                        endDate:this.endDatePicker.activeDate
                    };
                    this.returnSelectedDate();
                }
            }
        }
    }
});