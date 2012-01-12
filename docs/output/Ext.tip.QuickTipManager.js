Ext.data.JsonP.Ext_tip_QuickTipManager({"mixins":[],"component":false,"aliases":{},"requires":[],"members":{"method":[{"required":null,"static":false,"protected":true,"owner":"Ext.Base","name":"callOverridden","id":"method-callOverridden","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":true,"owner":"Ext.Base","name":"callParent","id":"method-callParent","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.tip.QuickTipManager","name":"destroy","id":"method-destroy","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.tip.QuickTipManager","name":"disable","id":"method-disable","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.tip.QuickTipManager","name":"enable","id":"method-enable","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.tip.QuickTipManager","name":"getQuickTip","id":"method-getQuickTip","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.tip.QuickTipManager","name":"init","id":"method-init","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":true,"owner":"Ext.Base","name":"initConfig","id":"method-initConfig","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.tip.QuickTipManager","name":"isEnabled","id":"method-isEnabled","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.tip.QuickTipManager","name":"register","id":"method-register","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":true,"owner":"Ext.Base","name":"statics","id":"method-statics","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.tip.QuickTipManager","name":"tips","id":"method-tips","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.tip.QuickTipManager","name":"unregister","id":"method-unregister","template":false,"tagname":"method","deprecated":null}],"property":[{"required":null,"static":false,"protected":true,"owner":"Ext.Base","name":"self","id":"property-self","template":null,"tagname":"property","deprecated":null}],"css_var":[],"css_mixin":[],"cfg":[],"event":[]},"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/Ext.Base' rel='Ext.Base' class='docClass'>Ext.Base</a><div class='subclass '><strong>Ext.tip.QuickTipManager</strong></div></div><h4>Files</h4><div class='dependency'><a href='source/QuickTipManager.html#Ext-tip-QuickTipManager' target='_blank'>QuickTipManager.js</a></div></pre><div class='doc-contents'><p>Provides attractive and customizable tooltips for any element. The QuickTips\nsingleton is used to configure and manage tooltips globally for multiple elements\nin a generic manner.  To create individual tooltips with maximum customizability,\nyou should consider either <a href=\"#!/api/Ext.tip.Tip\" rel=\"Ext.tip.Tip\" class=\"docClass\">Ext.tip.Tip</a> or <a href=\"#!/api/Ext.tip.ToolTip\" rel=\"Ext.tip.ToolTip\" class=\"docClass\">Ext.tip.ToolTip</a>.</p>\n\n<p>Quicktips can be configured via tag attributes directly in markup, or by\nregistering quick tips programmatically via the <a href=\"#!/api/Ext.tip.QuickTipManager-method-register\" rel=\"Ext.tip.QuickTipManager-method-register\" class=\"docClass\">register</a> method.</p>\n\n<p>The singleton's instance of <a href=\"#!/api/Ext.tip.QuickTip\" rel=\"Ext.tip.QuickTip\" class=\"docClass\">Ext.tip.QuickTip</a> is available via\n<a href=\"#!/api/Ext.tip.QuickTipManager-method-getQuickTip\" rel=\"Ext.tip.QuickTipManager-method-getQuickTip\" class=\"docClass\">getQuickTip</a>, and supports all the methods, and all the all the\nconfiguration properties of <a href=\"#!/api/Ext.tip.QuickTip\" rel=\"Ext.tip.QuickTip\" class=\"docClass\">Ext.tip.QuickTip</a>. These settings will apply to all\ntooltips shown by the singleton.</p>\n\n<p>Below is the summary of the configuration properties which can be used.\nFor detailed descriptions see the config options for the <a href=\"#!/api/Ext.tip.QuickTip\" rel=\"Ext.tip.QuickTip\" class=\"docClass\">QuickTip</a> class</p>\n\n<h2>QuickTips singleton configs (all are optional)</h2>\n\n<ul>\n<li><code>dismissDelay</code></li>\n<li><code>hideDelay</code></li>\n<li><code>maxWidth</code></li>\n<li><code>minWidth</code></li>\n<li><code>showDelay</code></li>\n<li><code>trackMouse</code></li>\n</ul>\n\n\n<h2>Target element configs (optional unless otherwise noted)</h2>\n\n<ul>\n<li><code>autoHide</code></li>\n<li><code>cls</code></li>\n<li><code>dismissDelay</code> (overrides singleton value)</li>\n<li><code>target</code> (required)</li>\n<li><code>text</code> (required)</li>\n<li><code>title</code></li>\n<li><code>width</code></li>\n</ul>\n\n\n<p>Here is an example showing how some of these config options could be used:</p>\n\n<pre class='inline-example '><code>// Init the singleton.  Any tag-based quick tips will start working.\nExt.tip.QuickTipManager.init();\n\n// Apply a set of config properties to the singleton\nExt.apply(Ext.tip.QuickTipManager.getQuickTip(), {\n    maxWidth: 200,\n    minWidth: 100,\n    showDelay: 50      // Show 50ms after entering target\n});\n\n// Create a small panel to add a quick tip to\nExt.create('Ext.container.Container', {\n    id: 'quickTipContainer',\n    width: 200,\n    height: 150,\n    style: {\n        backgroundColor:'#000000'\n    },\n    renderTo: Ext.getBody()\n});\n\n\n// Manually register a quick tip for a specific element\nExt.tip.QuickTipManager.register({\n    target: 'quickTipContainer',\n    title: 'My Tooltip',\n    text: 'This tooltip was added in code',\n    width: 100,\n    dismissDelay: 10000 // Hide after 10 seconds hover\n});\n</code></pre>\n\n<p>To register a quick tip in markup, you simply add one or more of the valid QuickTip attributes prefixed with\nthe <strong>data-</strong> namespace.  The HTML element itself is automatically set as the quick tip target. Here is the summary\nof supported attributes (optional unless otherwise noted):</p>\n\n<ul>\n<li><code>hide</code>: Specifying \"user\" is equivalent to setting autoHide = false.  Any other value will be the same as autoHide = true.</li>\n<li><code>qclass</code>: A CSS class to be applied to the quick tip (equivalent to the 'cls' target element config).</li>\n<li><code>qtip (required)</code>: The quick tip text (equivalent to the 'text' target element config).</li>\n<li><code>qtitle</code>: The quick tip title (equivalent to the 'title' target element config).</li>\n<li><code>qwidth</code>: The quick tip width (equivalent to the 'width' target element config).</li>\n</ul>\n\n\n<p>Here is an example of configuring an HTML element to display a tooltip from markup:</p>\n\n<pre><code>// Add a quick tip to an HTML button\n&lt;input type=\"button\" value=\"OK\" data-qtitle=\"OK Button\" data-qwidth=\"100\"\n     data-qtip=\"This is a quick tip from markup!\"&gt;&lt;/input&gt;\n</code></pre>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-self' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.Base' rel='Ext.Base' class='defined-in docClass'>Ext.Base</a><br/><a href='source/Base3.html#Ext-Base-property-self' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Base-property-self' class='name expandable'>self</a><span> : <a href=\"#!/api/Ext.Class\" rel=\"Ext.Class\" class=\"docClass\">Ext.Class</a></span><strong class='protected signature'>protected</strong></div><div class='description'><div class='short'>Get the reference to the current class from which this object was instantiated. ...</div><div class='long'><p>Get the reference to the current class from which this object was instantiated. Unlike <a href=\"#!/api/Ext.Base-method-statics\" rel=\"Ext.Base-method-statics\" class=\"docClass\">statics</a>,\n<code>this.self</code> is scope-dependent and it's meant to be used for dynamic inheritance. See <a href=\"#!/api/Ext.Base-method-statics\" rel=\"Ext.Base-method-statics\" class=\"docClass\">statics</a>\nfor a detailed comparison</p>\n\n<pre><code>Ext.define('My.Cat', {\n    statics: {\n        speciesName: 'Cat' // My.Cat.speciesName = 'Cat'\n    },\n\n    constructor: function() {\n        alert(this.self.speciesName); / dependent on 'this'\n\n        return this;\n    },\n\n    clone: function() {\n        return new this.self();\n    }\n});\n\n\nExt.define('My.SnowLeopard', {\n    extend: 'My.Cat',\n    statics: {\n        speciesName: 'Snow Leopard'         // My.SnowLeopard.speciesName = 'Snow Leopard'\n    }\n});\n\nvar cat = new My.Cat();                     // alerts 'Cat'\nvar snowLeopard = new My.SnowLeopard();     // alerts 'Snow Leopard'\n\nvar clone = snowLeopard.clone();\nalert(Ext.getClassName(clone));             // alerts 'My.SnowLeopard'\n</code></pre>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-callOverridden' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.Base' rel='Ext.Base' class='defined-in docClass'>Ext.Base</a><br/><a href='source/Base3.html#Ext-Base-method-callOverridden' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Base-method-callOverridden' class='name expandable'>callOverridden</a>( <span class='pre'>Array/Arguments args</span> ) : Object<strong class='protected signature'>protected</strong></div><div class='description'><div class='short'>Call the original method that was previously overridden with override\n\nExt.define('My.Cat', {\n    constructor: functi...</div><div class='long'><p>Call the original method that was previously overridden with <a href=\"#!/api/Ext.Base-static-method-override\" rel=\"Ext.Base-static-method-override\" class=\"docClass\">override</a></p>\n\n<pre><code>Ext.define('My.Cat', {\n    constructor: function() {\n        alert(\"I'm a cat!\");\n\n        return this;\n    }\n});\n\nMy.Cat.override({\n    constructor: function() {\n        alert(\"I'm going to be a cat!\");\n\n        var instance = this.callOverridden();\n\n        alert(\"Meeeeoooowwww\");\n\n        return instance;\n    }\n});\n\nvar kitty = new My.Cat(); // alerts \"I'm going to be a cat!\"\n                          // alerts \"I'm a cat!\"\n                          // alerts \"Meeeeoooowwww\"\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>args</span> : Array/Arguments<div class='sub-desc'><p>The arguments, either an array or the <code>arguments</code> object</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>Returns the result after calling the overridden method</p>\n</div></li></ul></div></div></div><div id='method-callParent' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.Base' rel='Ext.Base' class='defined-in docClass'>Ext.Base</a><br/><a href='source/Base3.html#Ext-Base-method-callParent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Base-method-callParent' class='name expandable'>callParent</a>( <span class='pre'>Array/Arguments args</span> ) : Object<strong class='protected signature'>protected</strong></div><div class='description'><div class='short'>Call the parent's overridden method. ...</div><div class='long'><p>Call the parent's overridden method. For example:</p>\n\n<pre><code>Ext.define('My.own.A', {\n    constructor: function(test) {\n        alert(test);\n    }\n});\n\nExt.define('My.own.B', {\n    extend: 'My.own.A',\n\n    constructor: function(test) {\n        alert(test);\n\n        this.callParent([test + 1]);\n    }\n});\n\nExt.define('My.own.C', {\n    extend: 'My.own.B',\n\n    constructor: function() {\n        alert(\"Going to call parent's overriden constructor...\");\n\n        this.callParent(arguments);\n    }\n});\n\nvar a = new My.own.A(1); // alerts '1'\nvar b = new My.own.B(1); // alerts '1', then alerts '2'\nvar c = new My.own.C(2); // alerts \"Going to call parent's overriden constructor...\"\n                         // alerts '2', then alerts '3'\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>args</span> : Array/Arguments<div class='sub-desc'><p>The arguments, either an array or the <code>arguments</code> object\nfrom the current method, for example: <code>this.callParent(arguments)</code></p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>Returns the result from the superclass' method</p>\n</div></li></ul></div></div></div><div id='method-destroy' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.tip.QuickTipManager'>Ext.tip.QuickTipManager</span><br/><a href='source/QuickTipManager.html#Ext-tip-QuickTipManager-method-destroy' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.tip.QuickTipManager-method-destroy' class='name expandable'>destroy</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Destroy the QuickTips instance. ...</div><div class='long'><p>Destroy the QuickTips instance.</p>\n</div></div></div><div id='method-disable' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.tip.QuickTipManager'>Ext.tip.QuickTipManager</span><br/><a href='source/QuickTipManager.html#Ext-tip-QuickTipManager-method-disable' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.tip.QuickTipManager-method-disable' class='name expandable'>disable</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Disable quick tips globally. ...</div><div class='long'><p>Disable quick tips globally.</p>\n</div></div></div><div id='method-enable' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.tip.QuickTipManager'>Ext.tip.QuickTipManager</span><br/><a href='source/QuickTipManager.html#Ext-tip-QuickTipManager-method-enable' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.tip.QuickTipManager-method-enable' class='name expandable'>enable</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Enable quick tips globally. ...</div><div class='long'><p>Enable quick tips globally.</p>\n</div></div></div><div id='method-getQuickTip' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.tip.QuickTipManager'>Ext.tip.QuickTipManager</span><br/><a href='source/QuickTipManager.html#Ext-tip-QuickTipManager-method-getQuickTip' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.tip.QuickTipManager-method-getQuickTip' class='name expandable'>getQuickTip</a>( <span class='pre'></span> ) : <a href=\"#!/api/Ext.tip.QuickTip\" rel=\"Ext.tip.QuickTip\" class=\"docClass\">Ext.tip.QuickTip</a></div><div class='description'><div class='short'>Gets the single QuickTip instance used to show tips from all registered elements. ...</div><div class='long'><p>Gets the single <a href=\"#!/api/Ext.tip.QuickTip\" rel=\"Ext.tip.QuickTip\" class=\"docClass\">QuickTip</a> instance used to show tips from all registered elements.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Ext.tip.QuickTip\" rel=\"Ext.tip.QuickTip\" class=\"docClass\">Ext.tip.QuickTip</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-init' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.tip.QuickTipManager'>Ext.tip.QuickTipManager</span><br/><a href='source/QuickTipManager.html#Ext-tip-QuickTipManager-method-init' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.tip.QuickTipManager-method-init' class='name expandable'>init</a>( <span class='pre'>[Boolean autoRender], [Object config]</span> )</div><div class='description'><div class='short'>Initialize the global QuickTips instance and prepare any quick tips. ...</div><div class='long'><p>Initialize the global QuickTips instance and prepare any quick tips.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>autoRender</span> : Boolean (optional)<div class='sub-desc'><p>True to render the QuickTips container immediately to\npreload images. (Defaults to true)</p>\n</div></li><li><span class='pre'>config</span> : Object (optional)<div class='sub-desc'><p>config object for the created QuickTip. By\ndefault, the <a href=\"#!/api/Ext.tip.QuickTip\" rel=\"Ext.tip.QuickTip\" class=\"docClass\">QuickTip</a> class is instantiated, but this can\nbe changed by supplying an xtype property or a className property in this object.\nAll other properties on this object are configuration for the created component.</p>\n</div></li></ul></div></div></div><div id='method-initConfig' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.Base' rel='Ext.Base' class='defined-in docClass'>Ext.Base</a><br/><a href='source/Base3.html#Ext-Base-method-initConfig' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Base-method-initConfig' class='name expandable'>initConfig</a>( <span class='pre'>Object config</span> ) : Object<strong class='protected signature'>protected</strong></div><div class='description'><div class='short'>Initialize configuration for this class. ...</div><div class='long'><p>Initialize configuration for this class. a typical example:</p>\n\n<pre><code>Ext.define('My.awesome.Class', {\n    // The default config\n    config: {\n        name: 'Awesome',\n        isAwesome: true\n    },\n\n    constructor: function(config) {\n        this.initConfig(config);\n\n        return this;\n    }\n});\n\nvar awesome = new My.awesome.Class({\n    name: 'Super Awesome'\n});\n\nalert(awesome.getName()); // 'Super Awesome'\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : Object<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>mixins The mixin prototypes as key - value pairs</p>\n</div></li></ul></div></div></div><div id='method-isEnabled' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.tip.QuickTipManager'>Ext.tip.QuickTipManager</span><br/><a href='source/QuickTipManager.html#Ext-tip-QuickTipManager-method-isEnabled' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.tip.QuickTipManager-method-isEnabled' class='name expandable'>isEnabled</a>( <span class='pre'></span> ) : Boolean</div><div class='description'><div class='short'>Returns true if quick tips are enabled, else false. ...</div><div class='long'><p>Returns true if quick tips are enabled, else false.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-register' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.tip.QuickTipManager'>Ext.tip.QuickTipManager</span><br/><a href='source/QuickTipManager.html#Ext-tip-QuickTipManager-method-register' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.tip.QuickTipManager-method-register' class='name expandable'>register</a>( <span class='pre'>Object config</span> )</div><div class='description'><div class='short'>Configures a new quick tip instance and assigns it to a target element. ...</div><div class='long'><p>Configures a new quick tip instance and assigns it to a target element.  See\n<a href=\"#!/api/Ext.tip.QuickTip-method-register\" rel=\"Ext.tip.QuickTip-method-register\" class=\"docClass\">Ext.tip.QuickTip.register</a> for details.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : Object<div class='sub-desc'><p>The config object</p>\n</div></li></ul></div></div></div><div id='method-statics' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.Base' rel='Ext.Base' class='defined-in docClass'>Ext.Base</a><br/><a href='source/Base3.html#Ext-Base-method-statics' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Base-method-statics' class='name expandable'>statics</a>( <span class='pre'></span> ) : <a href=\"#!/api/Ext.Class\" rel=\"Ext.Class\" class=\"docClass\">Ext.Class</a><strong class='protected signature'>protected</strong></div><div class='description'><div class='short'>Get the reference to the class from which this object was instantiated. ...</div><div class='long'><p>Get the reference to the class from which this object was instantiated. Note that unlike <a href=\"#!/api/Ext.Base-property-self\" rel=\"Ext.Base-property-self\" class=\"docClass\">self</a>,\n<code>this.statics()</code> is scope-independent and it always returns the class from which it was called, regardless of what\n<code>this</code> points to during run-time</p>\n\n<pre><code>Ext.define('My.Cat', {\n    statics: {\n        totalCreated: 0,\n        speciesName: 'Cat' // My.Cat.speciesName = 'Cat'\n    },\n\n    constructor: function() {\n        var statics = this.statics();\n\n        alert(statics.speciesName);     // always equals to 'Cat' no matter what 'this' refers to\n                                        // equivalent to: My.Cat.speciesName\n\n        alert(this.self.speciesName);   // dependent on 'this'\n\n        statics.totalCreated++;\n\n        return this;\n    },\n\n    clone: function() {\n        var cloned = new this.self;                      // dependent on 'this'\n\n        cloned.groupName = this.statics().speciesName;   // equivalent to: My.Cat.speciesName\n\n        return cloned;\n    }\n});\n\n\nExt.define('My.SnowLeopard', {\n    extend: 'My.Cat',\n\n    statics: {\n        speciesName: 'Snow Leopard'     // My.SnowLeopard.speciesName = 'Snow Leopard'\n    },\n\n    constructor: function() {\n        this.callParent();\n    }\n});\n\nvar cat = new My.Cat();                 // alerts 'Cat', then alerts 'Cat'\n\nvar snowLeopard = new My.SnowLeopard(); // alerts 'Cat', then alerts 'Snow Leopard'\n\nvar clone = snowLeopard.clone();\nalert(Ext.getClassName(clone));         // alerts 'My.SnowLeopard'\nalert(clone.groupName);                 // alerts 'Cat'\n\nalert(My.Cat.totalCreated);             // alerts 3\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Ext.Class\" rel=\"Ext.Class\" class=\"docClass\">Ext.Class</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-tips' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.tip.QuickTipManager'>Ext.tip.QuickTipManager</span><br/><a href='source/QuickTipManager.html#Ext-tip-QuickTipManager-method-tips' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.tip.QuickTipManager-method-tips' class='name expandable'>tips</a>( <span class='pre'>Object config</span> )</div><div class='description'><div class='short'>Alias of register. ...</div><div class='long'><p>Alias of <a href=\"#!/api/Ext.tip.QuickTipManager-method-register\" rel=\"Ext.tip.QuickTipManager-method-register\" class=\"docClass\">register</a>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : Object<div class='sub-desc'><p>The config object</p>\n</div></li></ul></div></div></div><div id='method-unregister' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.tip.QuickTipManager'>Ext.tip.QuickTipManager</span><br/><a href='source/QuickTipManager.html#Ext-tip-QuickTipManager-method-unregister' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.tip.QuickTipManager-method-unregister' class='name expandable'>unregister</a>( <span class='pre'>String/HTMLElement/<a href=\"#!/api/Ext.Element\" rel=\"Ext.Element\" class=\"docClass\">Ext.Element</a> el</span> )</div><div class='description'><div class='short'>Removes any registered quick tip from the target element and destroys it. ...</div><div class='long'><p>Removes any registered quick tip from the target element and destroys it.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>el</span> : String/HTMLElement/<a href=\"#!/api/Ext.Element\" rel=\"Ext.Element\" class=\"docClass\">Ext.Element</a><div class='sub-desc'><p>The element from which the quick tip is to be removed or ID of the element.</p>\n</div></li></ul></div></div></div></div></div></div></div>","mixedInto":[],"meta":{},"inheritdoc":null,"inheritable":false,"static":false,"protected":false,"allMixins":[],"subclasses":[],"extends":"Ext.Base","uses":[],"code_type":"ext_define","private":false,"statics":{"method":[],"property":[],"css_var":[],"css_mixin":[],"cfg":[],"event":[]},"superclasses":["Ext.Base","Ext.tip.QuickTipManager"],"name":"Ext.tip.QuickTipManager","alternateClassNames":[],"files":[{"href":"QuickTipManager.html#Ext-tip-QuickTipManager","filename":"QuickTipManager.js"}],"tagname":"class","singleton":true,"id":"class-Ext.tip.QuickTipManager","deprecated":null});