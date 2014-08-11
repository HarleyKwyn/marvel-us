angular.module('comics', [
    'ui.router',
    'ui.bootstrap' ])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('comics', {
      url: "/comics",
      templateUrl: "/public/app/comics/comics.tpl.html",
      controller: "ComicsController",
      data: { pageTitle : "Comics"}
    })
    .state('comicsID',{
      url: "/comics/:comicID",
      templateUrl: "/public/app/comics/comics.single.tpl.html",
      controller: "ComicsController",
      data: {}
    });
})

.controller('ComicsController', function ComicsController($scope, $location, $stateParams, MarvelService){
  var path = ['comics'];
  if($stateParams.comicID){
    path.push($stateParams.comicID);
  }
  $scope.loading = false;
  $scope.settingCollapse = true;
  $scope.comics = null;
  $scope.numberOfResults = 0;

  var requestConfig = {};
  var requestOptions = {
    orderBy : '-modified',
    limit: 10,
    offset: 0
  };
  
  requestConfig.path = path;
  requestConfig.queryParams = requestOptions;

  MarvelService.get(requestConfig)
    .success(function(response){
      $scope.comics = response.data.results;
      $scope.numberOfResults = response.data.total;
      console.log($scope.comics);
    })
    .error(function(response, status) {
      console.log("Error", response, status);
    });

  $scope.loadMore = function(){
    console.log("trigger load");
    var currentOffset = requestOptions.offset;
    var currentLimit = requestOptions.limit;
    requestOptions.offset = currentOffset + currentLimit;

    requestConfig.queryParams = requestOptions;
    
    MarvelService.get(requestConfig)
      .success(function(response){
        $scope.loading = false;
        $scope.comics = $scope.comics.concat(response.data.results);
      })
      .error(function(response, status) {
        console.log("Error", response, status);
      });
  };

  $scope.redirect = function(resourceURI, pageType){
    var url = '/'+pageType + '/';
    var tokens = resourceURI.split('/');
    var id = findID(tokens);

    if(id){
      url += id;
      $location.path(url);
    }

    function findID(tokens){
      var conversion;
      for (var i = tokens.length - 1; i >= 0; i--) {
        conversion = parseInt(tokens[i]);
        if(conversion) return conversion;
      }
      return NaN;
    }
  };
})
;
angular.module('creators', [
    'ui.router',
    'ui.bootstrap' ])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('creators', {
      url: "/creators",
      templateUrl: "/public/app/creators/creators.tpl.html",
      controller: "CreatorsController",
      data: { pageTitle : "Creators"}
    })
    .state('creatorsID',{
      url: "/creators/:creatorID",
      templateUrl: "/public/app/creators/creators.single.tpl.html",
      controller: "CreatorsController",
      data: {pageTitle: "Creators"}
    });
})

.controller('CreatorsController', function CreatorsController($scope, $location, $stateParams, MarvelService){
  var path = ['creators'];
  if($stateParams.creatorID){
    path.push($stateParams.creatorID);
  }
  $scope.loading = false;
  $scope.settingCollapse = true;
  $scope.creators = null;
  $scope.numberOfResults = 0;

  var requestConfig = {};
  var requestOptions = {
    orderBy : '-modified',
    limit: 10,
    offset: 0
  };
  
  requestConfig.path = path;
  requestConfig.queryParams = requestOptions;

  MarvelService.get(requestConfig)
    .success(function(response){
      $scope.creators = response.data.results;
      $scope.numberOfResults = response.data.total;
      console.log($scope.creators);
    })
    .error(function(response, status) {
      console.log("Error", response, status);
    });

  $scope.loadMore = function(){
    console.log("trigger load");
    var currentOffset = requestOptions.offset;
    var currentLimit = requestOptions.limit;
    requestOptions.offset = currentOffset + currentLimit;

    requestConfig.queryParams = requestOptions;
    
    MarvelService.get(requestConfig)
      .success(function(response){
        $scope.loading = false;
        $scope.creators = $scope.creators.concat(response.data.results);
      })
      .error(function(response, status) {
        console.log("Error", response, status);
      });
  };

  $scope.redirect = function(resourceURI, pageType){
    var url = '/'+pageType;
    var tokens = resourceURI.split('/');
    var id = findID(tokens);

    if(id){
      url += id;
      $location.path(url);
    }

    function findID(tokens){
      var conversion;
      for (var i = tokens.length - 1; i >= 0; i--) {
        conversion = parseInt(tokens[i]);
        if(conversion) return conversion;
      }
      return NaN;
    }
  };
})
;
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
