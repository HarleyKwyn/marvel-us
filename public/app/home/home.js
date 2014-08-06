angular.module('home', [      
    'ui.router',
    'ui.bootstrap'
])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "app/home/home.tpl.html",
      controller: "HomeController",
      data: { pageTitle : "Home"}
    })
})

.controller( 'HomeController', function HomeController ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageName = toState.data.pageTitle + ' | Marvel-us' ;
      console.log(toState);
    }
  });
});
