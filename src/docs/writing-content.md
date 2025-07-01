Content for a DocGen website is authored in a human-friendly plain text format called
[Markdown](https://www.markdownguide.org/).

## Content files

DocGen content files are stored in Markdown files with the extension `.md`. These can be edited with any text editor.

Each Markdown file is converted to a page in the website and one or more pages in the PDF. You can create as many
input files as you need.

> Always save input files with **UTF-8** encoding. This makes non-standard characters (ø © é etc.) work.

## How to write Markdown files

Markdown is a simple markup language that uses plain text formatting syntax. It is designed to be easy to read and
write. DocGen converts the Markdown content into an HTML website and a PDF copy.

This section shows some examples of what to type, and how it looks in the page.

### Paragraphs

*What you type:*

    This is a paragraph. Paragraphs are text blocks separated by new lines.

    This is another paragraph. Text can be styled: *emphasised* and **strong**.

*How it looks:*

This is a paragraph. Paragraphs are text blocks separated by new lines.

This is another paragraph. Text can be styled: *emphasised* and **strong**.

---------------------

### Headings

*What you type:*

    # Heading level 1

    ## Heading level 2

    ### Heading level 3

*How it looks:*

# Heading level 1

## Heading level 2

### Heading level 3

---------------------

### Links

*What you type:*

    This is a link to [Google](http://www.google.com).

*How it looks:*

This is a link to [Google](http://www.google.com).

---------------------

### Bullet-points

*What you type:*

    - one
    - two
    - three

    1. one
    2. two
    3. three

*How it looks:*

- one
- two
- three

1. one
2. two
3. three

---------------------

### Quotes

*What you type:*

    > This is a quote.

*How it looks:*

> This is a quote.

---------------------

### Admonitions

*What you type:*

    !!! Information Title
        Information details

    !!! Warning Title
        Warning details

    !!! Success Title
        Success details

    !!! Error Title
        Error details

*How it looks:*

!!! Information Title
    Information details

!!! Warning Title
    Warning details

!!! Success Title
    Success details

!!! Error Title
    Error details

---------------------

### Code blocks

*What you type:*

    // To make a code block, just indent with a tab

    const hello = () => {
      console.log("Hello, World!");
    };
    hello();

*How it looks:*

    // To make a code block, just indent with a tab

    const hello = () => {
      console.log("Hello, World!");
    };
    hello();

---------------------

### Images

Images can be added to documents - save the image files to the *files/images* directory (in `.jpg` or `.png` formats).

*What you type:*

    ![logo](files/images/example-image.png)

*How it looks:*

![logo](files/images/example-image.png)

---------------------
For more examples, see the [CommonMark reference](commonmark.html).

### Tables

*What you type:*
    
    | Animal  | Description                    |
    |---------|--------------------------------|
    | Alpaca  | South American camelid mammal. |
    | Tiger   | Large cat.                     |
    | Wallaby | Australian mid-sized macropod. |

*How it looks:*

| Animal  | Description                    |
|---------|--------------------------------|
| Alpaca  | South American camelid mammal. |
| Tiger   | Large cat.                     |
| Wallaby | Australian mid-sized macropod. |