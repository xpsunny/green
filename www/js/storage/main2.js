var app = {

    findByName: function() {
        console.log('All');
        // this.store.findByName($('.search-key').val(), function(employees) {
        //     var l = employees.length;
        //     var e;
        //     $('.employee-list').empty();
        //     for (var i=0; i<l; i++) {
        //         e = employees[i];
        //         $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
        //     }
        // });

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
        this.store = new WebSqlStore2();
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
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
    }

};

app.initialize();