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