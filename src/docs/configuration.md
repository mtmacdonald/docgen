## Overview

DocGen transforms source files from an input directory into output files in an output directory.

It takes every source file (plain text) specified in **contents.json** and converts it. Each source file becomes a
separate page in the website and a separate chapter in the PDF.

DocGen adds metadata that is specified in **parameters.json**, and copies the images and files in the **files**
directory to the output.

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