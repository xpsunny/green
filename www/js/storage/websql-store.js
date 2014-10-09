var WebSqlStore = function(successCallback, errorCallback) {

    this.initializeDatabase = function(successCallback, errorCallback) {
        var self = this;
        this.db = window.openDatabase("WeatherDB", "1.0", "Weather Demo DB", 200000);
        this.db.transaction(
                function(tx) {
                    self.createTable(tx);
                    self.addSampleData(tx);
                },
                function(error) {
                    console.log('Transaction error: ' + error);
                    if (errorCallback) errorCallback();
                },
                function() {
                    console.log('Transaction success');
                    if (successCallback) successCallback();
                }
        )
    }

    this.createTable = function(tx) {
        tx.executeSql('DROP TABLE IF EXISTS weather');
        var sql = "CREATE TABLE IF NOT EXISTS weather ( " +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "city VARCHAR(50), " +
            "state VARCHAR(50), " +
            "zip VARCHAR(50), " +
            "snow_depth INTEGER, " +
            "rdate TIMESTAMP)"
        tx.executeSql(sql, null,
                function() {
                    console.log('Create table success');
                },
                function(tx, error) {
                    alert('Create table error: ' + error.message);
                });
    }

    this.addSampleData = function(tx, employees) {
        var snows = [
                {"id": 1, "city": "Evanston", "state": "IL", "zip": "60201", "snow_depth": 1, "rdate": "2013-12-31 22:01:04"},
                {"id": 2, "city": "Evanston", "state": "IL", "zip": "60201", "snow_depth": 2, "rdate": "2013-12-31 23:04:33"},
                {"id": 3, "city": "Evanston", "state": "IL", "zip": "60201", "snow_depth": 3, "rdate": "2014-01-01 00:22:53"},
                {"id": 4, "city": "Evanston", "state": "IL", "zip": "60201", "snow_depth": 4, "rdate": "2014-01-01 01:10:10"},
                {"id": 5, "city": "Evanston", "state": "IL", "zip": "60201", "snow_depth": 5, "rdate": "2014-01-01 02:44:01"},
                {"id": 6, "city": "Evanston", "state": "IL", "zip": "60201", "snow_depth": 6, "rdate": "2014-01-01 03:00:11"},
                {"id": 7, "city": "Evanston", "state": "IL", "zip": "60201", "snow_depth": 7, "rdate": "2014-01-01 04:09:20"},
                {"id": 8, "city": "Evanston", "state": "IL", "zip": "60201", "snow_depth": 8, "rdate": "2014-01-01 05:01:00"},
                {"id": 9, "city": "Evanston", "state": "IL", "zip": "60201", "snow_depth": 9, "rdate": "2014-01-01 06:12:13"},
                {"id": 10, "city": "Evanston", "state": "IL", "zip": "60201", "snow_depth": 10, "rdate": "2014-01-01 07:04:03"},
                {"id": 11, "city": "Evanston", "state": "IL", "zip": "60208", "snow_depth": 11, "rdate": "2014-01-01 08:02:09"}
            ];
        var l = snows.length;
        var sql = "INSERT OR REPLACE INTO weather " +
            "(id, city, state, zip, snow_depth, rdate) " +
            "VALUES (?, ?, ?, ?, ?, ?)";
        var s;
        for (var i = 0; i < l; i++) {
            s = snows[i];
            tx.executeSql(sql, [s.id, s.city, s.state, s.zip, s.snow_depth, s.rdate],
                    function() {
                        console.log('INSERT success');
                    },
                    function(tx, error) {
                        alert('INSERT error: ' + error.message);
                    });
        }
    }

    this.All = function(tx, callback) {
        this.db.transaction(
            function(tx) {

                var sql = "SELECT * FROM weather";

                tx.executeSql(sql, [], function(tx, results) {
                    var len = results.rows.length,
                        snows = [],
                        i = 0;
                    for (; i < len; i = i + 1) {
                        snows[i] = results.rows.item(i);
                    }
                    callback(snows);
                });
            },
            function(error) {
                alert("Transaction Error: " + error.message);
            }
        );
    }

    this.findByName = function(searchKey, callback) {
        this.db.transaction(
            function(tx) {

                var sql = "SELECT e.id, e.firstName, e.lastName, e.title, count(r.id) reportCount " +
                    "FROM employee e LEFT JOIN employee r ON r.managerId = e.id " +
                    "WHERE e.firstName || ' ' || e.lastName LIKE ? " +
                    "GROUP BY e.id ORDER BY e.lastName, e.firstName";

                tx.executeSql(sql, ['%' + searchKey + '%'], function(tx, results) {
                    var len = results.rows.length,
                        snows = [],
                        i = 0;
                    for (; i < len; i = i + 1) {
                        snows[i] = results.rows.item(i);
                    }
                    callback(snows);
                });
            },
            function(error) {
                alert("Transaction Error: " + error.message);
            }
        );
    }

    this.findById = function(id, callback) {
        this.db.transaction(
            function(tx) {

                var sql = "SELECT e.id, e.firstName, e.lastName, e.title, e.city, e.officePhone, e.cellPhone, e.email, e.managerId, m.firstName managerFirstName, m.lastName managerLastName, count(r.id) reportCount " +
                    "FROM employee e " +
                    "LEFT JOIN employee r ON r.managerId = e.id " +
                    "LEFT JOIN employee m ON e.managerId = m.id " +
                    "WHERE e.id=:id";

                tx.executeSql(sql, [id], function(tx, results) {
                    callback(results.rows.length === 1 ? results.rows.item(0) : null);
                });
            },
            function(error) {
                alert("Transaction Error: " + error.message);
            }
        );
    };

    this.initializeDatabase(successCallback, errorCallback);

}
