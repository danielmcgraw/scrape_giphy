const https = require('https');
const fs = require ('fs');
const [,, keyword, root] = process.argv;

const req = https.get(`https://api.giphy.com/v1/gifs/random?tag=${keyword}&api_key=${process.env.API_KEY}`, (res) => {
	let body = '';

	res.on('data', (chunk) => { body += chunk; });
	res.on('end', () => {
    body = JSON.parse(body);
		const filename = body.data.image_mp4_url.split('/')[4];
		const file_path = `${root}/${keyword}/${filename}.mp4`
		const req = https.get(body.data.image_mp4_url, (resp) => {
			fs.mkdir(`${root}/${keyword}`, (err) => {
				if (err && err.code != 'EEXIST') throw 'up'
				fs.access(file_path, fs.F_OK, (e) => {
					if (e) {
						console.log(`Getting: ${body.data.image_mp4_url}`);
						const file = fs.createWriteStream(file_path);
						resp.pipe(file);
					} else {
						console.log(`Skipping: ${body.data.image_mp4_url}, already exists`);
					}
				});
			});
		});
  });
}).on('error', (e) => {
  console.log("Got error: " + e.message);
});
