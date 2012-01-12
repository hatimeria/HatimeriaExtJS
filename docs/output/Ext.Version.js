Ext.data.JsonP.Ext_Version({"mixins":[],"component":false,"aliases":{},"requires":[],"members":{"method":[{"required":null,"static":false,"protected":false,"owner":"Ext.Version","name":"constructor","id":"method-constructor","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.Version","name":"deprecate","id":"method-deprecate","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.Version","name":"equals","id":"method-equals","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.Version","name":"getBuild","id":"method-getBuild","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.Version","name":"getMajor","id":"method-getMajor","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.Version","name":"getMinor","id":"method-getMinor","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.Version","name":"getPatch","id":"method-getPatch","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.Version","name":"getRelease","id":"method-getRelease","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.Version","name":"getShortVersion","id":"method-getShortVersion","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.Version","name":"getVersion","id":"method-getVersion","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.Version","name":"isGreaterThan","id":"method-isGreaterThan","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.Version","name":"isLessThan","id":"method-isLessThan","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.Version","name":"match","id":"method-match","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.Version","name":"setVersion","id":"method-setVersion","template":false,"tagname":"method","deprecated":null},{"required":null,"static":false,"protected":false,"owner":"Ext.Version","name":"toArray","id":"method-toArray","template":false,"tagname":"method","deprecated":null}],"property":[],"css_var":[],"css_mixin":[],"cfg":[],"event":[]},"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/Version2.html#Ext-Version' target='_blank'>Version.js</a></div></pre><div class='doc-contents'><p>A utility class that wrap around a string version number and provide convenient\nmethod to perform comparison. See also: <a href=\"#!/api/Ext.Version-static-method-compare\" rel=\"Ext.Version-static-method-compare\" class=\"docClass\">compare</a>. Example:</p>\n\n<pre><code>var version = new Ext.Version('1.0.2beta');\nconsole.log(\"Version is \" + version); // Version is 1.0.2beta\n\nconsole.log(version.getMajor()); // 1\nconsole.log(version.getMinor()); // 0\nconsole.log(version.getPatch()); // 2\nconsole.log(version.getBuild()); // 0\nconsole.log(version.getRelease()); // beta\n\nconsole.log(version.isGreaterThan('1.0.1')); // True\nconsole.log(version.isGreaterThan('1.0.2alpha')); // True\nconsole.log(version.isGreaterThan('1.0.2RC')); // False\nconsole.log(version.isGreaterThan('1.0.2')); // False\nconsole.log(version.isLessThan('1.0.2')); // True\n\nconsole.log(version.match(1.0)); // True\nconsole.log(version.match('1.0.2')); // True\n</code></pre>\n</div><div class='members'><div class='members-section'><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Instance Methods</h3><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Version'>Ext.Version</span><br/><a href='source/Version2.html#Ext-Version-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/Ext.Version-method-constructor' class='name expandable'>Ext.Version</a>( <span class='pre'>String/Number version</span> ) : <a href=\"#!/api/Ext.Version\" rel=\"Ext.Version\" class=\"docClass\">Ext.Version</a></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>version</span> : String/Number<div class='sub-desc'><p>The version number in the follow standard format: major[.minor[.patch[.build[release]]]]\nExamples: 1.0 or 1.2.3beta or 1.2.3.4RC</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Ext.Version\" rel=\"Ext.Version\" class=\"docClass\">Ext.Version</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-deprecate' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Version'>Ext.Version</span><br/><a href='source/Version2.html#Ext-Version-method-deprecate' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Version-method-deprecate' class='name expandable'>deprecate</a>( <span class='pre'>String packageName, String since, Function closure, Object scope</span> )</div><div class='description'><div class='short'>Create a closure for deprecated code. ...</div><div class='long'><p>Create a closure for deprecated code.</p>\n\n<pre><code>// This means Ext.oldMethod is only supported in 4.0.0beta and older.\n// If Ext.getVersion('extjs') returns a version that is later than '4.0.0beta', for example '4.0.0RC',\n// the closure will not be invoked\nExt.deprecate('extjs', '4.0.0beta', function() {\n    Ext.oldMethod = Ext.newMethod;\n\n    ...\n});\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>packageName</span> : String<div class='sub-desc'><p>The package name</p>\n</div></li><li><span class='pre'>since</span> : String<div class='sub-desc'><p>The last version before it's deprecated</p>\n</div></li><li><span class='pre'>closure</span> : Function<div class='sub-desc'><p>The callback function to be executed with the specified version is less than the current version</p>\n</div></li><li><span class='pre'>scope</span> : Object<div class='sub-desc'><p>The execution scope (<tt>this</tt>) if the closure</p>\n</div></li></ul></div></div></div><div id='method-equals' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Version'>Ext.Version</span><br/><a href='source/Version2.html#Ext-Version-method-equals' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Version-method-equals' class='name expandable'>equals</a>( <span class='pre'>String/Number target</span> ) : Boolean</div><div class='description'><div class='short'>Returns whether this version equals to the supplied argument ...</div><div class='long'><p>Returns whether this version equals to the supplied argument</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>target</span> : String/Number<div class='sub-desc'><p>The version to compare with</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'><p>True if this version equals to the target, false otherwise</p>\n</div></li></ul></div></div></div><div id='method-getBuild' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Version'>Ext.Version</span><br/><a href='source/Version2.html#Ext-Version-method-getBuild' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Version-method-getBuild' class='name expandable'>getBuild</a>( <span class='pre'></span> ) : Number</div><div class='description'><div class='short'>Returns the build component value ...</div><div class='long'><p>Returns the build component value</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Number</span><div class='sub-desc'><p>build</p>\n</div></li></ul></div></div></div><div id='method-getMajor' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Version'>Ext.Version</span><br/><a href='source/Version2.html#Ext-Version-method-getMajor' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Version-method-getMajor' class='name expandable'>getMajor</a>( <span class='pre'></span> ) : Number</div><div class='description'><div class='short'>Returns the major component value ...</div><div class='long'><p>Returns the major component value</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Number</span><div class='sub-desc'><p>major</p>\n</div></li></ul></div></div></div><div id='method-getMinor' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Version'>Ext.Version</span><br/><a href='source/Version2.html#Ext-Version-method-getMinor' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Version-method-getMinor' class='name expandable'>getMinor</a>( <span class='pre'></span> ) : Number</div><div class='description'><div class='short'>Returns the minor component value ...</div><div class='long'><p>Returns the minor component value</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Number</span><div class='sub-desc'><p>minor</p>\n</div></li></ul></div></div></div><div id='method-getPatch' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Version'>Ext.Version</span><br/><a href='source/Version2.html#Ext-Version-method-getPatch' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Version-method-getPatch' class='name expandable'>getPatch</a>( <span class='pre'></span> ) : Number</div><div class='description'><div class='short'>Returns the patch component value ...</div><div class='long'><p>Returns the patch component value</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Number</span><div class='sub-desc'><p>patch</p>\n</div></li></ul></div></div></div><div id='method-getRelease' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Version'>Ext.Version</span><br/><a href='source/Version2.html#Ext-Version-method-getRelease' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Version-method-getRelease' class='name expandable'>getRelease</a>( <span class='pre'></span> ) : Number</div><div class='description'><div class='short'>Returns the release component value ...</div><div class='long'><p>Returns the release component value</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Number</span><div class='sub-desc'><p>release</p>\n</div></li></ul></div></div></div><div id='method-getShortVersion' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Version'>Ext.Version</span><br/><a href='source/Version2.html#Ext-Version-method-getShortVersion' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Version-method-getShortVersion' class='name expandable'>getShortVersion</a>( <span class='pre'></span> ) : String</div><div class='description'><div class='short'>Returns shortVersion version without dots and release ...</div><div class='long'><p>Returns shortVersion version without dots and release</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getVersion' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Version'>Ext.Version</span><br/><a href='source/Version2.html#Ext-Version-method-getVersion' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Version-method-getVersion' class='name expandable'>getVersion</a>( <span class='pre'>[String packageName]</span> ) : <a href=\"#!/api/Ext.Version\" rel=\"Ext.Version\" class=\"docClass\">Ext.Version</a></div><div class='description'><div class='short'>Get the version number of the supplied package name; will return the last registered version\n(last Ext.setVersion cal...</div><div class='long'><p>Get the version number of the supplied package name; will return the last registered version\n(last Ext.setVersion call) if there's no package name given.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>packageName</span> : String (optional)<div class='sub-desc'><p>The package name, for example: 'core', 'touch', 'extjs'</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Ext.Version\" rel=\"Ext.Version\" class=\"docClass\">Ext.Version</a></span><div class='sub-desc'><p>The version</p>\n</div></li></ul></div></div></div><div id='method-isGreaterThan' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Version'>Ext.Version</span><br/><a href='source/Version2.html#Ext-Version-method-isGreaterThan' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Version-method-isGreaterThan' class='name expandable'>isGreaterThan</a>( <span class='pre'>String/Number target</span> ) : Boolean</div><div class='description'><div class='short'>Returns whether this version if greater than the supplied argument ...</div><div class='long'><p>Returns whether this version if greater than the supplied argument</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>target</span> : String/Number<div class='sub-desc'><p>The version to compare with</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'><p>True if this version if greater than the target, false otherwise</p>\n</div></li></ul></div></div></div><div id='method-isLessThan' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Version'>Ext.Version</span><br/><a href='source/Version2.html#Ext-Version-method-isLessThan' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Version-method-isLessThan' class='name expandable'>isLessThan</a>( <span class='pre'>String/Number target</span> ) : Boolean</div><div class='description'><div class='short'>Returns whether this version if smaller than the supplied argument ...</div><div class='long'><p>Returns whether this version if smaller than the supplied argument</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>target</span> : String/Number<div class='sub-desc'><p>The version to compare with</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'><p>True if this version if smaller than the target, false otherwise</p>\n</div></li></ul></div></div></div><div id='method-match' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Version'>Ext.Version</span><br/><a href='source/Version2.html#Ext-Version-method-match' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Version-method-match' class='name expandable'>match</a>( <span class='pre'>String/Number target</span> ) : Boolean</div><div class='description'><div class='short'>Returns whether this version matches the supplied argument. ...</div><div class='long'><p>Returns whether this version matches the supplied argument. Example:</p>\n\n<pre><code>var version = new Ext.Version('1.0.2beta');\nconsole.log(version.match(1)); // True\nconsole.log(version.match(1.0)); // True\nconsole.log(version.match('1.0.2')); // True\nconsole.log(version.match('1.0.2RC')); // False\n</code></pre>\n\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>target</span> : String/Number<div class='sub-desc'><p>The version to compare with</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'><p>True if this version matches the target, false otherwise</p>\n</div></li></ul></div></div></div><div id='method-setVersion' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Version'>Ext.Version</span><br/><a href='source/Version2.html#Ext-Version-method-setVersion' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Version-method-setVersion' class='name expandable'>setVersion</a>( <span class='pre'>String packageName, String/<a href=\"#!/api/Ext.Version\" rel=\"Ext.Version\" class=\"docClass\">Ext.Version</a> version</span> ) : <a href=\"#!/api/Ext\" rel=\"Ext\" class=\"docClass\">Ext</a></div><div class='description'><div class='short'>Set version number for the given package name. ...</div><div class='long'><p>Set version number for the given package name.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>packageName</span> : String<div class='sub-desc'><p>The package name, for example: 'core', 'touch', 'extjs'</p>\n</div></li><li><span class='pre'>version</span> : String/<a href=\"#!/api/Ext.Version\" rel=\"Ext.Version\" class=\"docClass\">Ext.Version</a><div class='sub-desc'><p>The version, for example: '1.2.3alpha', '2.4.0-dev'</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Ext\" rel=\"Ext\" class=\"docClass\">Ext</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-toArray' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Version'>Ext.Version</span><br/><a href='source/Version2.html#Ext-Version-method-toArray' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Version-method-toArray' class='name expandable'>toArray</a>( <span class='pre'></span> ) : Number[]</div><div class='description'><div class='short'>Returns this format: [major, minor, patch, build, release]. ...</div><div class='long'><p>Returns this format: [major, minor, patch, build, release]. Useful for comparison</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Number[]</span><div class='sub-desc'>\n</div></li></ul></div></div></div></div><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Static Methods</h3><div id='static-method-compare' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Version'>Ext.Version</span><br/><a href='source/Version2.html#Ext-Version-static-method-compare' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Version-static-method-compare' class='name expandable'>compare</a>( <span class='pre'>String current, String target</span> ) : Number<strong class='static signature'>static</strong></div><div class='description'><div class='short'>Compare 2 specified versions, starting from left to right. ...</div><div class='long'><p>Compare 2 specified versions, starting from left to right. If a part contains special version strings,\nthey are handled in the following order:\n'dev' &lt; 'alpha' = 'a' &lt; 'beta' = 'b' &lt; 'RC' = 'rc' &lt; '#' &lt; 'pl' = 'p' &lt; 'anything else'</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>current</span> : String<div class='sub-desc'><p>The current version to compare to</p>\n</div></li><li><span class='pre'>target</span> : String<div class='sub-desc'><p>The target version to compare to</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Number</span><div class='sub-desc'><p>Returns -1 if the current version is smaller than the target version, 1 if greater, and 0 if they're equivalent</p>\n</div></li></ul></div></div></div><div id='static-method-getComponentValue' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Version'>Ext.Version</span><br/><a href='source/Version2.html#Ext-Version-static-method-getComponentValue' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Version-static-method-getComponentValue' class='name expandable'>getComponentValue</a>( <span class='pre'>Object value</span> ) : Object<strong class='static signature'>static</strong></div><div class='description'><div class='short'>Converts a version component to a comparable value ...</div><div class='long'><p>Converts a version component to a comparable value</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>value</span> : Object<div class='sub-desc'><p>The value to convert</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>","mixedInto":[],"meta":{"author":["Jacky Nguyen <jacky@sencha.com>"],"docauthor":["Jacky Nguyen <jacky@sencha.com>"]},"inheritdoc":null,"inheritable":false,"static":false,"protected":false,"allMixins":[],"subclasses":[],"extends":null,"uses":[],"code_type":"nop","private":false,"statics":{"method":[{"required":null,"static":true,"protected":false,"owner":"Ext.Version","name":"compare","id":"static-method-compare","template":false,"tagname":"method","deprecated":null},{"required":null,"static":true,"protected":false,"owner":"Ext.Version","name":"getComponentValue","id":"static-method-getComponentValue","template":false,"tagname":"method","deprecated":null}],"property":[],"css_var":[],"css_mixin":[],"cfg":[],"event":[]},"superclasses":[],"name":"Ext.Version","alternateClassNames":[],"files":[{"href":"Version2.html#Ext-Version","filename":"Version.js"}],"tagname":"class","singleton":false,"id":"class-Ext.Version","deprecated":null});