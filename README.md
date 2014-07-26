kickstarter-backers-scrapper
============================

Get the public locations of the backers of a project on Kickstarter

### Installation

1. Install casper.js:

     brew install casperjs --devel
    
2. Download the repo:
    
    git clone https://github.com/javierarce/kickstarter-backers-scrapper.git

3. Edit the file ```scrapper.js``` with the URL of the backers page of your choice:

    BACKERS_URL = "https://www.kickstarter.com/projects/electricobjects/electric-objects-a-computer-made-for-art/backers"

4. Run the scrapper:

    casperjs scrapper.js
    
After the script is finished, ´´´location.txt´´´ will contain the captured locations.
