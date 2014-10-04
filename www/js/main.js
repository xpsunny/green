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

        this.dateTime();
        this.showData();
        this.checkSnow();
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

    checkSnow: function() {
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
                alert("No need to panic. The plows aren't coming today.");
            }
        });

        

    }
};

app.initialize();

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}