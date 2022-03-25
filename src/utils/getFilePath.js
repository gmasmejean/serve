import fs from 'fs';
import { options } from '../index.js';

export const getFilePath = request => {
	const { root, fallback } = options;
	const url = new URL(request.url, `http://${request.headers.host}`);
	
	if (url.pathname == '/') return `${root}/index.html`;

	if (fallback && !fs.existsSync(`${root}${url.pathname}`) && !url.pathname.endsWith('/')) {
		return `${root}/${fallback}`;
	}

	if (!url.pathname.includes('.')) {
		const testFilepath = `${root}/${url.pathname}.html`;

		if (fs.existsSync(testFilepath)) return testFilepath;
	}

	return root + url.pathname;
};
