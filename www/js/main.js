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
        this.showData();
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

    gogogo: function() {
        this.playBeep();
        this.vibrate();
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
            for (var i= l-5; i < l; i++) {
                s = snows[i];
                $('.snow-list').prepend("<tr> <td>" + s.rdate +"</td> <td>" + s.snow_depth + '</td></tr>');
            }
        });
    },

    showMore: function() {
        this.store.All($('.search-key').val(), function(snows) {
            var l = snows.length;
            snowdata = snows;
            var s;
            $('.snow-list').empty();
            for (var i=0; i < l; i++) {
                s = snows[i];
                $('.snow-list').prepend("<tr> <td>" + s.rdate +"</td> <td>" + s.snow_depth + '</td></tr>');
            }
        });
        $('#morebtn').hide();
    },

    dateTime: function() {
        var dumDate = new Date(2014,0,1,6,10,10);
        dumDate = dumDate.toLocaleString();
        $('.dateTime').html(dumDate);
    },

    checkSnowEvanston: function() {
        var dummyCurrTime = new Date("2014-01-01 06:10:10");

        this.store.All($('.search-key').val(), function(snowdata) {
            var maxSnow = 0;
            var changeSnow = 0;
            var logLen = snowdata.length;

            for(var i = 0; i < logLen; i++) {
                if (new Date(snowdata[i].rdate) > dummyCurrTime) {
                    break;
                }
                if (snowdata[i].snow_depth > maxSnow) {
                    maxSnow = snowdata[i].snow_depth;
                }
            }

            changeSnow = maxSnow - snowdata[0].snow_depth;

            if (changeSnow >= 2) {
                alert("Move your car before 8am. There was " + changeSnow + " inches of snow overnight -- don't forget your boots!");
            } else {
                alert("No need to panic. Keep your car right where it is.");
            }
        });
    },

    checkSnowChicago: function() {
        var dummyCurrTime = new Date("2014-01-01 06:10:10");

        this.store.All($('.search-key').val(), function(snowdata) {
            var maxSnow = 0;
            var changeSnow = 0;
            var logLen = snowdata.length;
            console.log("logLen is " + logLen);

            for(var i = (logLen - 6); i < logLen; i++) {
                if (new Date(snowdata[i].rdate) > dummyCurrTime) {
                    break;
                }
                if (snowdata[i].snow_depth > maxSnow) {
                    maxSnow = snowdata[i].snow_depth;
                }

            }

            console.log("first hour's depth is " + snowdata[logLen - 6].snow_depth)
            console.log("max is " + maxSnow);
            changeSnow = maxSnow - snowdata[logLen - 6].snow_depth;
            console.log("snow diff is " + changeSnow);

            if (changeSnow >= 2) {
                alert("Move your car immediately. There has been " + changeSnow + " inches of snowfall in the past 2 hours -- don't forget your boots!");
            } else {
                alert("No need to panic. Keep your car right where it is.");
            }
        });
    },

    fetchData: function() {
        alert('click fetch');
        var fetch;
        this.store.fetchApi($('.search-key').val(), function(fetch){
            $.each(fetch, function( index, value ){
                $("#show_temperature").append(value['snow_depth']);
            });
        });
    }
};

app.initialize();