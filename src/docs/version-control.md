One of the benefits of using DocGen for product software documentation is that its plain text source files are easy to 
version control in sync with the product.

Recommended practice
--------------------

It is recommended to store the documentation **source files** (DocGen input directory) in the same version control 
repository as the product code. This allows each release of the product to have a matching version of its
documentation.

> It is not necessary to version control the DocGen output, because this can always be regenerated. If the DocGen
output is version controlled, file renames, additions, and deletions have to be performed manually in the 
version control tool.
