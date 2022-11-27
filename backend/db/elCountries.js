const sqlite3 = require('sqlite3').verbose();


function getAllPrices() {

    let db = new sqlite3.Database('dbs.sqlite3',sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to the database.');
      });
    
    db.serialize(() => {
        db.each(`SELECT geo as state,
                        year as year,
                        value as price
                 FROM electricity_price_user
                 WHERE year = 2015`, (err, row) => {
          if (err) {
            console.error(err.message);
          }
    
          return JSON.stringify(row);
          console.log(row.state + "\t" + row.year + "\t" + row.price);
        });
      });
    
    db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Close the database connection.');
    });

}

module.exports = {
    getAllPrices,
}
