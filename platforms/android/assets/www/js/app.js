/*
* Modulo Criado : starter;
* include module: ionic
*include module : starter.controllers
* include module : starter.welcomeController
*/
angular.module('starter', ['ionic','ionic.service.core', 'ionic.service.deploy', 'starter.controllers'])

/*.config(['$ionicAppProvider', function($ionicAppProvider) {
  // Identify app
  $ionicAppProvider.identify({
    // The App ID (from apps.ionic.io) for the server
    app_id: 'ad0347df',
    // The public API key all services will use for this app
    api_key: 'cf884265ec1abeac6cca906ead5e4847483a2bc7b7d3bc02'
  });
}])*/
	
.run(function($ionicPlatform) {
	
		
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


.config(function ($stateProvider, $urlRouterProvider, USER_ROLES) {
  $stateProvider
  .state('app', {
    url: '/app',
    templateUrl: 'templates/menu.html',
    controller: 'WelcomeCtrl'
  })
  .state('welcome', {
    url: '/welcome',
    templateUrl: 'templates/welcome.html',
    controller: 'WelcomeCtrl'
  })
  .state('app.single', {
    url: '/vouchers/:voucherId',
    views: {
        'menuContent': {
          templateUrl: 'templates/voucher.html',
          controller: 'voucherCtrl'
        }
    }
/*	,
    data: {
      authorizedRoles: [USER_ROLES.admin] // bloquear permissao para usuarios comuns
    }*/
  })
    .state('app.unidades', {
    url: '/unidades',
    views: {
  		'menuContent': {
    	templateUrl: "templates/unidades.html",
    	controller: 'unidadesLets'
  		}
  	}
  })
  .state('app.vouchers', {
    url: '/vouchers',
    views: {
  		'menuContent': {
    	templateUrl: "templates/vouchers.html",
    	controller: 'vouchersCtrl'
  		}
  	}
  });
  
  // Thanks to Ben Noblet!
  $urlRouterProvider.otherwise(function ($injector, $location) {
    var $state = $injector.get("$state");
    $state.go("app.vouchers");
  });
})

.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
 
    if ('data' in next && 'authorizedRoles' in next.data) {
      var authorizedRoles = next.data.authorizedRoles;
      if (!AuthService.isAuthorized(authorizedRoles)) {
        event.preventDefault();
        $state.go($state.current, {}, {reload: true});
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      }
    }
 
    if (!AuthService.isAuthenticated()) {
      if (next.name !== 'welcome') {
        event.preventDefault();
        $state.go('welcome');
      }
    }
  });
})

.run(function($timeout, statesService) {
	var token = window.localStorage.getItem('yourTokenKey');
	if(token > ''){
		statesService.getRefresh();
		$timeout(function() {
			statesService.setData();
		},1000);
	}
})