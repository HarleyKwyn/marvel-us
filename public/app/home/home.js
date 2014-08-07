angular.module('home', [      
    'ui.router',
    'ui.bootstrap'
])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "/public/app/home/home.tpl.html",
      controller: "HomeController",
      data: { pageTitle : "Home"}
    })
})

.controller( 'HomeController', function HomeController ( $scope, $location ) {
    $scope.slideInterval = 4000;
    $scope.slides = [
      {
        image: "http://placekitten.com/1440/560",
        title: "Marvel-us",
        text: "Browse the Marvel API in style"
      },
      {
        image: "http://placekitten.com/1441/560",
        title: "Comics",
        text: "Look through Marvels vast array of comics"
      },
      {
        image: "http://placekitten.com/1442/560",
        title: "Creators",
        text: "Find out who creates your favorite comics"
      }
    ];
});
