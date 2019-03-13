'use strict';
const env = require('jsdoc/env');
const urls = env.conf.urls;
const urlRegex = /{@url\s+([\w-_]+)}/;
const replacer = text => {
	text = text.replace(urlRegex, (ref, key, line) => {
		const url = urls[key];
		const urlType = typeof url;
		switch(typeof url) {
			case 'string': {
				return `{@link ${url}|${key}}`;
			}
			case 'object': {
				const hasName = typeof url.name === 'string';
				if (!url.url) {
					return '';
				}
				return `{@link ${url.url}|${hasName ? url.name : key}}`;
			}
			default: {
				return '';
			}
		}
	});
	if (urlRegex.test(text)) return replacer(text);
	return text;
};
exports.handlers = {
	beforeParse(e) {
		if (typeof urls !== 'object') return;
		e.source = replacer(e.source);
	}
};
