angular.module('marvelUs', [
      'home',
      'comics',
      'ui.router',
      'ui.bootstrap'
      // 'ngAnimate', 
      // 'fx.animations'
])

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise("/");
})

.controller( 'MainController', function AppCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle  ;
    }
  });
})

.constant('ApiKey', '353d4637ab79ee4a2aa59db0cce149ca')

.factory( 'MarvelService', function MarvelService($http, ApiKey){
  var entryPoint = 'http://gateway.marvel.com/v1/public/';
  var marvelService = {};

  marvelService.get = function(type, id, subclass){
    var requestString = entryPoint;
    for(var i = 0; i < arguments.length; i++){
      requestString += arguments.length > 1 ? arguments[i] + '/' : arguments[i]
    }

    var requestOptions = { 
        params: { 'apikey': ApiKey },
        cache: true
      }
    return $http.get(requestString, requestOptions);
  };

  return marvelService;
})
;
