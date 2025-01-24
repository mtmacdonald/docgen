<style>
.container {
  box-sizing: border-box;
  float:left;
  width: 480px;
  margin: 0 0 1rem;
}
.codeContainer pre {
  margin: 0;
}
.codeContainer p {
  margin: 0;
  padding: 0;
}
.exampleContainer {
  border: 1px solid #666;
  border-radius: 6px;
  padding: 0 18px 0 18px;
}
.exampleContainer img {
  margin-top: 5px;
}
#content table {
  width: 400px!important;
}
</style>

Content for a DocGen website is authored either in:

- plain text (`.txt` files)
- [markdown](https://www.markdownguide.org/) (`.md` files)
- HTML (embedded in `.md` files)

You can use any text editor or IDE to edit these. The advantage of markdown is that it will be automatically styled
(e.g. headings, bullet points etc).

Image files can be embedded (via links), and other files can be attached (the website will link to these).

Additionally, some website metadata is configured via [JSON](http://json.org) files.

## Overview

DocGen transforms source files from an input directory into output files in an output directory.

It takes every source file (plain text) specified in **contents.json** and converts it. Each source file becomes a 
separate page in the website and a separate chapter in the PDF.

DocGen adds metadata that is specified in **parameters.json**, and copies the images and files in the **files**
directory to the output.

> Always save input files with **UTF-8** encoding. This makes non-standard characters (ø © é etc.) work.

## Metadata

**parameters.json**

The parameters file is used to specify metadata describing the product. 

- **title** - the website title
- **name** - the website name (also used to name the PDF)
- **version** - the release version
- **date** - the release date
- **organization** - the company or organization 
- **author** - the lead author of the document
- **owner** - the owner of the document
- **contributors** - list of contributors
- **website** - a link to the parent website
- **backlink** - a link back to another site (useful for integrated documentation)
- **module** - module name (useful for larger sites with submodules)
- **id** - reference number (e.g. id in a change management tool)
- **summary** - a descriptive summary of the website/document
- **marking** - license or other protective markings
- **legalese** - document markings (confidentiality, disclaimers, smallprint etc)

Values can be empty strings, but the elements are required in the JSON file. 

Parameters with URLs can be either website URLs, or email addresses (specify *'mailto:name@address.com'*).

**contents.json**

The contents file specifies the names, locations, order, and hierarchy of the source files. It is used to generate both
the web and PDF table of contents.

**release-notes.md**

The release notes source file is a mandatory source file (that does not need to be listed in contents.json). Use it to
summarize the change history for each version of the product.

## Plain text

The simplest input format is just to write in plain text. Here is an example of the source and output:

<div class="container codeContainer">

    Example paragraph.

</div>
<div class="container exampleContainer">

Example paragraph.

</div><br class="w-clear"/>

<p class="dg-forceBreak"></p>

## Markdown

[Markdown](https://www.markdownguide.org/) is a human-friendly plain text markup format. The source format is easy
to read and write, and the CommonMark parser translates it into HTML. DocGen uses the [CommonMark](http://commonmark.org/)
standard via a package called [markdown-it](https://markdown-it.github.io). Here is an example of the source and output:

<div class="container codeContainer">

    Markdown Example
    ------------------

    Paragraphs are text blocks separated by new lines.

    Text can be styled: *emphasised* and **strong**.

    Here is an [example link](http://www.google.com).

      # To make a code block, just indent with a tab
      # "Hello World" in Ruby:
      5.times { puts "Hello!" }
</div>
<div class="container exampleContainer">

<p class="dg-fakeHeading" style="font-size: 18px; padding-bottom: 4px;">Markdown Example</p>

Paragraphs are text blocks separated by new lines.

Text can be styled: *emphasised* and **strong**.

Here is an [example link](http://www.google.com).

    # To make a code block, just indent with a tab
    # "Hello World" in Ruby:
    5.times { puts "Hello!" }
</div><br class="w-clear"/>

For more examples, see the [CommonMark reference](commonmark.html).

## HTML

For more complex pages not covered by CommonMark's syntax, simply use inline HTML:

<div class="container codeContainer">
<pre><code>&lt;table&gt;
  &lt;tr&gt;
    &lt;td&gt;Foo&lt;/td&gt;
    &lt;td&gt;Bar&lt;/td&gt;
    &lt;td&gt;Baz&lt;/td&gt;
  &lt;/tr&gt;
&lt;/table&gt;</code></pre>
</div>
<div class="container exampleContainer">
<table>
  <tr>
    <td>Foo</td>
    <td>Bar</td>
    <td>Baz</td>
  </tr>
</table>
</div><br class="w-clear"/>

For more examples, see [writing advanced content](advanced-content.html).

> Inline HTML is still parsed by the CommonMark parser (HTML is allowed in CommonMark documents). In DocGen, it is also 
possible to bypass the CommonMark parser altogether and specify a pure HTML input page, by setting 
<code class="w-inline-code">"html": true</code> in a page object in *contents.json*.

## Images

Images (e.g. JPEG, PNG, GIF etc.) can be added to the *files/images*, and embedded as image links.

<div class="container codeContainer">
<pre><code>![logo](files/images/example-image.png)</code></pre>
</div>
<div class="container exampleContainer">
<img src="files/images/example-image.png" />
</div><br class="w-clear"/>
