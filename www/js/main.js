var app = {

    findByName: function() {
        console.log('findByName');
        // this.store.findByName($('.search-key').val(), function(employees) {
        //     var l = employees.length;
        //     var e;
        //     $('.employee-list').empty();
        //     for (var i=0; i<l; i++) {
        //         e = employees[i];
        //         $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
        //     }
        // });

        this.store.All($('.search-key').val(), function(weatherData) {
            var l = weatherData.length;
            console.log(weatherData);
            var w;
            $('.employee-list').empty();
            for (var i=0; i<l; i++) {
                w = weatherData[i];
                $('.employee-list').append('<li><a href="#weather/' + w.id + '">'+ "ID: "+ w.id+ ", Snowfall:" + w.snow);
            }
        });

    },

    initialize: function() {
        var self = this;
        this.store = new MemoryStore();
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