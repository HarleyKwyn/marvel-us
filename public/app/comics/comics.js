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
    })
})

.controller('ComicsController', function ComicsController($scope, $location, $stateParams, MarvelService){
  var path = ['comics'];
  if($stateParams.comicID){
    path.push($stateParams.comicID)
  }
  $scope.loading = false;
  $scope.settingCollapse = true;
  $scope.comics = null;
  $scope.numberOfResults = 0;

  var requestConfig = {}
  var requestOptions = {
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
      var url = url+id;
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