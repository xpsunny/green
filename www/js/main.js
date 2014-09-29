var snowdata;
var app = {

    findByName: function() {
        console.log('All');

        this.store.All($('.search-key').val(), function(snows) {
            var l = snows.length;
            console.log(snows);
            var s;
            $('.employee-list').empty();
            for (var i=0; i<l; i++) {
                s = snows[i];
                $('.employee-list').append('<li><a href="#weather/' + s.id + '">'+ "ID: "+ s.id+ ", Snowfall:" + s.snow_depth);
            }
        });

    },

    initialize: function() {
        var self = this;
        this.store = new WebSqlStore();
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
        this.dateTime();
    },


    showAlert: function (message, title) {
        if(this.store.checkSnow()){       
            if (navigator.notification) {
                navigator.notification.alert(message, null, title, 'OK');
            } else {
                alert("Move your car!!! " + this.store.checkSnow());
            }
         } else {
            if (navigator.notification) {
                navigator.notification.alert(message, null, title, 'OK');
            } else {
                alert("There was no snowfall");
            }

         }
    },

    playBeep: function() {
        navigator.notification.beep(3);
    },

    vibrate: function() {
        navigator.notification.vibrate(2000);
    },
    showData: function() {
        this.store.All($('.search-key').val(), function(snows) {
            var l = snows.length;
            snowdata = snows;
            var s;
            $('.snow-list').empty();
            for (var i=0; i<l; i++) {
                s = snows[i];
                $('.snow-list').append('<tr> <td> '+ s.id+ "</td> <td>" +s.rdate +"</td> <td>" + s.snow_depth + '</td></tr>');
            }
        });
    },
    dateTime: function() {
        $('.dateTime').html(Date());
    },

    checkSnow: function() {
        var dummyCurrTime = new Date("2014-01-01 01:10:10")
        for(var i = 0; i<snowdata.length;i++) {
            if(new Date(snowdata[i].rdate) < dummyCurrTime && snowdata[i].snow_depth>=2) {
                alert("Move your car!! There was " + snowdata[i].snow_depth + "inches of snow!");
                break;
            }

        }

    }
};

app.initialize();