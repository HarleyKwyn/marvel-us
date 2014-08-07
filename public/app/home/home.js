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
    $scope.pages = [
      {
        title: 'Comics',
        description: 'Explore through Marvels vast selection of comics'
      },
      {
        title: 'Creators',
        description: "Explore the creative minds of the women, men and persyns who create Marvel's amazing comics"
      },
      {
        title: "Characters",
        description: 'Explore the women, men, organizations, alien species, deities, animals, non-corporeal entities, trans-dimensional manifestations, abstract personifications, and green amorphous blobs which occupy the Marvel Universe (and various alternate universes, timelines and altered realities therein).'
      }
    ]
});
