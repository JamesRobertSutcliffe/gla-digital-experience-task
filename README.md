# gla-digital-experience-task

Codebase for web scraping task set by the GLA digital experience unit.

## Description

I decided to create a backend app in node.js utilising an asynchronous functional approach. The app initially scrapes the provided URL and stores the scraped data in an array. When the app runs the user is prompted to enter a search term, the array or URL is iterated over, each item is fetched and checked against the search term. The console then logs each URL that includes the search term in it's body as well as the number of articles it appears in. A .txt file is also written which contains the report.

## How to use

1. Fork the repo
2. Ensure node.js is installed alongside all other packages (npm i)
3. Enter 'node app.js' into the console
4. You will then be prompted to enter your search term
5. The app will function as described above
