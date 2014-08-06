angular.module('marvelUs', [
      'home',
      'ui.router',
      'ui.bootstrap'
      // 'ngAnimate', 
      // 'fx.animations'
])

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true)
  $urlRouterProvider.otherwise("/");
})


.controller( 'MainController', function AppCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageName = toState.data.pageTitle ;
      $scope.pageTitle = $scope.pageName + ' | Marvel-us' ;
    }
  });
})

.constant('ApiKey', '353d4637ab79ee4a2aa59db0cce149ca')

.factory( 'MarvelRequest', function MarvelService($http, ApiKey){

  var getData = function(type, id, subclass){
    var requestString = 'http://gateway.marvel.com/v1/public/'

    for(var i = 0; i < arguments.length; i++){
      requestString += arguments[i] + '/'
    }
    var requestOptions = { 
        params: { 'apikey': apikey },
        cache: true
      }
    return $http.get(requestSring, requestOptions);
  }
  return {
    getData   : getData
  }
});
