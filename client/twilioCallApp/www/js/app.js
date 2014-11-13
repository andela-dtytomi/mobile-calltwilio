// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('twilioCallApp', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.factory('API', function($http) {
  var api = {};
  var baseURL = 'http://5e2f44c8.ngrok.com';

  api.sendMsg = function(to, text) {
    return $http.post(baseURL + '/sendmsg', {
      "to": to,
      "text": text
    });
  };
 
  api.triggerCall = function(to) {
    return $http.post(baseURL + '/triggercall', {
      "to": to
    });
  };

  return api;
})

.controller('AppCtrl', function($scope, $ionicLoading, $ionicPopup, API) {
  $scope.processing = false;

  $scope.show = function(message) {
    $ionicLoading.show({
      template: message
    });
  };

  $scope.hide = function() {
    $ionicLoading.hide();
  };
  
  $scope.showAlert = function(msg) {
    $ionicPopup.alert({
      title: msg.title,
      template: msg.message,
      okText: 'Cool',
      okType: 'button-assertive'
    });
  };

  $scope.sendMessage = function() {
    $scope.processing = true;
    $scope.show('Sending Message...');
    API.sendMsg($scope.msgTo, $scope.msgText).then(function(data){

      if (data.data.status == 'success') {
        $scope.msgTo = '';
        $scope.msgText = '';
        $scope.showAlert({
          title: "Success",
          message: "Message sent successfully"
        });
      } else {
        $scope.showAlert({
          title: "Oops!!",
          message: "Oops something went wrong! Please try again later."
        });
      }

      $scope.hide();
      $scope.processing = false;

    });
  };

  $scope.triggerCall = function() {
    $scope.processing = true;
    $scope.show('Triggering a call...');
    API.triggerCall($scope.callTo).then(function(data) {

      if (data.data.status == 'success') {
        $scope.callTo = '';
        $scope.showAlert({
          title: "Success",
          message: "Call trigerred successfully"
        });
      } else {
        $scope.showAlert({
          title: "Oops!!",
          message: "Oops something went wrong! Please try again later."
        });
      }

      $scope.hide();
      $scope.processing = false;

    });
  };

});

// .config(function($stateProvider, $urlRouterProvider) {

//   // Ionic uses AngularUI Router which uses the concept of states
//   // Learn more here: https://github.com/angular-ui/ui-router
//   // Set up the various states which the app can be in.
//   // Each state's controller can be found in controllers.js
//   $stateProvider

//     // setup an abstract state for the tabs directive
//     .state('tab', {
//       url: "/tab",
//       abstract: true,
//       templateUrl: "templates/tabs.html"
//     })

//     // Each tab has its own nav history stack:

//     .state('tab.dash', {
//       url: '/dash',
//       views: {
//         'tab-dash': {
//           templateUrl: 'templates/tab-dash.html',
//           controller: 'DashCtrl'
//         }
//       }
//     })

//     .state('tab.friends', {
//       url: '/friends',
//       views: {
//         'tab-friends': {
//           templateUrl: 'templates/tab-friends.html',
//           controller: 'FriendsCtrl'
//         }
//       }
//     })
//     .state('tab.friend-detail', {
//       url: '/friend/:friendId',
//       views: {
//         'tab-friends': {
//           templateUrl: 'templates/friend-detail.html',
//           controller: 'FriendDetailCtrl'
//         }
//       }
//     })

//     .state('tab.account', {
//       url: '/account',
//       views: {
//         'tab-account': {
//           templateUrl: 'templates/tab-account.html',
//           controller: 'AccountCtrl'
//         }
//       }
//     });

//   // if none of the above states are matched, use this as the fallback
//   $urlRouterProvider.otherwise('/tab/dash');

// });

