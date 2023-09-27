﻿This section explains how to install DocGen.

Supported platform
------------------

*'Supported platform'* means the software required to **run** the DocGen tool. The static website **produced** by 
DocGen will work on all modern browsers on all all major operating systems 
(see [browser support](index.html#browser-support)).

<p class="w-information">
	The supported platform for this version of DocGen is: 
	<strong>Ubuntu 14.04</strong> with <strong>Node.js 0.12.0</strong> 
	and <strong>wkhtmltopdf 0.12.2.1 </strong>(with patched qt).
</p>

While other operating systems and dependency versions may work, they are not tested or officially supported.

Dependencies
------------

DocGen requires **[Node.js](https://nodejs.org)**. To install on Ubuntu Linux, enter these terminal commands:

	curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -
	sudo apt-get install -y nodejs

This method uses the 
[NodeSource Linux Repositories](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories)
(recommended).

For other platforms (not supported), see the [download page](https://nodejs.org/download) or vendor instructions.

Optional dependencies (only for PDF)
------------------------------------

For optional PDF support, DocGen requires **[wkhtmltopdf](http://wkhtmltopdf.org)**. See the wkthmltopdf website for
installation instructions.

Quick install with NPM
----------------------

The quickest way to install DocGen is with **[npm](https://www.npmjs.com)** (the JavaScript package manager). Enter 
these terminal commands:

	sudo npm install -g docgen-tool

Install by direct download
--------------------------

DocGen can also be installed by [direct download](https://github.com/mtmacdonald/docgen).
