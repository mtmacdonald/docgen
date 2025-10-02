## Overview

DocGen is a command-line (CLI) tool which takes plain text or [markdown](https://www.markdownguide.org/) input files and
outputs a static website. It also optionally outputs a PDF copy of the website content.

DocGen works by transforming an input directory (source files) into an output directory (website + PDF).

## Command-line usage

The DocGen command-line interface includes usage help for both the tool and its subcommands:

	npx docgen-tool --help

## Scaffold command

Use the scaffold command for creating a new project. It creates an *example* input directory, by generating the minimum
the skeleton input files required by DocGen. After generating them, you can customise them to create your website.

**Create a scaffold template in the working directory** (./)**:**

	npx docgen-tool scaffold

**Create a scaffold template in a specified directory:**

	npx docgen-tool scaffold -o $HOME/docgen-example

## Run command

The **run** command transforms an input directory (plain text source) into an output directory (HTML+PDF).

**Basic usage:**

	npx docgen-tool build -i $HOME/docgen-example -o $HOME/docgen-output

**Optionally create a PDF:**

	npx docgen-tool build -i $HOME/docgen-example -o $HOME/docgen-output -p
