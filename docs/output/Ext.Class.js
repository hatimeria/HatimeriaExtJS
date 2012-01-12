Ext.data.JsonP.Ext_Class({"extends":null,"inheritable":false,"statics":{"css_var":[],"cfg":[],"method":[{"meta":{"static":true},"tagname":"method","owner":"Ext.Class","name":"getDefaultPreprocessors","id":"static-method-getDefaultPreprocessors"},{"meta":{"static":true},"tagname":"method","owner":"Ext.Class","name":"getPreprocessor","id":"static-method-getPreprocessor"},{"meta":{"static":true},"tagname":"method","owner":"Ext.Class","name":"registerPreprocessor","id":"static-method-registerPreprocessor"},{"meta":{"static":true},"tagname":"method","owner":"Ext.Class","name":"setDefaultPreprocessorPosition","id":"static-method-setDefaultPreprocessorPosition"},{"meta":{"static":true},"tagname":"method","owner":"Ext.Class","name":"setDefaultPreprocessors","id":"static-method-setDefaultPreprocessors"}],"css_mixin":[],"event":[],"property":[]},"alternateClassNames":[],"singleton":false,"code_type":"nop","superclasses":[],"members":{"css_var":[],"method":[{"meta":{},"tagname":"method","owner":"Ext.Class","name":"constructor","id":"method-constructor"}],"cfg":[{"meta":{},"tagname":"cfg","owner":"Ext.Class","name":"alias","id":"cfg-alias"},{"meta":{},"tagname":"cfg","owner":"Ext.Class","name":"alternateClassName","id":"cfg-alternateClassName"},{"meta":{},"tagname":"cfg","owner":"Ext.Class","name":"config","id":"cfg-config"},{"meta":{},"tagname":"cfg","owner":"Ext.Class","name":"extend","id":"cfg-extend"},{"meta":{},"tagname":"cfg","owner":"Ext.Class","name":"inheritableStatics","id":"cfg-inheritableStatics"},{"meta":{},"tagname":"cfg","owner":"Ext.Class","name":"mixins","id":"cfg-mixins"},{"meta":{},"tagname":"cfg","owner":"Ext.Class","name":"override","id":"cfg-override"},{"meta":{},"tagname":"cfg","owner":"Ext.Class","name":"requires","id":"cfg-requires"},{"meta":{},"tagname":"cfg","owner":"Ext.Class","name":"singleton","id":"cfg-singleton"},{"meta":{},"tagname":"cfg","owner":"Ext.Class","name":"statics","id":"cfg-statics"},{"meta":{},"tagname":"cfg","owner":"Ext.Class","name":"uses","id":"cfg-uses"}],"css_mixin":[],"event":[],"property":[]},"component":false,"mixins":[],"subclasses":[],"html_meta":{"docauthor":null,"author":null},"requires":[],"mixedInto":[],"tagname":"class","meta":{"docauthor":["Jacky Nguyen <jacky@sencha.com>"],"author":["Jacky Nguyen <jacky@sencha.com>"]},"private":false,"files":[{"filename":"Class.js","href":"Class2.html#Ext-Class"}],"allMixins":[],"name":"Ext.Class","aliases":{},"inheritdoc":null,"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/Class2.html#Ext-Class' target='_blank'>Class.js</a></div></pre><div class='doc-contents'><p>Handles class creation throughout the framework. This is a low level factory that is used by <a href=\"#!/api/Ext.ClassManager\" rel=\"Ext.ClassManager\" class=\"docClass\">Ext.ClassManager</a> and generally\nshould not be used directly. If you choose to use <a href=\"#!/api/Ext.Class\" rel=\"Ext.Class\" class=\"docClass\">Ext.Class</a> you will lose out on the namespace, aliasing and depency loading\nfeatures made available by <a href=\"#!/api/Ext.ClassManager\" rel=\"Ext.ClassManager\" class=\"docClass\">Ext.ClassManager</a>. The only time you would use <a href=\"#!/api/Ext.Class\" rel=\"Ext.Class\" class=\"docClass\">Ext.Class</a> directly is to create an anonymous class.</p>\n\n<p>If you wish to create a class you should use <a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a> which aliases\n<a href=\"#!/api/Ext.ClassManager-method-create\" rel=\"Ext.ClassManager-method-create\" class=\"docClass\">Ext.ClassManager.create</a> to enable namespacing and dynamic dependency resolution.</p>\n\n<p><a href=\"#!/api/Ext.Class\" rel=\"Ext.Class\" class=\"docClass\">Ext.Class</a> is the factory and <strong>not</strong> the superclass of everything. For the base class that <strong>all</strong> Ext classes inherit\nfrom, see <a href=\"#!/api/Ext.Base\" rel=\"Ext.Base\" class=\"docClass\">Ext.Base</a>.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-alias' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Class'>Ext.Class</span><br/><a href='source/ClassManager2.html#Ext-Class-cfg-alias' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Class-cfg-alias' class='name expandable'>alias</a><span> : String[]</span></div><div class='description'><div class='short'>List of short aliases for class names. ...</div><div class='long'><p>List of short aliases for class names.  Most useful for defining xtypes for widgets:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('MyApp.CoolPanel', {\n    extend: '<a href=\"#!/api/Ext.panel.Panel\" rel=\"Ext.panel.Panel\" class=\"docClass\">Ext.panel.Panel</a>',\n    alias: ['widget.coolpanel'],\n    title: 'Yeah!'\n});\n\n// Using <a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>\n<a href=\"#!/api/Ext-method-widget\" rel=\"Ext-method-widget\" class=\"docClass\">Ext.widget</a>('widget.coolpanel');\n// Using the shorthand for widgets and in xtypes\n<a href=\"#!/api/Ext-method-widget\" rel=\"Ext-method-widget\" class=\"docClass\">Ext.widget</a>('panel', {\n    items: [\n        {xtype: 'coolpanel', html: 'Foo'},\n        {xtype: 'coolpanel', html: 'Bar'}\n    ]\n});\n</code></pre>\n</div></div></div><div id='cfg-alternateClassName' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Class'>Ext.Class</span><br/><a href='source/ClassManager2.html#Ext-Class-cfg-alternateClassName' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Class-cfg-alternateClassName' class='name expandable'>alternateClassName</a><span> : String/String[]</span></div><div class='description'><div class='short'>Defines alternate names for this class. ...</div><div class='long'><p>Defines alternate names for this class.  For example:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('Developer', {\n    alternateClassName: ['Coder', 'Hacker'],\n    code: function(msg) {\n        alert('Typing... ' + msg);\n    }\n});\n\nvar joe = <a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('Developer');\njoe.code('stackoverflow');\n\nvar rms = <a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('Hacker');\nrms.code('hack hack');\n</code></pre>\n</div></div></div><div id='cfg-config' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Class'>Ext.Class</span><br/><a href='source/Class2.html#Ext-Class-cfg-config' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Class-cfg-config' class='name expandable'>config</a><span> : Object</span></div><div class='description'><div class='short'>List of configuration options with their default values, for which automatically\naccessor methods are generated. ...</div><div class='long'><p>List of configuration options with their default values, for which automatically\naccessor methods are generated.  For example:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('SmartPhone', {\n     config: {\n         hasTouchScreen: false,\n         operatingSystem: 'Other',\n         price: 500\n     },\n     constructor: function(cfg) {\n         this.initConfig(cfg);\n     }\n});\n\nvar iPhone = new SmartPhone({\n     hasTouchScreen: true,\n     operatingSystem: 'iOS'\n});\n\niPhone.getPrice(); // 500;\niPhone.getOperatingSystem(); // 'iOS'\niPhone.getHasTouchScreen(); // true;\niPhone.hasTouchScreen(); // true\n</code></pre>\n</div></div></div><div id='cfg-extend' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Class'>Ext.Class</span><br/><a href='source/Class2.html#Ext-Class-cfg-extend' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Class-cfg-extend' class='name expandable'>extend</a><span> : String</span></div><div class='description'><div class='short'>The parent class that this class extends. ...</div><div class='long'><p>The parent class that this class extends. For example:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('Person', {\n    say: function(text) { alert(text); }\n});\n\n<a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('Developer', {\n    extend: 'Person',\n    say: function(text) { this.callParent([\"print \"+text]); }\n});\n</code></pre>\n</div></div></div><div id='cfg-inheritableStatics' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Class'>Ext.Class</span><br/><a href='source/Class2.html#Ext-Class-cfg-inheritableStatics' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Class-cfg-inheritableStatics' class='name expandable'>inheritableStatics</a><span> : Object</span></div><div class='description'><div class='short'>List of inheritable static methods for this class. ...</div><div class='long'><p>List of inheritable static methods for this class.\nOtherwise just like <a href=\"#!/api/Ext.Class-cfg-statics\" rel=\"Ext.Class-cfg-statics\" class=\"docClass\">statics</a> but subclasses inherit these methods.</p>\n</div></div></div><div id='cfg-mixins' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Class'>Ext.Class</span><br/><a href='source/Class2.html#Ext-Class-cfg-mixins' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Class-cfg-mixins' class='name expandable'>mixins</a><span> : Object</span></div><div class='description'><div class='short'>List of classes to mix into this class. ...</div><div class='long'><p>List of classes to mix into this class. For example:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('CanSing', {\n     sing: function() {\n         alert(\"I'm on the highway to hell...\")\n     }\n});\n\n<a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('Musician', {\n     extend: 'Person',\n\n     mixins: {\n         canSing: 'CanSing'\n     }\n})\n</code></pre>\n</div></div></div><div id='cfg-override' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Class'>Ext.Class</span><br/><a href='source/ClassManager2.html#Ext-Class-cfg-override' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Class-cfg-override' class='name expandable'>override</a><span> : String</span></div><div class='description'><div class='short'>Defines an override applied to a class. ...</div><div class='long'><p>Defines an override applied to a class. Note that <strong>overrides can only be created using\n<a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>.</strong> <a href=\"#!/api/Ext.ClassManager-method-create\" rel=\"Ext.ClassManager-method-create\" class=\"docClass\">Ext.ClassManager.create</a> only creates classes.</p>\n\n<p>To define an override, include the override property. The content of an override is\naggregated with the specified class in order to extend or modify that class. This can be\nas simple as setting default property values or it can extend and/or replace methods.\nThis can also extend the statics of the class.</p>\n\n<p>One use for an override is to break a large class into manageable pieces.</p>\n\n<pre><code> // File: /src/app/Panel.js\n\n <a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('My.app.Panel', {\n     extend: '<a href=\"#!/api/Ext.panel.Panel\" rel=\"Ext.panel.Panel\" class=\"docClass\">Ext.panel.Panel</a>',\n     requires: [\n         'My.app.PanelPart2',\n         'My.app.PanelPart3'\n     ]\n\n     constructor: function (config) {\n         this.callSuper(arguments); // calls <a href=\"#!/api/Ext.panel.Panel\" rel=\"Ext.panel.Panel\" class=\"docClass\">Ext.panel.Panel</a>'s constructor\n         //...\n     },\n\n     statics: {\n         method: function () {\n             return 'abc';\n         }\n     }\n });\n\n // File: /src/app/PanelPart2.js\n <a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('My.app.PanelPart2', {\n     override: 'My.app.Panel',\n\n     constructor: function (config) {\n         this.callSuper(arguments); // calls My.app.Panel's constructor\n         //...\n     }\n });\n</code></pre>\n\n<p>Another use of overrides is to provide optional parts of classes that can be\nindependently required. In this case, the class may even be unaware of the\noverride altogether.</p>\n\n<pre><code> <a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('My.ux.CoolTip', {\n     override: '<a href=\"#!/api/Ext.tip.ToolTip\" rel=\"Ext.tip.ToolTip\" class=\"docClass\">Ext.tip.ToolTip</a>',\n\n     constructor: function (config) {\n         this.callSuper(arguments); // calls <a href=\"#!/api/Ext.tip.ToolTip\" rel=\"Ext.tip.ToolTip\" class=\"docClass\">Ext.tip.ToolTip</a>'s constructor\n         //...\n     }\n });\n</code></pre>\n\n<p>The above override can now be required as normal.</p>\n\n<pre><code> <a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('My.app.App', {\n     requires: [\n         'My.ux.CoolTip'\n     ]\n });\n</code></pre>\n\n<p>Overrides can also contain statics:</p>\n\n<pre><code> <a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('My.app.BarMod', {\n     override: 'Ext.foo.Bar',\n\n     statics: {\n         method: function (x) {\n             return this.callSuper([x * 2]); // call Ext.foo.Bar.method\n         }\n     }\n });\n</code></pre>\n\n<p>IMPORTANT: An override is only included in a build if the class it overrides is\nrequired. Otherwise, the override, like the target class, is not included.</p>\n</div></div></div><div id='cfg-requires' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Class'>Ext.Class</span><br/><a href='source/Loader.html#Ext-Class-cfg-requires' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Class-cfg-requires' class='name expandable'>requires</a><span> : String[]</span></div><div class='description'><div class='short'>List of classes that have to be loaded before instantiating this class. ...</div><div class='long'><p>List of classes that have to be loaded before instantiating this class.\nFor example:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('Mother', {\n    requires: ['Child'],\n    giveBirth: function() {\n        // we can be sure that child class is available.\n        return new Child();\n    }\n});\n</code></pre>\n</div></div></div><div id='cfg-singleton' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Class'>Ext.Class</span><br/><a href='source/ClassManager2.html#Ext-Class-cfg-singleton' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Class-cfg-singleton' class='name expandable'>singleton</a><span> : Boolean</span></div><div class='description'><div class='short'>When set to true, the class will be instantiated as singleton. ...</div><div class='long'><p>When set to true, the class will be instantiated as singleton.  For example:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('Logger', {\n    singleton: true,\n    log: function(msg) {\n        console.log(msg);\n    }\n});\n\nLogger.log('Hello');\n</code></pre>\n</div></div></div><div id='cfg-statics' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Class'>Ext.Class</span><br/><a href='source/Class2.html#Ext-Class-cfg-statics' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Class-cfg-statics' class='name expandable'>statics</a><span> : Object</span></div><div class='description'><div class='short'>List of static methods for this class. ...</div><div class='long'><p>List of static methods for this class. For example:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('Computer', {\n     statics: {\n         factory: function(brand) {\n             // 'this' in static methods refer to the class itself\n             return new this(brand);\n         }\n     },\n\n     constructor: function() { ... }\n});\n\nvar dellComputer = Computer.factory('Dell');\n</code></pre>\n</div></div></div><div id='cfg-uses' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Class'>Ext.Class</span><br/><a href='source/Loader.html#Ext-Class-cfg-uses' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Class-cfg-uses' class='name expandable'>uses</a><span> : String[]</span></div><div class='description'><div class='short'>List of classes to load together with this class. ...</div><div class='long'><p>List of classes to load together with this class.  These aren't neccessarily loaded before\nthis class is instantiated. For example:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('Mother', {\n    uses: ['Child'],\n    giveBirth: function() {\n        // This code might, or might not work:\n        // return new Child();\n\n        // Instead use <a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>() to load the class at the spot if not loaded already:\n        return <a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('Child');\n    }\n});\n</code></pre>\n</div></div></div></div></div><div class='members-section'><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Instance Methods</h3><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Class'>Ext.Class</span><br/><a href='source/Class2.html#Ext-Class-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/Ext.Class-method-constructor' class='name expandable'>Ext.Class</a>( <span class='pre'>Object classData, [Function createdFn]</span> ) : <a href=\"#!/api/Ext.Base\" rel=\"Ext.Base\" class=\"docClass\">Ext.Base</a></div><div class='description'><div class='short'>Creates new class. ...</div><div class='long'><p>Creates new class.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>classData</span> : Object<div class='sub-desc'><p>An object represent the properties of this class</p>\n</div></li><li><span class='pre'>createdFn</span> : Function (optional)<div class='sub-desc'><p>The callback function to be executed when this class is fully created.\nNote that the creation process can be asynchronous depending on the pre-processors used.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Ext.Base\" rel=\"Ext.Base\" class=\"docClass\">Ext.Base</a></span><div class='sub-desc'><p>The newly created class</p>\n</div></li></ul></div></div></div></div><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Static Methods</h3><div id='static-method-getDefaultPreprocessors' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Class'>Ext.Class</span><br/><a href='source/Class2.html#Ext-Class-static-method-getDefaultPreprocessors' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Class-static-method-getDefaultPreprocessors' class='name expandable'>getDefaultPreprocessors</a>( <span class='pre'></span> ) : Function[]<strong class='static signature'>static</strong></div><div class='description'><div class='short'>Retrieve the array stack of default pre-processors ...</div><div class='long'><p>Retrieve the array stack of default pre-processors</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Function[]</span><div class='sub-desc'><p>defaultPreprocessors</p>\n</div></li></ul></div></div></div><div id='static-method-getPreprocessor' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Class'>Ext.Class</span><br/><a href='source/Class2.html#Ext-Class-static-method-getPreprocessor' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Class-static-method-getPreprocessor' class='name expandable'>getPreprocessor</a>( <span class='pre'>String name</span> ) : Function<strong class='static signature'>static</strong></div><div class='description'><div class='short'>Retrieve a pre-processor callback function by its name, which has been registered before ...</div><div class='long'><p>Retrieve a pre-processor callback function by its name, which has been registered before</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : String<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Function</span><div class='sub-desc'><p>preprocessor</p>\n</div></li></ul></div></div></div><div id='static-method-registerPreprocessor' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Class'>Ext.Class</span><br/><a href='source/Class2.html#Ext-Class-static-method-registerPreprocessor' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Class-static-method-registerPreprocessor' class='name expandable'>registerPreprocessor</a>( <span class='pre'>String name, Function fn</span> ) : <a href=\"#!/api/Ext.Class\" rel=\"Ext.Class\" class=\"docClass\">Ext.Class</a><strong class='static signature'>static</strong></div><div class='description'><div class='short'>Register a new pre-processor to be used during the class creation process ...</div><div class='long'><p>Register a new pre-processor to be used during the class creation process</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : String<div class='sub-desc'><p>The pre-processor's name</p>\n</div></li><li><span class='pre'>fn</span> : Function<div class='sub-desc'><p>The callback function to be executed. Typical format:</p>\n\n<pre><code>function(cls, data, fn) {\n    // Your code here\n\n    // Execute this when the processing is finished.\n    // Asynchronous processing is perfectly ok\n    if (fn) {\n        fn.call(this, cls, data);\n    }\n});\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>cls</span> : Function<div class='sub-desc'><p>The created class</p>\n</div></li><li><span class='pre'>data</span> : Object<div class='sub-desc'><p>The set of properties passed in <a href=\"#!/api/Ext.Class\" rel=\"Ext.Class\" class=\"docClass\">Ext.Class</a> constructor</p>\n</div></li><li><span class='pre'>fn</span> : Function<div class='sub-desc'><p>The callback function that <strong>must</strong> to be executed when this pre-processor finishes,\nregardless of whether the processing is synchronous or aynchronous</p>\n</div></li></ul></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Ext.Class\" rel=\"Ext.Class\" class=\"docClass\">Ext.Class</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='static-method-setDefaultPreprocessorPosition' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Class'>Ext.Class</span><br/><a href='source/Class2.html#Ext-Class-static-method-setDefaultPreprocessorPosition' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Class-static-method-setDefaultPreprocessorPosition' class='name expandable'>setDefaultPreprocessorPosition</a>( <span class='pre'>String name, String offset, String relativeName</span> ) : <a href=\"#!/api/Ext.Class\" rel=\"Ext.Class\" class=\"docClass\">Ext.Class</a><strong class='static signature'>static</strong></div><div class='description'><div class='short'>Inserts this pre-processor at a specific position in the stack, optionally relative to\nany existing pre-processor. ...</div><div class='long'><p>Inserts this pre-processor at a specific position in the stack, optionally relative to\nany existing pre-processor. For example:</p>\n\n<pre><code><a href=\"#!/api/Ext.Class-static-method-registerPreprocessor\" rel=\"Ext.Class-static-method-registerPreprocessor\" class=\"docClass\">Ext.Class.registerPreprocessor</a>('debug', function(cls, data, fn) {\n    // Your code here\n\n    if (fn) {\n        fn.call(this, cls, data);\n    }\n}).setDefaultPreprocessorPosition('debug', 'last');\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : String<div class='sub-desc'><p>The pre-processor name. Note that it needs to be registered with\n<a href=\"#!/api/Ext.Class-static-method-registerPreprocessor\" rel=\"Ext.Class-static-method-registerPreprocessor\" class=\"docClass\">registerPreprocessor</a> before this</p>\n</div></li><li><span class='pre'>offset</span> : String<div class='sub-desc'><p>The insertion position. Four possible values are:\n'first', 'last', or: 'before', 'after' (relative to the name provided in the third argument)</p>\n</div></li><li><span class='pre'>relativeName</span> : String<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Ext.Class\" rel=\"Ext.Class\" class=\"docClass\">Ext.Class</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='static-method-setDefaultPreprocessors' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Class'>Ext.Class</span><br/><a href='source/Class2.html#Ext-Class-static-method-setDefaultPreprocessors' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Class-static-method-setDefaultPreprocessors' class='name expandable'>setDefaultPreprocessors</a>( <span class='pre'>Function/Function[] preprocessors</span> ) : <a href=\"#!/api/Ext.Class\" rel=\"Ext.Class\" class=\"docClass\">Ext.Class</a><strong class='static signature'>static</strong></div><div class='description'><div class='short'>Set the default array stack of default pre-processors ...</div><div class='long'><p>Set the default array stack of default pre-processors</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>preprocessors</span> : Function/Function[]<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Ext.Class\" rel=\"Ext.Class\" class=\"docClass\">Ext.Class</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div></div></div></div></div>","uses":[],"id":"class-Ext.Class"});