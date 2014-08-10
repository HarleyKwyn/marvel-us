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
      url: "/comics/:comicID/",
      templateUrl: "",
      controller: "ComicsController",
      data: {pageTitle: "Comics"}
    })
})

.controller('ComicsController', function ComicsController($scope, $location, $stateParams,MarvelService){
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle ;
    }
  });

  var marvelAPI = MarvelService;
  var requestConfig = {}
  var path = ['comics'];
  
  requestConfig.path = path;
  $scope.loading = false;
  $scope.settingCollapse = true;
  $scope.comics = null;
  $scope.numberOfResults = 0;
  $scope.options = {
    limit: 10,
    offset: 0
  };
  requestConfig.queryParams = $scope.options;
  marvelAPI.get(requestConfig)
    .success(function(response){
      console.log(response.data);
      $scope.comics = response.data.results
      console.log($scope.comics);
    })
    .error(function(response, status) {
      console.log("Error", response, status);
    });

  $scope.loadMore = function(){
    var currentOffset = $scope.options.offset;
    var currentLimit = $scope.options.limit;
    $scope.options.offset = currentOffset + currentLimit;

    requestConfig.queryParams = $scope.options;
    console.log("trigger load")
    marvelAPI.get(requestConfig)
      .success(function(response){
        $scope.loading = false;
        $scope.comics = $scope.comics.concat(response.data.results);
      })
      .error(function(response, status) {
        console.log("Error", response, status);
      });
  };

})
;