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

## Basic tables

Basic tables can be inserted with the Github-flavoured Markdown
[table extension](https://help.github.com/articles/github-flavored-markdown/#tables).

<div class="container codeContainer">
<pre><code>| Heading    | Heading    | Heading |
|:-----------:----------:|--------:|
| Something  | Something  | ?       |
| Another    | Another    | ?       |
| One more   | One more   | ?       |</code></pre>
</div>
<div class="container exampleContainer">
<table class="w-table w-fixed w-stripe">
<thead>
<tr>
<th style="text-align:left">Heading</th>
<th style="text-align:center">Heading</th>
<th style="text-align:right">Heading</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">Something</td>
<td style="text-align:center">Something</td>
<td style="text-align:right">?</td>
</tr>
<tr>
<td style="text-align:left">Another</td>
<td style="text-align:center">Another</td>
<td style="text-align:right">?</td>
</tr>
<tr>
<td style="text-align:left">One more</td>
<td style="text-align:center">One more</td>
<td style="text-align:right">?</td>
</tr>
</tbody>
</table>
</div><br class="w-clear"/>

## HTML tables

Regular HTML can also be used for tables, allowing full custom styling (including table and column widths).

<div class="container codeContainer">
<pre><code>&lt;table style=&quot;width:100%;&quot;&gt;
 &lt;tr&gt;
  &lt;th&gt;Heading&lt;/th&gt;
  &lt;th&gt;Heading&lt;/th&gt;
  &lt;th&gt;Heading&lt;/th&gt;
 &lt;/tr&gt;
 &lt;tr&gt;
  &lt;td class=&quot;bold&quot;&gt;Example&lt;/td&gt;
  &lt;td&gt;Example&lt;/td&gt;
  &lt;td&gt;Example&lt;/td&gt;
 &lt;/tr&gt;
 &lt;tr&gt;
  &lt;td&gt;&lt;strong&gt;Example&lt;/strong&gt;&lt;/td&gt;
  &lt;td class=&quot;w-success-text&quot;&gt;Example&lt;/td&gt;
  &lt;td&gt;&lt;span class=&quot;dgIcon&quot; data-name=&quot;check&quot;&gt;&lt;/span&gt;&lt;/td&gt;
 &lt;/tr&gt;
 &lt;tr&gt;
  &lt;td&gt;&lt;strong&gt;Example&lt;/strong&gt;&lt;/td&gt;
  &lt;td class=&quot;w-error-text&quot;&gt;Example&lt;/td&gt;
  &lt;td&gt;&lt;span class=&quot;dgIcon&quot; data-name=&quot;x&quot;&gt;&lt;/td&gt;
 &lt;/tr&gt;
&lt;/table&gt;</code></pre>
</div>
<div class="container exampleContainer">
<table style="width:100%;">
 <tr>
  <th>Heading</th>
  <th>Heading</th>
  <th>Heading</th>
 </tr>
 <tr>
  <td class="bold">Example</td>
  <td>Example</td>
  <td>Example</td>
 </tr>
 <tr>
  <td><strong>Example</strong></td>
  <td class="w-success-text">Example</td>
  <td><span class="dgIcon" data-name="check"></span></td>
 </tr>
 <tr>
  <td><strong>Example</strong></td>
  <td class="w-error-text">Example</td>
  <td><span class="dgIcon" data-name="x"></span></td>
 </tr>
</table>
</div><br class="w-clear"/>

## Creating internal links to page sections

To create links to other sections within one content page, put hyphens between the words in the heading and prepend with #:

	[link to heading](#this-is-a-heading)

	... other page content here ...

	This is a heading
	-----------------

## Creating internal links to other pages

To create links to *other* content pages provide the relative url to the page:

	[link to heading](example-page.html)

## Control of page breaks in the PDF

DocGen does not provide precision control over PDF layout. However, some steps can be taken in case of page break
issues (the most common problem).

To *force* a page break, insert the following before an element that should appear on a new page:

	<p class="dg-forceBreak"></p>

DocGen automatically tries to eliminate page breaks *inside* code blocks, block quotes, and table rows.
To apply the same technique to other elements, revert to HTML and apply the **dg-avoidBreak** class. For example:

	<p class="dg-avoidBreak">A long paragraph</p>


## HTML

The source format is easy
to read and write, and the CommonMark parser translates it into HTML. DocGen uses the [CommonMark](http://commonmark.org/)
standard via a package called [markdown-it](https://markdown-it.github.io). Here is an example of the source and output:

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


> Inline HTML is still parsed by the CommonMark parser (HTML is allowed in CommonMark documents). In DocGen, it is also
possible to bypass the CommonMark parser altogether and specify a pure HTML input page, by setting
<code class="w-inline-code">"html": true</code> in a page object in *contents.json*.
