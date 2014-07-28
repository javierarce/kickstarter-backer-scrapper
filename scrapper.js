var colorizer = require('colorizer').create('Colorizer');

var casper = require('casper').create();

var BACKERS_URL            = "https://www.kickstarter.com/projects/jennifercox/teeth-a-short-film/backers";
var WAIT_BETWEEN_SCROLLING = 1000;

function log(msg, color) {
  console.log(colorizer.format(msg, { fg: color } ));
}

function scroll(casper) {

  casper.waitFor(function() {

    this.scrollToBottom();
    this.wait(WAIT_BETWEEN_SCROLLING);

    return true;

  }, function() {

    var info      = this.getElementInfo('div.load_more');
    var backers   = this.getElementsInfo(".NS_backers__backing_row");
    var locations = this.getElementsInfo(".NS_backers__backing_row .location");

    log(backers.length + " backers loaded. "  + locations.length + " locations captured.");

    if (info["visible"]) {

      this.emit('load.more');

    } else {

      log("\nWe're done. Open locations.txt to see the captured locations.", "green");

    }

  }, function() {

    log("Unexpected error", "red");

    exit();

  }, 5000);

}

casper.start(BACKERS_URL, function() {

  var info = this.getElementsInfo("[itemprop='Project[backers_count]']")

  log("Getting location from " + info[0].text + " backers\n", "green");

  scroll(this);

});

casper.on('load.more', function () {
  scroll(this);
});

casper.then(function() {

  var locations = [];

  casper.each(this.getElementsInfo('.NS_backers__backing_row .location'), function(casper, element, j) {
    locations.push(element["text"].trim());
  });

  require('fs').write("locations.txt", locations.join("\n"), 'w');

});

casper.run()
