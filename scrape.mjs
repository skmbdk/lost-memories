import scrape from 'website-scraper';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.resolve(__dirname, 'site');

scrape({
  urls: ['https://www.lostmemories.space/'],
  directory: outputDir,
  recursive: true,
  maxRecursiveDepth: 3,
  requestConcurrency: 20,
  prettifyUrls: false,
  filenameGenerator: 'bySiteStructure'
})
  .then((result) => {
    console.log(`Scrape completed. Saved ${result.length} resources to ${outputDir}`);
  })
  .catch((error) => {
    console.error('Scrape failed:', error);
    process.exit(1);
  });
