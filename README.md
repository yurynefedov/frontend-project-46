[![Actions Status](https://github.com/yurynefedov/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/yurynefedov/frontend-project-46/actions)
[![Tests and Linter](https://github.com/yurynefedov/frontend-project-46/actions/workflows/nodejs.yml/badge.svg)](https://github.com/yurynefedov/frontend-project-46/actions/workflows/nodejs.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/4b7cddd0c9831da76551/maintainability)](https://codeclimate.com/github/yurynefedov/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/4b7cddd0c9831da76551/test_coverage)](https://codeclimate.com/github/yurynefedov/frontend-project-46/test_coverage)

# "Difference Generator"

## Description

Difference Generator is a console utility that compares two configuration files and shows a difference. The output format might be customized by user.

The details of setup and usage are provided below.

## Setup

Before proceeding with the setup, please, make sure you have Node.js >=16 installed.

### 1. Clone this repository on your computer

Cloning with SSH URLs:
```
git clone git@github.com:yurynefedov/frontend-project-46.git 
```
Cloning with HTTPS URLs:
```
git clone https://github.com/yurynefedov/frontend-project-46.git 
```

### 2. Run the following commands while you are in the root directory:

```
make install
npm link 
```

## Usage

### Manual

Run `gendiff --help` or `gendiff -h` for manual.

    gendiff -h
    Usage: gendiff [options] <filepath1> <filepath2>

    Compares two configuration files and shows a difference.

    Options:
      -V, --version        output the version number
      -f, --format <type>  output format
      -h, --help           display help for command

### Files and filepaths

The utility currently support the following file formats:

- JSON
- YAML

To generate the difference you need to provide absolute or relative paths to both files, for instance:

```
gendiff __fixtures__/before.json __fixtures__/after.json
```

### Output formats

The following types of output format are available:

- stylish (default)
- plain
- json

You can specify a formatter using the --format or -f flag on the command line. For example, --f json uses the JSON formatter.

Please note that 'stylish' is a format by default, therefore, commands below return the same output:
```
gendiff <filepath1> <filepath2>

gendiff -f stylish <filepath1> <filepath2>
```

### Output examples

Output in stylish format:

[![asciicast](https://asciinema.org/a/545011.svg)](https://asciinema.org/a/545011)

Output in plain format:

[![asciicast](https://asciinema.org/a/545014.svg)](https://asciinema.org/a/545014)

Output in json format:

[![asciicast](https://asciinema.org/a/545016.svg)](https://asciinema.org/a/545016)