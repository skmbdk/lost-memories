const scrape = require('website-scraper');
const path = require('path');

const outputDir = path.resolve(__dirname, 'site');

scrape({
  urls: ['https://www.lostmemories.space/'],
  directory: outputDir,
  recursive: true,
  maxRecursiveDepth: 3,
  requestConcurrency: 20,
  prettifyUrls: false,
  filenameGenerator: 'bySiteStructure',
  urlFilter: (url) => {
    return (
      url.startsWith('https://www.lostmemories.space/') ||
      url.startsWith('https://www.lostmemories.space') ||
      url.startsWith('https://cdn.sanity.io/')
    );
  },
  sources: [
    { selector: 'img', attr: 'src' },
    { selector: 'img', attr: 'srcset' },
    { selector: 'source', attr: 'src' },
    { selector: 'source', attr: 'srcset' },
    { selector: 'link', attr: 'href' },
    { selector: 'script', attr: 'src' },
    { selector: 'video', attr: 'src' },
    { selector: 'audio', attr: 'src' },
  ],
})
  .then((result) => {
    console.log(`Scrape completed. Saved ${result.length} resources to ${outputDir}`);
  })
  .catch((error) => {
    console.error('Scrape failed:', error);
    process.exit(1);
  });
