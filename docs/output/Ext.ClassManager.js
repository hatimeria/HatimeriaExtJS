Ext.data.JsonP.Ext_ClassManager({"mixins":[],"component":false,"aliases":{},"requires":[],"members":{"method":[{"required":null,"static":false,"protected":false,"owner":"Ext.ClassManager","name":"create","id":"method-create","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.ClassManager","name":"get","id":"method-get","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.ClassManager","name":"getAliasesByName","id":"method-getAliasesByName","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.ClassManager","name":"getByAlias","id":"method-getByAlias","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.ClassManager","name":"getClass","id":"method-getClass","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.ClassManager","name":"getDisplayName","id":"method-getDisplayName","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.ClassManager","name":"getName","id":"method-getName","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.ClassManager","name":"getNameByAlias","id":"method-getNameByAlias","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.ClassManager","name":"getNameByAlternate","id":"method-getNameByAlternate","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.ClassManager","name":"getNamesByExpression","id":"method-getNamesByExpression","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.ClassManager","name":"instantiate","id":"method-instantiate","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.ClassManager","name":"instantiateByAlias","id":"method-instantiateByAlias","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.ClassManager","name":"isCreated","id":"method-isCreated","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.ClassManager","name":"registerPostprocessor","id":"method-registerPostprocessor","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.ClassManager","name":"set","id":"method-set","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.ClassManager","name":"setAlias","id":"method-setAlias","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.ClassManager","name":"setDefaultPostprocessorPosition","id":"method-setDefaultPostprocessorPosition","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.ClassManager","name":"setDefaultPostprocessors","id":"method-setDefaultPostprocessors","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.ClassManager","name":"setNamespace","id":"method-setNamespace","template":false,"tagname":"method","deprecated":null}],"property":[],"css_var":[],"css_mixin":[],"cfg":[],"event":[]},"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/ClassManager2.html#Ext-ClassManager' target='_blank'>ClassManager.js</a></div></pre><div class='doc-contents'><p>Ext.ClassManager manages all classes and handles mapping from string class name to\nactual class objects throughout the whole framework. It is not generally accessed directly, rather through\nthese convenient shorthands:</p>\n\n<ul>\n<li><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a></li>\n<li><a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a></li>\n<li><a href=\"#!/api/Ext-method-widget\" rel=\"Ext-method-widget\" class=\"docClass\">Ext.widget</a></li>\n<li><a href=\"#!/api/Ext-method-getClass\" rel=\"Ext-method-getClass\" class=\"docClass\">Ext.getClass</a></li>\n<li><a href=\"#!/api/Ext-method-getClassName\" rel=\"Ext-method-getClassName\" class=\"docClass\">Ext.getClassName</a></li>\n</ul>\n\n\n<h1>Basic syntax:</h1>\n\n<pre><code>Ext.define(className, properties);\n</code></pre>\n\n<p>in which <code>properties</code> is an object represent a collection of properties that apply to the class. See\n<a href=\"#!/api/Ext.ClassManager-method-create\" rel=\"Ext.ClassManager-method-create\" class=\"docClass\">create</a> for more detailed instructions.</p>\n\n<pre><code>Ext.define('Person', {\n     name: 'Unknown',\n\n     constructor: function(name) {\n         if (name) {\n             this.name = name;\n         }\n\n         return this;\n     },\n\n     eat: function(foodType) {\n         alert(\"I'm eating: \" + foodType);\n\n         return this;\n     }\n});\n\nvar aaron = new Person(\"Aaron\");\naaron.eat(\"Sandwich\"); // alert(\"I'm eating: Sandwich\");\n</code></pre>\n\n<p>Ext.Class has a powerful set of extensible <a href=\"#!/api/Ext.Class-static-method-registerPreprocessor\" rel=\"Ext.Class-static-method-registerPreprocessor\" class=\"docClass\">pre-processors</a> which takes care of\neverything related to class creation, including but not limited to inheritance, mixins, configuration, statics, etc.</p>\n\n<h1>Inheritance:</h1>\n\n<pre><code>Ext.define('Developer', {\n     extend: 'Person',\n\n     constructor: function(name, isGeek) {\n         this.isGeek = isGeek;\n\n         // Apply a method from the parent class' prototype\n         this.callParent([name]);\n\n         return this;\n\n     },\n\n     code: function(language) {\n         alert(\"I'm coding in: \" + language);\n\n         this.eat(\"Bugs\");\n\n         return this;\n     }\n});\n\nvar jacky = new Developer(\"Jacky\", true);\njacky.code(\"JavaScript\"); // alert(\"I'm coding in: JavaScript\");\n                          // alert(\"I'm eating: Bugs\");\n</code></pre>\n\n<p>See <a href=\"#!/api/Ext.Base-method-callParent\" rel=\"Ext.Base-method-callParent\" class=\"docClass\">Ext.Base.callParent</a> for more details on calling superclass' methods</p>\n\n<h1>Mixins:</h1>\n\n<pre><code>Ext.define('CanPlayGuitar', {\n     playGuitar: function() {\n        alert(\"F#...G...D...A\");\n     }\n});\n\nExt.define('CanComposeSongs', {\n     composeSongs: function() { ... }\n});\n\nExt.define('CanSing', {\n     sing: function() {\n         alert(\"I'm on the highway to hell...\")\n     }\n});\n\nExt.define('Musician', {\n     extend: 'Person',\n\n     mixins: {\n         canPlayGuitar: 'CanPlayGuitar',\n         canComposeSongs: 'CanComposeSongs',\n         canSing: 'CanSing'\n     }\n})\n\nExt.define('CoolPerson', {\n     extend: 'Person',\n\n     mixins: {\n         canPlayGuitar: 'CanPlayGuitar',\n         canSing: 'CanSing'\n     },\n\n     sing: function() {\n         alert(\"Ahem....\");\n\n         this.mixins.canSing.sing.call(this);\n\n         alert(\"[Playing guitar at the same time...]\");\n\n         this.playGuitar();\n     }\n});\n\nvar me = new CoolPerson(\"Jacky\");\n\nme.sing(); // alert(\"Ahem...\");\n           // alert(\"I'm on the highway to hell...\");\n           // alert(\"[Playing guitar at the same time...]\");\n           // alert(\"F#...G...D...A\");\n</code></pre>\n\n<h1>Config:</h1>\n\n<pre><code>Ext.define('SmartPhone', {\n     config: {\n         hasTouchScreen: false,\n         operatingSystem: 'Other',\n         price: 500\n     },\n\n     isExpensive: false,\n\n     constructor: function(config) {\n         this.initConfig(config);\n\n         return this;\n     },\n\n     applyPrice: function(price) {\n         this.isExpensive = (price &gt; 500);\n\n         return price;\n     },\n\n     applyOperatingSystem: function(operatingSystem) {\n         if (!(/^(iOS|Android|BlackBerry)$/i).test(operatingSystem)) {\n             return 'Other';\n         }\n\n         return operatingSystem;\n     }\n});\n\nvar iPhone = new SmartPhone({\n     hasTouchScreen: true,\n     operatingSystem: 'iOS'\n});\n\niPhone.getPrice(); // 500;\niPhone.getOperatingSystem(); // 'iOS'\niPhone.getHasTouchScreen(); // true;\niPhone.hasTouchScreen(); // true\n\niPhone.isExpensive; // false;\niPhone.setPrice(600);\niPhone.getPrice(); // 600\niPhone.isExpensive; // true;\n\niPhone.setOperatingSystem('AlienOS');\niPhone.getOperatingSystem(); // 'Other'\n</code></pre>\n\n<h1>Statics:</h1>\n\n<pre><code>Ext.define('Computer', {\n     statics: {\n         factory: function(brand) {\n            // 'this' in static methods refer to the class itself\n             return new this(brand);\n         }\n     },\n\n     constructor: function() { ... }\n});\n\nvar dellComputer = Computer.factory('Dell');\n</code></pre>\n\n<p>Also see <a href=\"#!/api/Ext.Base-method-statics\" rel=\"Ext.Base-method-statics\" class=\"docClass\">Ext.Base.statics</a> and <a href=\"#!/api/Ext.Base-property-self\" rel=\"Ext.Base-property-self\" class=\"docClass\">Ext.Base.self</a> for more details on accessing\nstatic properties within class methods</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-create' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ClassManager'>Ext.ClassManager</span><br/><a href='source/ClassManager2.html#Ext-ClassManager-method-create' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ClassManager-method-create' class='name expandable'>create</a>( <span class='pre'>String className, Object data, [Function createdFn]</span> ) : <a href=\"#!/api/Ext.Base\" rel=\"Ext.Base\" class=\"docClass\">Ext.Base</a></div><div class='description'><div class='short'>Defines a class. ...</div><div class='long'><p>Defines a class.</p>\n\n<p><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a> and <a href=\"#!/api/Ext.ClassManager-method-create\" rel=\"Ext.ClassManager-method-create\" class=\"docClass\">Ext.ClassManager.create</a> are almost aliases\nof each other, with the only exception that Ext.define allows definition of <a href=\"#!/api/Ext.Class-cfg-override\" rel=\"Ext.Class-cfg-override\" class=\"docClass\">overrides</a>.\nTo avoid trouble, always use Ext.define.</p>\n\n<pre><code>Ext.define('My.awesome.Class', {\n    someProperty: 'something',\n    someMethod: function() { ... }\n    ...\n\n}, function() {\n    alert('Created!');\n    alert(this === My.awesome.Class); // alerts true\n\n    var myInstance = new this();\n});\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>className</span> : String<div class='sub-desc'><p>The class name to create in string dot-namespaced format, for example:\n<code>My.very.awesome.Class</code>, <code>FeedViewer.plugin.CoolPager</code>. It is highly recommended to follow this simple convention:</p>\n\n<ul>\n<li>The root and the class name are 'CamelCased'</li>\n<li>Everything else is lower-cased</li>\n</ul>\n\n</div></li><li><span class='pre'>data</span> : Object<div class='sub-desc'><p>The key-value pairs of properties to apply to this class. Property names can be of any valid\nstrings, except those in the reserved list below:</p>\n\n<ul>\n<li><a href=\"#!/api/Ext.Base-property-self\" rel=\"Ext.Base-property-self\" class=\"docClass\">self</a></li>\n<li><a href=\"#!/api/Ext.Class-cfg-alias\" rel=\"Ext.Class-cfg-alias\" class=\"docClass\">alias</a></li>\n<li><a href=\"#!/api/Ext.Class-cfg-alternateClassName\" rel=\"Ext.Class-cfg-alternateClassName\" class=\"docClass\">alternateClassName</a></li>\n<li><a href=\"#!/api/Ext.Class-cfg-config\" rel=\"Ext.Class-cfg-config\" class=\"docClass\">config</a></li>\n<li><a href=\"#!/api/Ext.Class-cfg-extend\" rel=\"Ext.Class-cfg-extend\" class=\"docClass\">extend</a></li>\n<li><a href=\"#!/api/Ext.Class-cfg-inheritableStatics\" rel=\"Ext.Class-cfg-inheritableStatics\" class=\"docClass\">inheritableStatics</a></li>\n<li><a href=\"#!/api/Ext.Class-cfg-mixins\" rel=\"Ext.Class-cfg-mixins\" class=\"docClass\">mixins</a></li>\n<li><a href=\"#!/api/Ext.Class-cfg-override\" rel=\"Ext.Class-cfg-override\" class=\"docClass\">override</a> (only when using <a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>)</li>\n<li><a href=\"#!/api/Ext.Class-cfg-requires\" rel=\"Ext.Class-cfg-requires\" class=\"docClass\">requires</a></li>\n<li><a href=\"#!/api/Ext.Class-cfg-singleton\" rel=\"Ext.Class-cfg-singleton\" class=\"docClass\">singleton</a></li>\n<li><a href=\"#!/api/Ext.Class-cfg-statics\" rel=\"Ext.Class-cfg-statics\" class=\"docClass\">statics</a></li>\n<li><a href=\"#!/api/Ext.Class-cfg-uses\" rel=\"Ext.Class-cfg-uses\" class=\"docClass\">uses</a></li>\n</ul>\n\n</div></li><li><span class='pre'>createdFn</span> : Function (optional)<div class='sub-desc'><p>callback to execute after the class is created, the execution scope of which\n(<code>this</code>) will be the newly created class itself.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Ext.Base\" rel=\"Ext.Base\" class=\"docClass\">Ext.Base</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-get' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ClassManager'>Ext.ClassManager</span><br/><a href='source/ClassManager2.html#Ext-ClassManager-method-get' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ClassManager-method-get' class='name expandable'>get</a>( <span class='pre'>String name</span> ) : <a href=\"#!/api/Ext.Class\" rel=\"Ext.Class\" class=\"docClass\">Ext.Class</a></div><div class='description'><div class='short'>Retrieve a class by its name. ...</div><div class='long'><p>Retrieve a class by its name.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : String<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Ext.Class\" rel=\"Ext.Class\" class=\"docClass\">Ext.Class</a></span><div class='sub-desc'><p>class</p>\n</div></li></ul></div></div></div><div id='method-getAliasesByName' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ClassManager'>Ext.ClassManager</span><br/><a href='source/ClassManager2.html#Ext-ClassManager-method-getAliasesByName' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ClassManager-method-getAliasesByName' class='name expandable'>getAliasesByName</a>( <span class='pre'>String name</span> ) : String[]</div><div class='description'><div class='short'>Get the aliases of a class by the class name ...</div><div class='long'><p>Get the aliases of a class by the class name</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : String<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String[]</span><div class='sub-desc'><p>aliases</p>\n</div></li></ul></div></div></div><div id='method-getByAlias' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ClassManager'>Ext.ClassManager</span><br/><a href='source/ClassManager2.html#Ext-ClassManager-method-getByAlias' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ClassManager-method-getByAlias' class='name expandable'>getByAlias</a>( <span class='pre'>String alias</span> ) : <a href=\"#!/api/Ext.Class\" rel=\"Ext.Class\" class=\"docClass\">Ext.Class</a></div><div class='description'><div class='short'>Get a reference to the class by its alias. ...</div><div class='long'><p>Get a reference to the class by its alias.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>alias</span> : String<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Ext.Class\" rel=\"Ext.Class\" class=\"docClass\">Ext.Class</a></span><div class='sub-desc'><p>class</p>\n</div></li></ul></div></div></div><div id='method-getClass' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ClassManager'>Ext.ClassManager</span><br/><a href='source/ClassManager2.html#Ext-ClassManager-method-getClass' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ClassManager-method-getClass' class='name expandable'>getClass</a>( <span class='pre'>Object object</span> ) : <a href=\"#!/api/Ext.Class\" rel=\"Ext.Class\" class=\"docClass\">Ext.Class</a></div><div class='description'><div class='short'>Get the class of the provided object; returns null if it's not an instance\nof any class created with Ext.define. ...</div><div class='long'><p>Get the class of the provided object; returns null if it's not an instance\nof any class created with Ext.define.</p>\n\n<pre><code>var component = new Ext.Component();\n\nExt.ClassManager.getClass(component); // returns <a href=\"#!/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Ext.Component</a>\n</code></pre>\n\n<p><a href=\"#!/api/Ext-method-getClass\" rel=\"Ext-method-getClass\" class=\"docClass\">Ext.getClass</a> is alias for <a href=\"#!/api/Ext.ClassManager-method-getClass\" rel=\"Ext.ClassManager-method-getClass\" class=\"docClass\">Ext.ClassManager.getClass</a>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>object</span> : Object<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Ext.Class\" rel=\"Ext.Class\" class=\"docClass\">Ext.Class</a></span><div class='sub-desc'><p>class</p>\n</div></li></ul></div></div></div><div id='method-getDisplayName' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ClassManager'>Ext.ClassManager</span><br/><a href='source/ClassManager2.html#Ext-ClassManager-method-getDisplayName' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ClassManager-method-getDisplayName' class='name expandable'>getDisplayName</a>( <span class='pre'>Object object</span> ) : String</div><div class='description'><div class='short'>Returns the displayName property or className or object. ...</div><div class='long'><p>Returns the displayName property or className or object.\nWhen all else fails, returns \"Anonymous\".</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>object</span> : Object<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getName' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ClassManager'>Ext.ClassManager</span><br/><a href='source/ClassManager2.html#Ext-ClassManager-method-getName' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ClassManager-method-getName' class='name expandable'>getName</a>( <span class='pre'><a href=\"#!/api/Ext.Class\" rel=\"Ext.Class\" class=\"docClass\">Ext.Class</a>/Object object</span> ) : String</div><div class='description'><div class='short'>Get the name of the class by its reference or its instance. ...</div><div class='long'><p>Get the name of the class by its reference or its instance.</p>\n\n<pre><code>Ext.ClassManager.getName(Ext.Action); // returns \"Ext.Action\"\n</code></pre>\n\n<p><a href=\"#!/api/Ext-method-getClassName\" rel=\"Ext-method-getClassName\" class=\"docClass\">Ext.getClassName</a> is alias for <a href=\"#!/api/Ext.ClassManager-method-getName\" rel=\"Ext.ClassManager-method-getName\" class=\"docClass\">Ext.ClassManager.getName</a>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>object</span> : <a href=\"#!/api/Ext.Class\" rel=\"Ext.Class\" class=\"docClass\">Ext.Class</a>/Object<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'><p>className</p>\n</div></li></ul></div></div></div><div id='method-getNameByAlias' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ClassManager'>Ext.ClassManager</span><br/><a href='source/ClassManager2.html#Ext-ClassManager-method-getNameByAlias' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ClassManager-method-getNameByAlias' class='name expandable'>getNameByAlias</a>( <span class='pre'>String alias</span> ) : String</div><div class='description'><div class='short'>Get the name of a class by its alias. ...</div><div class='long'><p>Get the name of a class by its alias.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>alias</span> : String<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'><p>className</p>\n</div></li></ul></div></div></div><div id='method-getNameByAlternate' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ClassManager'>Ext.ClassManager</span><br/><a href='source/ClassManager2.html#Ext-ClassManager-method-getNameByAlternate' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ClassManager-method-getNameByAlternate' class='name expandable'>getNameByAlternate</a>( <span class='pre'>String alternate</span> ) : String</div><div class='description'><div class='short'>Get the name of a class by its alternate name. ...</div><div class='long'><p>Get the name of a class by its alternate name.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>alternate</span> : String<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'><p>className</p>\n</div></li></ul></div></div></div><div id='method-getNamesByExpression' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ClassManager'>Ext.ClassManager</span><br/><a href='source/ClassManager2.html#Ext-ClassManager-method-getNamesByExpression' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ClassManager-method-getNamesByExpression' class='name expandable'>getNamesByExpression</a>( <span class='pre'>String expression</span> ) : String[]</div><div class='description'><div class='short'>Converts a string expression to an array of matching class names. ...</div><div class='long'><p>Converts a string expression to an array of matching class names. An expression can either refers to class aliases\nor class names. Expressions support wildcards:</p>\n\n<pre><code>// returns ['Ext.window.Window']\nvar window = Ext.ClassManager.getNamesByExpression('widget.window');\n\n// returns ['widget.panel', 'widget.window', ...]\nvar allWidgets = Ext.ClassManager.getNamesByExpression('widget.*');\n\n// returns ['Ext.data.Store', 'Ext.data.ArrayProxy', ...]\nvar allData = Ext.ClassManager.getNamesByExpression('Ext.data.*');\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>expression</span> : String<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String[]</span><div class='sub-desc'><p>classNames</p>\n</div></li></ul></div></div></div><div id='method-instantiate' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ClassManager'>Ext.ClassManager</span><br/><a href='source/ClassManager2.html#Ext-ClassManager-method-instantiate' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ClassManager-method-instantiate' class='name expandable'>instantiate</a>( <span class='pre'>String name, Object... args</span> ) : Object</div><div class='description'><div class='short'>Instantiate a class by either full name, alias or alternate name. ...</div><div class='long'><p>Instantiate a class by either full name, alias or alternate name.</p>\n\n<p>If <a href=\"#!/api/Ext.Loader\" rel=\"Ext.Loader\" class=\"docClass\">Ext.Loader</a> is <a href=\"#!/api/Ext.Loader-method-setConfig\" rel=\"Ext.Loader-method-setConfig\" class=\"docClass\">enabled</a> and the class has not been defined yet, it will\nattempt to load the class via synchronous loading.</p>\n\n<p>For example, all these three lines return the same result:</p>\n\n<pre><code>// alias\nvar window = Ext.ClassManager.instantiate('widget.window', { width: 600, height: 800, ... });\n\n// alternate name\nvar window = Ext.ClassManager.instantiate('Ext.Window', { width: 600, height: 800, ... });\n\n// full class name\nvar window = Ext.ClassManager.instantiate('Ext.window.Window', { width: 600, height: 800, ... });\n</code></pre>\n\n<p><a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a> is alias for <a href=\"#!/api/Ext.ClassManager-method-instantiate\" rel=\"Ext.ClassManager-method-instantiate\" class=\"docClass\">Ext.ClassManager.instantiate</a>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : String<div class='sub-desc'>\n</div></li><li><span class='pre'>args</span> : Object...<div class='sub-desc'><p>Additional arguments after the name will be passed to the class' constructor.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>instance</p>\n</div></li></ul></div></div></div><div id='method-instantiateByAlias' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ClassManager'>Ext.ClassManager</span><br/><a href='source/ClassManager2.html#Ext-ClassManager-method-instantiateByAlias' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ClassManager-method-instantiateByAlias' class='name expandable'>instantiateByAlias</a>( <span class='pre'>String alias, Object... args</span> ) : Object</div><div class='description'><div class='short'>Instantiate a class by its alias. ...</div><div class='long'><p>Instantiate a class by its alias.</p>\n\n<p>If <a href=\"#!/api/Ext.Loader\" rel=\"Ext.Loader\" class=\"docClass\">Ext.Loader</a> is <a href=\"#!/api/Ext.Loader-method-setConfig\" rel=\"Ext.Loader-method-setConfig\" class=\"docClass\">enabled</a> and the class has not been defined yet, it will\nattempt to load the class via synchronous loading.</p>\n\n<pre><code>var window = Ext.ClassManager.instantiateByAlias('widget.window', { width: 600, height: 800, ... });\n</code></pre>\n\n<p><a href=\"#!/api/Ext-method-createByAlias\" rel=\"Ext-method-createByAlias\" class=\"docClass\">Ext.createByAlias</a> is alias for <a href=\"#!/api/Ext.ClassManager-method-instantiateByAlias\" rel=\"Ext.ClassManager-method-instantiateByAlias\" class=\"docClass\">Ext.ClassManager.instantiateByAlias</a>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>alias</span> : String<div class='sub-desc'>\n</div></li><li><span class='pre'>args</span> : Object...<div class='sub-desc'><p>Additional arguments after the alias will be passed to the\nclass constructor.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>instance</p>\n</div></li></ul></div></div></div><div id='method-isCreated' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ClassManager'>Ext.ClassManager</span><br/><a href='source/ClassManager2.html#Ext-ClassManager-method-isCreated' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ClassManager-method-isCreated' class='name expandable'>isCreated</a>( <span class='pre'>String className</span> ) : Boolean</div><div class='description'><div class='short'>Checks if a class has already been created. ...</div><div class='long'><p>Checks if a class has already been created.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>className</span> : String<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'><p>exist</p>\n</div></li></ul></div></div></div><div id='method-registerPostprocessor' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ClassManager'>Ext.ClassManager</span><br/><a href='source/ClassManager2.html#Ext-ClassManager-method-registerPostprocessor' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ClassManager-method-registerPostprocessor' class='name expandable'>registerPostprocessor</a>( <span class='pre'>String name, Function postprocessor</span> )</div><div class='description'><div class='short'>Register a post-processor function. ...</div><div class='long'><p>Register a post-processor function.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : String<div class='sub-desc'>\n</div></li><li><span class='pre'>postprocessor</span> : Function<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-set' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ClassManager'>Ext.ClassManager</span><br/><a href='source/ClassManager2.html#Ext-ClassManager-method-set' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ClassManager-method-set' class='name expandable'>set</a>( <span class='pre'>String name, Object value</span> ) : <a href=\"#!/api/Ext.ClassManager\" rel=\"Ext.ClassManager\" class=\"docClass\">Ext.ClassManager</a></div><div class='description'><div class='short'>Sets a name reference to a class. ...</div><div class='long'><p>Sets a name reference to a class.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : String<div class='sub-desc'>\n</div></li><li><span class='pre'>value</span> : Object<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Ext.ClassManager\" rel=\"Ext.ClassManager\" class=\"docClass\">Ext.ClassManager</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-setAlias' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ClassManager'>Ext.ClassManager</span><br/><a href='source/ClassManager2.html#Ext-ClassManager-method-setAlias' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ClassManager-method-setAlias' class='name expandable'>setAlias</a>( <span class='pre'><a href=\"#!/api/Ext.Class\" rel=\"Ext.Class\" class=\"docClass\">Ext.Class</a>/String cls, String alias</span> )</div><div class='description'><div class='short'>Register the alias for a class. ...</div><div class='long'><p>Register the alias for a class.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>cls</span> : <a href=\"#!/api/Ext.Class\" rel=\"Ext.Class\" class=\"docClass\">Ext.Class</a>/String<div class='sub-desc'><p>a reference to a class or a className</p>\n</div></li><li><span class='pre'>alias</span> : String<div class='sub-desc'><p>Alias to use when referring to this class</p>\n</div></li></ul></div></div></div><div id='method-setDefaultPostprocessorPosition' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ClassManager'>Ext.ClassManager</span><br/><a href='source/ClassManager2.html#Ext-ClassManager-method-setDefaultPostprocessorPosition' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ClassManager-method-setDefaultPostprocessorPosition' class='name expandable'>setDefaultPostprocessorPosition</a>( <span class='pre'>String name, String offset, String relativeName</span> ) : <a href=\"#!/api/Ext.ClassManager\" rel=\"Ext.ClassManager\" class=\"docClass\">Ext.ClassManager</a></div><div class='description'><div class='short'>Insert this post-processor at a specific position in the stack, optionally relative to\nany existing post-processor ...</div><div class='long'><p>Insert this post-processor at a specific position in the stack, optionally relative to\nany existing post-processor</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : String<div class='sub-desc'><p>The post-processor name. Note that it needs to be registered with\n<a href=\"#!/api/Ext.ClassManager-method-registerPostprocessor\" rel=\"Ext.ClassManager-method-registerPostprocessor\" class=\"docClass\">registerPostprocessor</a> before this</p>\n</div></li><li><span class='pre'>offset</span> : String<div class='sub-desc'><p>The insertion position. Four possible values are:\n'first', 'last', or: 'before', 'after' (relative to the name provided in the third argument)</p>\n</div></li><li><span class='pre'>relativeName</span> : String<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Ext.ClassManager\" rel=\"Ext.ClassManager\" class=\"docClass\">Ext.ClassManager</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-setDefaultPostprocessors' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ClassManager'>Ext.ClassManager</span><br/><a href='source/ClassManager2.html#Ext-ClassManager-method-setDefaultPostprocessors' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ClassManager-method-setDefaultPostprocessors' class='name expandable'>setDefaultPostprocessors</a>( <span class='pre'>String/String[] The</span> ) : <a href=\"#!/api/Ext.ClassManager\" rel=\"Ext.ClassManager\" class=\"docClass\">Ext.ClassManager</a></div><div class='description'><div class='short'>Set the default post processors array stack which are applied to every class. ...</div><div class='long'><p>Set the default post processors array stack which are applied to every class.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>The</span> : String/String[]<div class='sub-desc'><p>name of a registered post processor or an array of registered names.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Ext.ClassManager\" rel=\"Ext.ClassManager\" class=\"docClass\">Ext.ClassManager</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-setNamespace' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ClassManager'>Ext.ClassManager</span><br/><a href='source/ClassManager2.html#Ext-ClassManager-method-setNamespace' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ClassManager-method-setNamespace' class='name expandable'>setNamespace</a>( <span class='pre'>String name, Object value</span> )</div><div class='description'><div class='short'>Creates a namespace and assign the value to the created object\n\nExt.ClassManager.setNamespace('MyCompany.pkg.Example'...</div><div class='long'><p>Creates a namespace and assign the <code>value</code> to the created object</p>\n\n<pre><code>Ext.ClassManager.setNamespace('MyCompany.pkg.Example', someObject);\n\nalert(MyCompany.pkg.Example === someObject); // alerts true\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : String<div class='sub-desc'>\n</div></li><li><span class='pre'>value</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>","mixedInto":[],"meta":{"author":["Jacky Nguyen <jacky@sencha.com>"],"docauthor":["Jacky Nguyen <jacky@sencha.com>"]},"inheritdoc":null,"inheritable":false,"static":false,"protected":false,"allMixins":[],"subclasses":[],"extends":null,"uses":[],"code_type":"nop","private":false,"statics":{"method":[],"property":[],"css_var":[],"css_mixin":[],"cfg":[],"event":[]},"superclasses":[],"name":"Ext.ClassManager","alternateClassNames":[],"files":[{"href":"ClassManager2.html#Ext-ClassManager","filename":"ClassManager.js"}],"tagname":"class","singleton":true,"id":"class-Ext.ClassManager","deprecated":null});