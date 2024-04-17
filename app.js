
const axios = require('axios');

const url = 'https://www.london.gov.uk/sitemap.xml?page=1';

async function fetchHTML(url) {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error('Error fetching the HTML:', error);
    return null;
  }
}

async function scrapeTitles() {
  const html = await fetchHTML(url);
  if (!html) return;

  const titleRegex = /<loc[^>]*>(.*?)<\/loc>/gi;
  const titles = [];
  let match;
  
  while ((match = titleRegex.exec(html)) !== null) {
    titles.push(match[1]);
  }

  return titles;
}

scrapeTitles()
  .then(titles => {
    console.log('Latest article titles:');
    // titles.forEach(title => console.log(title));
    console.log(titles);
  })
  .catch(error => console.error('Error scraping the titles:', error));