<p align="center">
	<h1>jsdoc-plugin-url</h1>
</p>

## Overview
Generate [jsdoc][jsdoc] `@link` [inline tags][jsdoc-inline] from `@url` inline tags and a configuration object.
The goal of this plugin is to prevent repetition in using `@link` tags. Define the url in your jsdoc config object,
reference that url from an `@url` tag. 

If you want to link to npm packages without predefining their URL see the [npm JSDoc plugin][npm-plugin].

## Configuration Overview
`jsdoc-plugin-url` uses the [jsdoc configuration object or json][jsdoc-config] to define the URL's that are
referencable to @url tags.
```json
{
  "plugins": ["jsdoc-plugin-url"],
  "urls": {
    "jsdocString": "https://usejsdoc.org",
    "jsdocObjectWithName": {
      "url": "https://usejsdoc.org",
      "name": "JSDoc Docs"
    },
    "jsdocObjectWithoutName": {
    	"url": "https://usejsdoc.org"
    }
  }
}
```

The value of a `urls` property can be:
 
- An object such as `{url: 'https://usejsdoc.org', name: 'jsdoc'}` with a `url` property (required) 
  or a `name` property (optional).
	- the `name` property value is used as the `a` tag text node,
		- if the name property is not present the property key referenced is used as the `a` tag text node instead.
- A string such as "https://usejsdoc.org"
  - the key used to reference the string value is used as the `a` tag text node.
- If the @url tag cannot resolve a key from the configuration object the tag is removed entirely.
  - as of `1.0.0` it's not possible to disable this due to the current implementation.

## Usage Example
Given the following jsdoc configuration:
```json
{
  "plugins": ["jsdoc-plugin-url"],
  "urls": {
  	"urlPlugin": "https://github.com/JustinBeaudry/jsdoc-plugin-url",
  	"jsdoc": {
  		"url": "http://usejsdoc.org"
  	},
  	"voightKampff": {
  		"url": "https://bladerunner.fandom.com/wiki/Voight-Kampff_test",
  		"name": "Voight-Kampff"
  	}
  }
}
```
and the following example:
```javascript
// example npm package (not real...yet)
const voightKampffMachine = require('voight-kampff-machine');
/**
 * Takes an array of questions and returns a Promise that resolves to a `string` response to those questions.
 * See {@url voightKampff} for more information, the {@url urlPlugin}, and {@url jsdoc}.
 * 
 * @function voightKampff
 * @since 1.0.0
 * @param {string[]} questions
 * @returns {Promise<string>}
 */
const voightKampff = questions => {
	return voightKampffMachine.handleQuestions(questions)
		.then(response => {
		  if (!response) {
		    return 'They\'re only questions Leon';
		  }
		  return response;
		});
};
```
`jsdoc-plugin-url` will generate:
````javascript
/**
 * Takes an array of questions and returns a Promise that resolves to a response to those questions.
 * See {@link https://bladerunner.fandom.com/wiki/Voight-Kampff_test|Voight-Kampff} for more information, the 
 * {@link https://github.com/JustinBeaudry/jsdoc-plugin-url|urlPlugin}, and {@link http://usejsdoc.org|jsdoc}.
 * 
 * ...
 */
````

## Installation
Install as a [devDependency][dev-deps]:
```bash
npm i -D jsdoc-plugin-url
```

## Setup
In your [JSDoc config][jsdoc-config] in the [plugins][jsdoc-plugins] array include `jsdoc-plugin-url`, and define
some URLS:
```json
{
  "plugins": ["jsdoc-plugin-url"],
  "urls": {
  	"urlPlugin": "https://github.com/JustinBeaudry/jsdoc-plugin-url",
  	"jsdoc": {
  		"url": "http://usejsdoc.org"
  	},
  	"voightKampff": {
  		"url": "https://bladerunner.fandom.com/wiki/Voight-Kampff_test",
  		"name": "Voight-Kampff"
  	}
  }
}
```

## License
__*A copy of the license is included in this repository.*__

Copyright 2019 Justin Beaudry

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.


[npm-plugin]: JustinBeaudry/jsdoc-plugin-npm
[jsdoc]: http://usejsdoc.org
[jsdoc-inline]: http://usejsdoc.org/about-block-inline-tags.html
[jsdoc-plugins]: http://usejsdoc.org/about-configuring-jsdoc.html#configuring-plugins
[jsdoc-config]: http://usejsdoc.org/about-configuring-jsdoc.html
[dev-deps]: https://docs.npmjs.com/files/package.json#devdependencies
