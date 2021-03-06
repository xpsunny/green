cordova.define("com.pushapps.phonegap.PushApps", function(require, exports, module) {
               function PushNotification() {}
               
               // Call this method in order to register the device to the PushNotification service
               // In the success callback you'll retreive the device push token
               PushNotification.prototype.registerDevice = function (googleProjectId, pushAppsToken, successCallback, errorCallback) {
               cordova.exec(
                            successCallback,
                            errorCallback,
                            'PushAppsPlugin',
                            'registerUser',
                            [{
                             "googleProjectId": googleProjectId,
                             "appToken": pushAppsToken
                             }]
                            );
               };
               
               // Call this method to unregister this device from the push notification service
               PushNotification.prototype.unRegisterDevice = function (successCallback, errorCallback) {
               cordova.exec(
                            successCallback,
                            errorCallback,
                            'PushAppsPlugin',
                            'unRegisterUser',
                            []
                            );
               };
               
               // Check if the user enabled push notifications - iOS ONLY
               PushNotification.prototype.isPushEnabled = function (successCallback, errorCallback) {
               cordova.exec(
                            successCallback,
                            errorCallback,
                            'PushAppsPlugin',
                            'isPushEnabled',
                            []
                            );
               };
               
               // Call this method to get the device id
               PushNotification.prototype.getDeviceId = function (successCallback, errorCallback) {
               cordova.exec(
                            successCallback,
                            errorCallback,
                            'PushAppsPlugin',
                            'getDeviceId',
                            []
                            );
               };
               
               PushNotification.prototype.setTags = function (tags, successCallback, errorCallback) {
               cordova.exec(
                            successCallback,
                            errorCallback,
                            'PushAppsPlugin',
                            'setTags',
                            tags
                            );
               };
               
               PushNotification.prototype.removeTags = function (tagIdentifiers, successCallback, errorCallback) {
               cordova.exec(
                            successCallback,
                            errorCallback,
                            'PushAppsPlugin',
                            'removeTags',
                            tagIdentifiers
                            );
               };
               
               
               // Event spawned when a notification is received
               PushNotification.prototype.messageReceive = function (messageParams) {
               
                    // The notification object
                    var notification = JSON.parse(messageParams);
               
                    var devicePlatform = device.platform;               
                    if (devicePlatform === "Android") {
               
                        for (var key in notification) {
                            if (notification.hasOwnProperty(key)) {
                                var txt = document.createElement("textarea");
                                txt.innerHTML = notification[key];
                                notification[key] = txt.value;
                            }
                        }
               
                    }
               
                    var ev = document.createEvent('HTMLEvents');
                    ev.notification = notification;
                    ev.initEvent('pushapps.message-received', true, true, arguments);
                    document.dispatchEvent(ev);
               };
               
               module.exports = new PushNotification();
});
               

