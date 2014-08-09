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

.controller( 'HomeController', function HomeController ( $scope, $location, MarvelService) {
    $scope.slideInterval = 4000;

    $scope.slides = [
      {
        image: "http://emertainmentmonthly.com/wp-content/uploads/2014/07/Marvel-1.jpg",
        title: "Marvel-us",
        text: "Browse the Marvel API in style"
      },
      {
        image: "http://thanley.files.wordpress.com/2013/07/womenatmarveloct.png",
        title: "Comics",
        text: "Look through Marvels vast array of comics"
      },
      {
        image: "http://www.withanaccent.com/wp-content/uploads/2014/07/IMG_1090.jpg",
        title: "Creators",
        text: "Find out who creates your favorite comics"
      }
    ];

    $scope.pages = [
      {
        title: 'Comics',
        description: 'Explore through Marvels vast selection of comics',
        image: "http://img4.wikia.nocookie.net/__cb20120526155552/marvelmovies/images/0/0b/Avengers-mural.jpg"
      },
      {
        title: 'Creators',
        description: "Explore the creative minds of the women, men and persyns who create Marvel's amazing comics",
        image: "http://cdn.screenrant.com/wp-content/uploads/Joe-Quesada-Marvel.jpg"
      },
      {
        title: "Characters",
        description: 'Explore the women, men, organizations, alien species, deities, animals, non-corporeal entities, trans-dimensional manifestations, abstract personifications, and green amorphous blobs which occupy the Marvel Universe (and various alternate universes, timelines and altered realities therein).',
        image: "http://www.hdwallpaperphoto.com/wp-content/uploads/2014/01/jarvis-iron-man-wallpaper-android-40.jpg"
      }
    ]
});
