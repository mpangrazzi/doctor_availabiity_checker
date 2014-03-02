var Browser = require('zombie');
var jsdom   = require('jsdom');

var browser = new Browser({silent: false, debug: true});

module.exports = function(doctorName, callback) {

  browser.visit('http://89.190.163.118/Pubblico/RicercaMedici/Index.rails', function () {

    browser
      .clickLink('Ricerca per nome')
      .then(function() {

        browser
          .fill('richiesta.NominativoMedico', doctorName)
          .pressButton('Cerca')
          .then(function() {

            // TODO
            // 1. Handle case where doctor doesn't exists...
            // 2. ...And walk though pages first!

            browser
              .clickLink(doctorName.toUpperCase())
              .then(function() {

                jsdom.env(browser.html(),
                  ['http://code.jquery.com/jquery.min.js'],
                  function(err, window) {

                    if (err) {
                      callback(err, null);
                    } else {

                      var $rows = window.$('.medici-list a').filter(function() {
                        return window.$(this).text().toLowerCase() === doctorName.toLowerCase();
                      });

                      console.log($rows)

                      if ($rows.length > 0) {
                        var $doctorRow = $rows.first();
                        var $availability = $doctorRow.parents('tr').find('td:eq(1)');

                        callback(null, $availability.text());
                      } else {
                        callback('Non trovato', null);
                      }

                    }

                  }
                );

              });

          });

      });

  });

};
