const http = require('http'); // pull in http module
// url module for parsing url string
const url = require('url');

// pull in our custom files
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
    GET: {
        '/': htmlHandler.getIndex,
        '/style.css': htmlHandler.getCSS,
        notFound: jsonHandler.notFound,
    },
};

const onRequest = (request, response) => {
    // parse url into individual parts
    // returns an object of url parts by name
    const parsedUrl = url.parse(request.url);

    if (urlStruct[request.method][parsedUrl.pathname]) {
        return urlStruct[request.method][parsedUrl.pathname](request, response);
    }

    return urlStruct[request.method].notFound(request, response);
};

// start server
http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1: ${port}`);
});