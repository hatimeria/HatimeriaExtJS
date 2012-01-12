Ext.data.JsonP.Ext_ModelManager({"mixins":[],"component":false,"aliases":{},"requires":["Ext.data.Association"],"members":{"method":[{"required":null,"static":false,"protected":true,"owner":"Ext.Base","name":"callOverridden","id":"method-callOverridden","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":true,"owner":"Ext.Base","name":"callParent","id":"method-callParent","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.ModelManager","name":"create","id":"method-create","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.AbstractManager","name":"each","id":"method-each","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.AbstractManager","name":"get","id":"method-get","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.AbstractManager","name":"getCount","id":"method-getCount","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.ModelManager","name":"getModel","id":"method-getModel","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":true,"owner":"Ext.Base","name":"initConfig","id":"method-initConfig","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.AbstractManager","name":"isRegistered","id":"method-isRegistered","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.AbstractManager","name":"onAvailable","id":"method-onAvailable","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.AbstractManager","name":"register","id":"method-register","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.AbstractManager","name":"registerType","id":"method-registerType","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":true,"owner":"Ext.Base","name":"statics","id":"method-statics","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.AbstractManager","name":"unregister","id":"method-unregister","template":false,"tagname":"method","deprecated":null}],"property":[{"required":null,"static":false,"protected":false,"owner":"Ext.AbstractManager","name":"all","id":"property-all","template":null,"tagname":"property","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.ModelManager","name":"associationStack","id":"property-associationStack","template":null,"tagname":"property","deprecated":null},{"required":null,"static":false,"protected":true,"owner":"Ext.Base","name":"self","id":"property-self","template":null,"tagname":"property","deprecated":null}],"css_var":[],"css_mixin":[],"cfg":[],"event":[]},"html":"<div><pre class=\"hierarchy\"><h4>Alternate names</h4><div class='alternate-class-name'>Ext.ModelMgr</div><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/Ext.Base' rel='Ext.Base' class='docClass'>Ext.Base</a><div class='subclass '><a href='#!/api/Ext.AbstractManager' rel='Ext.AbstractManager' class='docClass'>Ext.AbstractManager</a><div class='subclass '><strong>Ext.ModelManager</strong></div></div></div><h4>Requires</h4><div class='dependency'><a href='#!/api/Ext.data.Association' rel='Ext.data.Association' class='docClass'>Ext.data.Association</a></div><h4>Files</h4><div class='dependency'><a href='source/ModelManager.html#Ext-ModelManager' target='_blank'>ModelManager.js</a></div></pre><div class='doc-contents'><p>The ModelManager keeps track of all <a href=\"#!/api/Ext.data.Model\" rel=\"Ext.data.Model\" class=\"docClass\">Ext.data.Model</a> types defined in your application.</p>\n\n<p><strong>Creating Model Instances</strong></p>\n\n<p>Model instances can be created by using the <a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a> method. Ext.create replaces\nthe deprecated <a href=\"#!/api/Ext.ModelManager-method-create\" rel=\"Ext.ModelManager-method-create\" class=\"docClass\">Ext.ModelManager.create</a> method. It is also possible to create a model instance\nthis by using the Model type directly. The following 3 snippets are equivalent:</p>\n\n<pre><code>Ext.define('User', {\n    extend: 'Ext.data.Model',\n    fields: ['first', 'last']\n});\n\n// method 1, create using Ext.create (recommended)\nExt.create('User', {\n    first: 'Ed',\n    last: 'Spencer'\n});\n\n// method 2, create through the manager (deprecated)\nExt.ModelManager.create({\n    first: 'Ed',\n    last: 'Spencer'\n}, 'User');\n\n// method 3, create on the type directly\nnew User({\n    first: 'Ed',\n    last: 'Spencer'\n});\n</code></pre>\n\n<p><strong>Accessing Model Types</strong></p>\n\n<p>A reference to a Model type can be obtained by using the <a href=\"#!/api/Ext.ModelManager-method-getModel\" rel=\"Ext.ModelManager-method-getModel\" class=\"docClass\">getModel</a> function. Since models types\nare normal classes, you can access the type directly. The following snippets are equivalent:</p>\n\n<pre><code>Ext.define('User', {\n    extend: 'Ext.data.Model',\n    fields: ['first', 'last']\n});\n\n// method 1, access model type through the manager\nvar UserType = Ext.ModelManager.getModel('User');\n\n// method 2, reference the type directly\nvar UserType = User;\n</code></pre>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-all' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.AbstractManager' rel='Ext.AbstractManager' class='defined-in docClass'>Ext.AbstractManager</a><br/><a href='source/AbstractManager.html#Ext-AbstractManager-property-all' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.AbstractManager-property-all' class='name not-expandable'>all</a><span> : <a href=\"#!/api/Ext.util.HashMap\" rel=\"Ext.util.HashMap\" class=\"docClass\">Ext.util.HashMap</a></span></div><div class='description'><div class='short'><p>Contains all of the items currently managed</p>\n</div><div class='long'><p>Contains all of the items currently managed</p>\n</div></div></div><div id='property-associationStack' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ModelManager'>Ext.ModelManager</span><br/><a href='source/ModelManager.html#Ext-ModelManager-property-associationStack' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ModelManager-property-associationStack' class='name not-expandable'>associationStack</a><span> : <a href=\"#!/api/Ext.data.Association\" rel=\"Ext.data.Association\" class=\"docClass\">Ext.data.Association</a>[]</span></div><div class='description'><div class='short'><p>Private stack of associations that must be created once their associated model has been defined</p>\n</div><div class='long'><p>Private stack of associations that must be created once their associated model has been defined</p>\n</div></div></div><div id='property-self' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.Base' rel='Ext.Base' class='defined-in docClass'>Ext.Base</a><br/><a href='source/Base3.html#Ext-Base-property-self' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Base-property-self' class='name expandable'>self</a><span> : <a href=\"#!/api/Ext.Class\" rel=\"Ext.Class\" class=\"docClass\">Ext.Class</a></span><strong class='protected signature'>protected</strong></div><div class='description'><div class='short'>Get the reference to the current class from which this object was instantiated. ...</div><div class='long'><p>Get the reference to the current class from which this object was instantiated. Unlike <a href=\"#!/api/Ext.Base-method-statics\" rel=\"Ext.Base-method-statics\" class=\"docClass\">statics</a>,\n<code>this.self</code> is scope-dependent and it's meant to be used for dynamic inheritance. See <a href=\"#!/api/Ext.Base-method-statics\" rel=\"Ext.Base-method-statics\" class=\"docClass\">statics</a>\nfor a detailed comparison</p>\n\n<pre><code>Ext.define('My.Cat', {\n    statics: {\n        speciesName: 'Cat' // My.Cat.speciesName = 'Cat'\n    },\n\n    constructor: function() {\n        alert(this.self.speciesName); / dependent on 'this'\n\n        return this;\n    },\n\n    clone: function() {\n        return new this.self();\n    }\n});\n\n\nExt.define('My.SnowLeopard', {\n    extend: 'My.Cat',\n    statics: {\n        speciesName: 'Snow Leopard'         // My.SnowLeopard.speciesName = 'Snow Leopard'\n    }\n});\n\nvar cat = new My.Cat();                     // alerts 'Cat'\nvar snowLeopard = new My.SnowLeopard();     // alerts 'Snow Leopard'\n\nvar clone = snowLeopard.clone();\nalert(Ext.getClassName(clone));             // alerts 'My.SnowLeopard'\n</code></pre>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-callOverridden' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.Base' rel='Ext.Base' class='defined-in docClass'>Ext.Base</a><br/><a href='source/Base3.html#Ext-Base-method-callOverridden' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Base-method-callOverridden' class='name expandable'>callOverridden</a>( <span class='pre'>Array/Arguments args</span> ) : Object<strong class='protected signature'>protected</strong></div><div class='description'><div class='short'>Call the original method that was previously overridden with override\n\nExt.define('My.Cat', {\n    constructor: functi...</div><div class='long'><p>Call the original method that was previously overridden with <a href=\"#!/api/Ext.Base-static-method-override\" rel=\"Ext.Base-static-method-override\" class=\"docClass\">override</a></p>\n\n<pre><code>Ext.define('My.Cat', {\n    constructor: function() {\n        alert(\"I'm a cat!\");\n\n        return this;\n    }\n});\n\nMy.Cat.override({\n    constructor: function() {\n        alert(\"I'm going to be a cat!\");\n\n        var instance = this.callOverridden();\n\n        alert(\"Meeeeoooowwww\");\n\n        return instance;\n    }\n});\n\nvar kitty = new My.Cat(); // alerts \"I'm going to be a cat!\"\n                          // alerts \"I'm a cat!\"\n                          // alerts \"Meeeeoooowwww\"\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>args</span> : Array/Arguments<div class='sub-desc'><p>The arguments, either an array or the <code>arguments</code> object</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>Returns the result after calling the overridden method</p>\n</div></li></ul></div></div></div><div id='method-callParent' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.Base' rel='Ext.Base' class='defined-in docClass'>Ext.Base</a><br/><a href='source/Base3.html#Ext-Base-method-callParent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Base-method-callParent' class='name expandable'>callParent</a>( <span class='pre'>Array/Arguments args</span> ) : Object<strong class='protected signature'>protected</strong></div><div class='description'><div class='short'>Call the parent's overridden method. ...</div><div class='long'><p>Call the parent's overridden method. For example:</p>\n\n<pre><code>Ext.define('My.own.A', {\n    constructor: function(test) {\n        alert(test);\n    }\n});\n\nExt.define('My.own.B', {\n    extend: 'My.own.A',\n\n    constructor: function(test) {\n        alert(test);\n\n        this.callParent([test + 1]);\n    }\n});\n\nExt.define('My.own.C', {\n    extend: 'My.own.B',\n\n    constructor: function() {\n        alert(\"Going to call parent's overriden constructor...\");\n\n        this.callParent(arguments);\n    }\n});\n\nvar a = new My.own.A(1); // alerts '1'\nvar b = new My.own.B(1); // alerts '1', then alerts '2'\nvar c = new My.own.C(2); // alerts \"Going to call parent's overriden constructor...\"\n                         // alerts '2', then alerts '3'\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>args</span> : Array/Arguments<div class='sub-desc'><p>The arguments, either an array or the <code>arguments</code> object\nfrom the current method, for example: <code>this.callParent(arguments)</code></p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>Returns the result from the superclass' method</p>\n</div></li></ul></div></div></div><div id='method-create' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ModelManager'>Ext.ModelManager</span><br/><a href='source/ModelManager.html#Ext-ModelManager-method-create' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ModelManager-method-create' class='name expandable'>create</a>( <span class='pre'>Object data, String name, [Number id]</span> )</div><div class='description'><div class='short'>Creates a new instance of a Model using the given data. ...</div><div class='long'><p>Creates a new instance of a Model using the given data.</p>\n\n<p>This method is deprecated.  Use <a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a> instead.  For example:</p>\n\n<pre><code>Ext.create('User', {\n    first: 'Ed',\n    last: 'Spencer'\n});\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>data</span> : Object<div class='sub-desc'><p>Data to initialize the Model's fields with</p>\n</div></li><li><span class='pre'>name</span> : String<div class='sub-desc'><p>The name of the model to create</p>\n</div></li><li><span class='pre'>id</span> : Number (optional)<div class='sub-desc'><p>unique id of the Model instance (see <a href=\"#!/api/Ext.data.Model\" rel=\"Ext.data.Model\" class=\"docClass\">Ext.data.Model</a>)</p>\n</div></li></ul></div></div></div><div id='method-each' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.AbstractManager' rel='Ext.AbstractManager' class='defined-in docClass'>Ext.AbstractManager</a><br/><a href='source/AbstractManager.html#Ext-AbstractManager-method-each' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.AbstractManager-method-each' class='name expandable'>each</a>( <span class='pre'>Function fn, Object scope</span> )</div><div class='description'><div class='short'>Executes the specified function once for each item in the collection. ...</div><div class='long'><p>Executes the specified function once for each item in the collection.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>fn</span> : Function<div class='sub-desc'><p>The function to execute.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>key</span> : String<div class='sub-desc'><p>The key of the item</p>\n</div></li><li><span class='pre'>value</span> : Number<div class='sub-desc'><p>The value of the item</p>\n</div></li><li><span class='pre'>length</span> : Number<div class='sub-desc'><p>The total number of items in the collection</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'><p>False to cease iteration.</p>\n</div></li></ul></div></li><li><span class='pre'>scope</span> : Object<div class='sub-desc'><p>The scope to execute in. Defaults to <code>this</code>.</p>\n</div></li></ul></div></div></div><div id='method-get' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.AbstractManager' rel='Ext.AbstractManager' class='defined-in docClass'>Ext.AbstractManager</a><br/><a href='source/AbstractManager.html#Ext-AbstractManager-method-get' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.AbstractManager-method-get' class='name expandable'>get</a>( <span class='pre'>String id</span> ) : Object</div><div class='description'><div class='short'>Returns an item by id. ...</div><div class='long'><p>Returns an item by id.\nFor additional details see <a href=\"#!/api/Ext.util.HashMap-method-get\" rel=\"Ext.util.HashMap-method-get\" class=\"docClass\">Ext.util.HashMap.get</a>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>id</span> : String<div class='sub-desc'><p>The id of the item</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>The item, undefined if not found.</p>\n</div></li></ul></div></div></div><div id='method-getCount' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.AbstractManager' rel='Ext.AbstractManager' class='defined-in docClass'>Ext.AbstractManager</a><br/><a href='source/AbstractManager.html#Ext-AbstractManager-method-getCount' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.AbstractManager-method-getCount' class='name expandable'>getCount</a>( <span class='pre'></span> ) : Number</div><div class='description'><div class='short'>Gets the number of items in the collection. ...</div><div class='long'><p>Gets the number of items in the collection.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Number</span><div class='sub-desc'><p>The number of items in the collection.</p>\n</div></li></ul></div></div></div><div id='method-getModel' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ModelManager'>Ext.ModelManager</span><br/><a href='source/ModelManager.html#Ext-ModelManager-method-getModel' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ModelManager-method-getModel' class='name expandable'>getModel</a>( <span class='pre'>String/Object id</span> ) : <a href=\"#!/api/Ext.data.Model\" rel=\"Ext.data.Model\" class=\"docClass\">Ext.data.Model</a></div><div class='description'><div class='short'>Returns the Ext.data.Model for a given model name ...</div><div class='long'><p>Returns the <a href=\"#!/api/Ext.data.Model\" rel=\"Ext.data.Model\" class=\"docClass\">Ext.data.Model</a> for a given model name</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>id</span> : String/Object<div class='sub-desc'><p>The id of the model or the model instance.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Ext.data.Model\" rel=\"Ext.data.Model\" class=\"docClass\">Ext.data.Model</a></span><div class='sub-desc'><p>a model class.</p>\n</div></li></ul></div></div></div><div id='method-initConfig' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.Base' rel='Ext.Base' class='defined-in docClass'>Ext.Base</a><br/><a href='source/Base3.html#Ext-Base-method-initConfig' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Base-method-initConfig' class='name expandable'>initConfig</a>( <span class='pre'>Object config</span> ) : Object<strong class='protected signature'>protected</strong></div><div class='description'><div class='short'>Initialize configuration for this class. ...</div><div class='long'><p>Initialize configuration for this class. a typical example:</p>\n\n<pre><code>Ext.define('My.awesome.Class', {\n    // The default config\n    config: {\n        name: 'Awesome',\n        isAwesome: true\n    },\n\n    constructor: function(config) {\n        this.initConfig(config);\n\n        return this;\n    }\n});\n\nvar awesome = new My.awesome.Class({\n    name: 'Super Awesome'\n});\n\nalert(awesome.getName()); // 'Super Awesome'\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : Object<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>mixins The mixin prototypes as key - value pairs</p>\n</div></li></ul></div></div></div><div id='method-isRegistered' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.AbstractManager' rel='Ext.AbstractManager' class='defined-in docClass'>Ext.AbstractManager</a><br/><a href='source/AbstractManager.html#Ext-AbstractManager-method-isRegistered' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.AbstractManager-method-isRegistered' class='name expandable'>isRegistered</a>( <span class='pre'>String type</span> ) : Boolean</div><div class='description'><div class='short'>Checks if an item type is registered. ...</div><div class='long'><p>Checks if an item type is registered.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>type</span> : String<div class='sub-desc'><p>The mnemonic string by which the class may be looked up</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'><p>Whether the type is registered.</p>\n</div></li></ul></div></div></div><div id='method-onAvailable' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.AbstractManager' rel='Ext.AbstractManager' class='defined-in docClass'>Ext.AbstractManager</a><br/><a href='source/AbstractManager.html#Ext-AbstractManager-method-onAvailable' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.AbstractManager-method-onAvailable' class='name expandable'>onAvailable</a>( <span class='pre'>String id, Function fn, Object scope</span> )</div><div class='description'><div class='short'>Registers a function that will be called when an item with the specified id is added to the manager. ...</div><div class='long'><p>Registers a function that will be called when an item with the specified id is added to the manager.\nThis will happen on instantiation.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>id</span> : String<div class='sub-desc'><p>The item id</p>\n</div></li><li><span class='pre'>fn</span> : Function<div class='sub-desc'><p>The callback function. Called with a single parameter, the item.</p>\n</div></li><li><span class='pre'>scope</span> : Object<div class='sub-desc'><p>The scope (this reference) in which the callback is executed.\nDefaults to the item.</p>\n</div></li></ul></div></div></div><div id='method-register' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.AbstractManager' rel='Ext.AbstractManager' class='defined-in docClass'>Ext.AbstractManager</a><br/><a href='source/AbstractManager.html#Ext-AbstractManager-method-register' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.AbstractManager-method-register' class='name expandable'>register</a>( <span class='pre'>Object item</span> )</div><div class='description'><div class='short'>Registers an item to be managed ...</div><div class='long'><p>Registers an item to be managed</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>item</span> : Object<div class='sub-desc'><p>The item to register</p>\n</div></li></ul></div></div></div><div id='method-registerType' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.AbstractManager' rel='Ext.AbstractManager' class='defined-in docClass'>Ext.AbstractManager</a><br/><a href='source/AbstractManager.html#Ext-AbstractManager-method-registerType' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.AbstractManager-method-registerType' class='name expandable'>registerType</a>( <span class='pre'>String type, Function cls</span> )</div><div class='description'><div class='short'>Registers a new item constructor, keyed by a type key. ...</div><div class='long'><p>Registers a new item constructor, keyed by a type key.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>type</span> : String<div class='sub-desc'><p>The mnemonic string by which the class may be looked up.</p>\n</div></li><li><span class='pre'>cls</span> : Function<div class='sub-desc'><p>The new instance class.</p>\n</div></li></ul></div></div></div><div id='method-statics' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.Base' rel='Ext.Base' class='defined-in docClass'>Ext.Base</a><br/><a href='source/Base3.html#Ext-Base-method-statics' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Base-method-statics' class='name expandable'>statics</a>( <span class='pre'></span> ) : <a href=\"#!/api/Ext.Class\" rel=\"Ext.Class\" class=\"docClass\">Ext.Class</a><strong class='protected signature'>protected</strong></div><div class='description'><div class='short'>Get the reference to the class from which this object was instantiated. ...</div><div class='long'><p>Get the reference to the class from which this object was instantiated. Note that unlike <a href=\"#!/api/Ext.Base-property-self\" rel=\"Ext.Base-property-self\" class=\"docClass\">self</a>,\n<code>this.statics()</code> is scope-independent and it always returns the class from which it was called, regardless of what\n<code>this</code> points to during run-time</p>\n\n<pre><code>Ext.define('My.Cat', {\n    statics: {\n        totalCreated: 0,\n        speciesName: 'Cat' // My.Cat.speciesName = 'Cat'\n    },\n\n    constructor: function() {\n        var statics = this.statics();\n\n        alert(statics.speciesName);     // always equals to 'Cat' no matter what 'this' refers to\n                                        // equivalent to: My.Cat.speciesName\n\n        alert(this.self.speciesName);   // dependent on 'this'\n\n        statics.totalCreated++;\n\n        return this;\n    },\n\n    clone: function() {\n        var cloned = new this.self;                      // dependent on 'this'\n\n        cloned.groupName = this.statics().speciesName;   // equivalent to: My.Cat.speciesName\n\n        return cloned;\n    }\n});\n\n\nExt.define('My.SnowLeopard', {\n    extend: 'My.Cat',\n\n    statics: {\n        speciesName: 'Snow Leopard'     // My.SnowLeopard.speciesName = 'Snow Leopard'\n    },\n\n    constructor: function() {\n        this.callParent();\n    }\n});\n\nvar cat = new My.Cat();                 // alerts 'Cat', then alerts 'Cat'\n\nvar snowLeopard = new My.SnowLeopard(); // alerts 'Cat', then alerts 'Snow Leopard'\n\nvar clone = snowLeopard.clone();\nalert(Ext.getClassName(clone));         // alerts 'My.SnowLeopard'\nalert(clone.groupName);                 // alerts 'Cat'\n\nalert(My.Cat.totalCreated);             // alerts 3\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Ext.Class\" rel=\"Ext.Class\" class=\"docClass\">Ext.Class</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-unregister' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.AbstractManager' rel='Ext.AbstractManager' class='defined-in docClass'>Ext.AbstractManager</a><br/><a href='source/AbstractManager.html#Ext-AbstractManager-method-unregister' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.AbstractManager-method-unregister' class='name expandable'>unregister</a>( <span class='pre'>Object item</span> )</div><div class='description'><div class='short'>Unregisters an item by removing it from this manager ...</div><div class='long'><p>Unregisters an item by removing it from this manager</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>item</span> : Object<div class='sub-desc'><p>The item to unregister</p>\n</div></li></ul></div></div></div></div></div></div></div>","mixedInto":[],"meta":{"author":["Ed Spencer"]},"inheritdoc":null,"inheritable":false,"static":false,"protected":false,"allMixins":[],"subclasses":[],"extends":"Ext.AbstractManager","uses":[],"code_type":"ext_define","private":false,"statics":{"method":[],"property":[],"css_var":[],"css_mixin":[],"cfg":[],"event":[]},"superclasses":["Ext.Base","Ext.AbstractManager","Ext.ModelManager"],"name":"Ext.ModelManager","alternateClassNames":["Ext.ModelMgr"],"files":[{"href":"ModelManager.html#Ext-ModelManager","filename":"ModelManager.js"}],"tagname":"class","singleton":true,"id":"class-Ext.ModelManager","deprecated":null});