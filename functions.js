const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.london.gov.uk/sitemap.xml?page=1';


// fetchHTML gets URL via Axios
async function fetchHTML(url) {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error('Error fetching the HTML:', error);
    return null;
  }
}

// scrapeTitles fetches the initial URL and scrapes each URL on the page using regex to seperate HTML <loc> tags and push them to an array.
async function scrapeTitles() {
  const html = await fetchHTML(url);

  if (!html) return;

  const titleRegex = /<loc[^>]*>(.*?)<\/loc>/gi;
  const titles = [];
  let match;

  while (((match = titleRegex.exec(html)) !== null) && titles.length < 100) {
    titles.push(match[1]);
  }
  return titles;
}


// searchStringInUrl takes a url and search string parameter, it fetches the parsed URL, scrapes the <main> html tag asseses whether the search string is present within.
async function searchStringInUrl(url, searchString) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const bodyText = $('main').text();

    return bodyText.includes(searchString);
  } catch (error) {
    console.error('Error fetching or parsing data:', error);
    return false;
  }
}

module.exports = { fetchHTML, scrapeTitles, searchStringInUrl };
