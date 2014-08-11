angular.module('marvelUs', [
      'home',
      'comics',
      'creators',
      'ui.router',
      'ui.bootstrap'
      // 'ngAnimate', 
      // 'fx.animations'
])

.config(function($locationProvider,$urlRouterProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise("/");
})

.controller( 'MainController', function AppCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.navIsCollapsed = true;
      $scope.pageTitle = toState.data.pageTitle  ;
    }
  });
  $scope.navIsCollapsed = true;
})

.constant('ApiKey', '353d4637ab79ee4a2aa59db0cce149ca')

.factory( 'MarvelService', function MarvelService($http, ApiKey){
  var entryPoint = 'http://gateway.marvel.com/v1/public/';

  var marvelService = {};
  marvelService.get = function(requestConfig){
    var requestString = entryPoint;
    var pathExtension = requestConfig.path;
    var queryParams = requestConfig.queryParams ? requestConfig.queryParams : {} ;
    queryParams.apikey = ApiKey;

    for(var i = 0; i < pathExtension.length; i++){
      requestString += pathExtension.length > 1 && i < pathExtension.length-1 ? pathExtension[i] + '/' : pathExtension[i];
    }

    var requestOptions = { 
        params: queryParams,
        cache: true
      };
    return $http.get(requestString, requestOptions);
  };

  marvelService.getURI = function(resourceURI){
    return $http.get(resourceURI, {'apikey': ApiKey});
  };

  return marvelService;
})

.directive("infiniteScroll", function($window){
  return {
    
    restrict: 'A',
    link: function(scope, elem, attrs){
      var scrollElement = elem[0];
      angular.element($window).bind("scroll", function() {
         if (this.innerHeight + this.scrollY +100 > scrollElement.offsetHeight && scope.loading === false) {
            scope.loading = true;
            scope.$apply(attrs.infiniteScroll);
         }
      });
    }
  };
})
;
