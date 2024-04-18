const readline = require('readline');
const { scrapeTitles, searchStringInUrl } = require('./functions');
const fs = require('fs');

let searchString = '';
let output = [];

// readline is used to obtain user input for search query
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the search string: ', async (input) => {
  searchString = input.trim(); // Trims input question
  console.log("Searching for your entry...");
  try {
    const titles = await scrapeTitles();

    for (const title of titles) {
      const found = await searchStringInUrl(title, searchString);
      if (found) {
        output.push(title);
      }
    }

    const result = `${searchString} appears ${output.length} times in the following articles:\n${output.join('\n')}`;
    
    // Write the result to a .txt file
    fs.writeFile('search_results.txt', result, (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('Search results saved to search_results.txt');
      }
    });

    // Log the search results to the console
    console.log(`${searchString} appears ${output.length} times in the following articles:`, output);
  } catch (error) {
    console.error('Error scraping the titles:', error);
  }

  rl.close();
});
