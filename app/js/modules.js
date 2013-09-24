angular.module('main',["directives","controllers","services"]);

var dirmod = angular.module("directives", []);
var contmod = angular.module("controllers", []);
var sermod = angular.module("services", ["ngResource"]);

contmod.controller("CoverflowController",function($scope){
  var thumbsAnimating = false;

 $scope.slideRight = function(){
  
  if (thumbsAnimating) {
  console.log("animating");
  return false;
  }
  
  $scope.activeArrowLeft = "active";
  $scope.activeArrowRight = "active";
  
  var slideLeft = parseInt($("#mainAreaSl .mainAreaIn").css("left"));
  var coverFlowLength = parseInt($("#mainAreaSl .mainAreaIn").width());
  console.log("coverFlowLength " + coverFlowLength);
  console.log("slideLeft " + slideLeft);
  var newLeft = slideLeft - 1135;
  var nextLeft = newLeft - 1135;
  var nexLeftAbs = Math.abs(nextLeft);
  console.log("newLeft" + newLeft);
  var newLeftAbs = Math.abs(newLeft);
  
  if(nexLeftAbs>coverFlowLength){
     var toMove = slideLeft - (coverFlowLength - newLeftAbs);
     $scope.activeArrowRight = "unactive";   
  }else{
  var toMove = newLeft;
  }
  
  thumbsAnimating = true;
  $("#mainAreaSl .mainAreaIn").animate({left: toMove},1000,function(){
  thumbsAnimating = false;
  });
 }
 
  $scope.slideLeft = function(){
  
  if (thumbsAnimating) {
  console.log("animating");
  return false;
  }
  
  
    $scope.activeArrowLeft = "active";
    $scope.activeArrowRight = "active";
    var slideLeft = parseInt($("#mainAreaSl .mainAreaIn").css("left"));
    console.log("slideLeft " + slideLeft);
    var newLeft = slideLeft + 1135;
    if(newLeft > 0){
    var toMove = 0;
    $scope.activeArrowLeft = "unactive"
    }else{
    var toMove = newLeft
    }
    console.log("newLeft" + newLeft);
    
    thumbsAnimating = true;
    $("#mainAreaSl .mainAreaIn").animate({left: toMove},1000,function(){
  thumbsAnimating = false;});
 }
});

sermod.factory("blogCategories",["$resource", function($resource){
 return $resource("/blog/categories");
}]);



sermod.factory("blogArticles",["$resource", "$routeParams", function($resource, $routeParams){
 return $resource("/blog/blogadmin/articles");
}]);

sermod.factory("blogArticlesCzech",["$resource", "$routeParams", function($resource, $routeParams){
 return $resource("/blog/blogadmin/articles/cz");
}]);

sermod.factory("blogArticle",["$resource", "$routeParams", function($resource, $routeParams){
 return $resource("/blog/blogadmin/articles/:id",{id:'@id'});
}]);

sermod.factory('blogArticleLoader',['$location','blogArticle','$q',"$routeParams",
  function($location, blogArticle, $q, $routeParams){
   return function(){
    var delay = $q.defer();

    blogArticle.get({id: $routeParams.id},function(blogArticle){
      delay.resolve(blogArticle);
    },function(){
      delay.reject("unable to fetch blogCategories");
    });
    return delay.promise;
   }
  }
]);

sermod.factory('blogCategoriesLoader',['blogCategories','$q',
  function(blogCategories, $q){
   return function(){
    var delay = $q.defer();
    blogCategories.query(function(blogCategories){
      delay.resolve(blogCategories);
    },function(){
      delay.reject("unable to fetch blogCategories");
    });
    return delay.promise;
   }
  }
]);

sermod.factory('blogArticlesLoader',['blogArticles','$q','$routeParams',
  function(blogArticles, $q, $routeParams){
   return function(){
    var delay = $q.defer();
    blogArticles.query(function(blogArticles){
      delay.resolve(blogArticles);
    },function(){
      delay.reject("unable to fetch blogCategories");
    });
    return delay.promise;
   }
  }
]);

sermod.factory('blogArticlesLoaderCzech',['blogArticlesCzech','$q','$routeParams',
  function(blogArticles, $q, $routeParams){
   return function(){
    var delay = $q.defer();
    blogArticles.query(function(blogArticles){
      delay.resolve(blogArticles);
    },function(){
      delay.reject("unable to fetch blogCategories");
    });
    return delay.promise;
   }
  }
]);

sermod.factory('blogArticleDeleter',['$location', 'blogArticle','$q','$routeParams',
  function($location, blogArticle, $q, $routeParams){
   return function(id, scope){
    var delay = $q.defer();
    blogArticle.delete({id:id},function(){
      
      $location.url("/blogadmin/articlestoshow");
      delay.resolve('hotovo');
    });
    return delay.promise;
   }
  }
]);

contmod.controller("blogArticles",["$location", "$scope","blogArticlesLoader","blogArticleDeleter", function($location, $scope, blogArticlesLoader,blogArticleDeleter){
  blogArticlesLoader().then(function(blogArticles){
    $scope.articles = blogArticles;
    $scope.deleteArticle = function(id){
     
     blogArticleDeleter(id, $scope).then(function(){
      console.log("deferred called");
      blogArticlesLoader().then(function(blogArticles){
        $scope.articles = blogArticles;
      });
     });
     console.log("aspon neco");

     };
    });
 $scope.test = "testovsaci string"
}]);

contmod.controller("blogArticlesCzech",["$location", "$scope","blogArticlesLoaderCzech","blogArticleDeleter", function($location, $scope, blogArticlesLoader,blogArticleDeleter){
  blogArticlesLoader().then(function(blogArticles){
    $scope.articles = blogArticles;
    $scope.deleteArticle = function(id){
     
     blogArticleDeleter(id, $scope).then(function(){
      console.log("deferred called");
      blogArticlesLoader().then(function(blogArticles){
        $scope.articles = blogArticles;
      });
     });
     console.log("aspon neco");

     };
    });
 $scope.test = "testovsaci string"
}]);                                         

contmod.controller("blogadmin",["$scope","blogCategories","blogCategoriesLoader",function($scope, blogCateogories,blogCategoriesLoader){
  blogCategoriesLoader().then(function(blogCategories){
    $scope.bc = blogCategories;
 });
 }]);
 
contmod.controller("blogOne",["$scope","$timeout", "blogArticleLoader", function($scope, $timeout, blogArticleLoader){
  blogArticleLoader().then(function(article){
    
    
    var namesOfMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
    ]
    
    var posted =  new Date(article.created)
         article.dateCreated = posted.getDate();
     var month = article.monthCreated = parseFloat(posted.getMonth());
     article.hoursCreated = posted.getHours();
     article.minutesCreated = posted.getMinutes();
      article.yearCreated = posted.getFullYear();
      article.nameOfMonth = namesOfMonths[month];
     if(parseFloat(article.dateCreated)==1){
      article.nth = "st";
     }else if(parseFloat(article.dateCreated)==2){
      article.nth = "nd";
     }else if(parseFloat(article.dateCreated)==3){
      article.nth = "rd";
     }else if(parseFloat(article.dateCreated)>3){
        article.nth = "th";
     }
     
     $scope.article = article;
    
      
     
  });
}]);
contmod.controller("blogcz",["$scope","blogArticlesLoaderCzech", function($scope, blogArticlesLoader){
  blogArticlesLoader().then(function(blogArticles){
    console.log("callback");
    var actualPage = $scope.actualPage = 0;
    var articlesToShow = showArticles(blogArticles)
    $scope.articles = articlesToShow;

        
    function showArticles(articles){
      
      var start = actualPage * 6;
      var stop = start + 6;
      console.log("start" + start);
      console.log("stop" + stop);
      
      if (((actualPage + 1)*6) >= blogArticles.length) {
        $scope.next = false 
        }else{
      $scope.next = true;
      }
    
      actualPage < 1 ? $scope.previous = false : $scope.previous = true;
      $scope.test = "tst";
      console.log($scope.next);
      console.log($scope.previous);
      console.log($scope.test);
      
      return articles.slice(start, stop);
    }
    
        var artLength = blogArticles.length;
    var namesOfMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
    ]
    for(var i = 0;i<artLength; i++){
     var posted =  new Date(blogArticles[i].created);

     blogArticles[i].dateCreated = posted.getDate();
     var month = blogArticles[i].monthCreated = parseFloat(posted.getMonth());
     blogArticles[i].hoursCreated = posted.getHours();
     blogArticles[i].minutesCreated = posted.getMinutes();
      blogArticles[i].yearCreated = posted.getFullYear();
      blogArticles[i].nameOfMonth = namesOfMonths[month];
     if(parseFloat(blogArticles[i].dateCreated)==1){
      blogArticles[i].nth = "st";
     }else if(parseFloat(blogArticles[i].dateCreated)==2){
      blogArticles[i].nth = "nd";
     }else if(parseFloat(blogArticles[i].dateCreated)==3){
      blogArticles[i].nth = "rd";
     }else if(parseFloat(blogArticles[i].dateCreated)>3){
        blogArticles[i].nth = "th";
     }
     
    }
    

    $scope.artLength = artLength;
    var pages = Math.ceil(artLength/6);
    console.log("pages");
    console.log(pages);
    
    $scope.numberButs = [];
    
    for(var i = 0; i < pages; i++){
      $scope.numberButs[i] = {};
      $scope.numberButs[i].number = (i +1);
      $scope.numberButs[i].action = function(num){
          return function(){
          actualPage = num;
          $scope.actualPage = actualPage;
          console.log("actual page " + actualPage)
          $scope.articles = showArticles(blogArticles);
    
        }
      }(i);
    }
    

    
    $scope.nextPage = function(){
      if($scope.next){
        actualPage++;
        $scope.actualPage = actualPage;
        $scope.articles = showArticles(blogArticles);
      }
    }
    
    
    $scope.prevPage = function(){
      if($scope.previous){
        actualPage--;
        $scope.actualPage = actualPage;
        $scope.articles = showArticles(blogArticles);
      }
    }
    
    if (((actualPage + 1)*6) >= blogArticles.length) {
    $scope.next == false 
    }else{
    $scope.next == true;
    }
    
    actualPage < 1 ? $scope.previous == false : $scope.previous == true;
    
 });
  $scope.test = "testovsaci string"
 }]);
  
contmod.controller("blog",["$scope","blogArticlesLoader", function($scope, blogArticlesLoader){
  blogArticlesLoader().then(function(blogArticles){
    console.log("callback");
    var actualPage = $scope.actualPage = 0;
    var articlesToShow = showArticles(blogArticles)
    $scope.articles = articlesToShow;

        
    function showArticles(articles){
      
      var start = actualPage * 6;
      var stop = start + 6;
      console.log("start" + start);
      console.log("stop" + stop);
      
      if (((actualPage + 1)*6) >= blogArticles.length) {
        $scope.next = false 
        }else{
      $scope.next = true;
      }
    
      actualPage < 1 ? $scope.previous = false : $scope.previous = true;
      $scope.test = "tst";
      console.log($scope.next);
      console.log($scope.previous);
      console.log($scope.test);
      
      return articles.slice(start, stop);
    }
    
        var artLength = blogArticles.length;
    var namesOfMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
    ]
    for(var i = 0;i<artLength; i++){
     var posted =  new Date(blogArticles[i].created);

     blogArticles[i].dateCreated = posted.getDate();
     var month = blogArticles[i].monthCreated = parseFloat(posted.getMonth());
     blogArticles[i].hoursCreated = posted.getHours();
     blogArticles[i].minutesCreated = posted.getMinutes();
      blogArticles[i].yearCreated = posted.getFullYear();
      blogArticles[i].nameOfMonth = namesOfMonths[month];
     if(parseFloat(blogArticles[i].dateCreated)==1){
      blogArticles[i].nth = "st";
     }else if(parseFloat(blogArticles[i].dateCreated)==2){
      blogArticles[i].nth = "nd";
     }else if(parseFloat(blogArticles[i].dateCreated)==3){
      blogArticles[i].nth = "rd";
     }else if(parseFloat(blogArticles[i].dateCreated)>3){
        blogArticles[i].nth = "th";
     }
     
    }
    

    $scope.artLength = artLength;
    var pages = Math.ceil(artLength/6);
    console.log("pages");
    console.log(pages);
    
    $scope.numberButs = [];
    
    for(var i = 0; i < pages; i++){
      $scope.numberButs[i] = {};
      $scope.numberButs[i].number = (i +1);
      $scope.numberButs[i].action = function(num){
          return function(){
          actualPage = num;
          $scope.actualPage = actualPage;
          console.log("actual page " + actualPage)
          $scope.articles = showArticles(blogArticles);
    
        }
      }(i);
    }
    

    
    $scope.nextPage = function(){
      if($scope.next){
        actualPage++;
        $scope.actualPage = actualPage;
        $scope.articles = showArticles(blogArticles);
      }
    }
    
    
    $scope.prevPage = function(){
      if($scope.previous){
        actualPage--;
        $scope.actualPage = actualPage;
        $scope.articles = showArticles(blogArticles);
      }
    }
    
    if (((actualPage + 1)*6) >= blogArticles.length) {
    $scope.next == false 
    }else{
    $scope.next == true;
    }
    
    actualPage < 1 ? $scope.previous == false : $scope.previous == true;
    
 });
  $scope.test = "testovsaci string"
 }]);
 
contmod.controller("blogArticle",["$scope","blogArticleLoader",function($scope,blogArticleLoader){
blogArticleLoader().then(function(article){
  $scope.article = article; 
});
$scope.test = "test";
}]);

contmod.config(function($routeProvider, $locationProvider){
  $locationProvider.html5Mode(true);
  $routeProvider.when('/',{templateUrl:'../partials/blog.html',controller: "blog"})
    .when('/cz',{templateUrl:'../partials/blogCzech.html',controller: "blogcz"})
    .when('/blogadmin',{templateUrl:'../partials/blogadmin.html',controller:"blogadmin"})
    .when('/blogadmin/article/:id',{templateUrl:"../partials/blogadmin.html",controller:'blogadmin'})
    .when('/blogadmin/articlestoshow',{templateUrl:"../partials/blogarticles.html",controller:'blogArticles'})
    .when('/blogadmin/articlestoshow/cz',{templateUrl:"../partials/blogarticles.html",controller:'blogArticlesCzech'})
    .when('/blogadmin/articlestoshow/:id',{templateUrl:"../../partials/blogarticle.html",controller:'blogArticle'})
    
    /*.when('/articles/:id',{templateUrl:'../partials/blogOne.html',controller: "blogOne"});; */
    
})