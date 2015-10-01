/*
* Modulo Criado : starter.controllers;
* include module: ionic
*/
angular.module('starter.controllers', ['ionic'])
/***********************************************************************************
* Controller : AppCtrl
* $ionicModal: Serviço para abilitar modal IONIC
* $timeout :  Serviço com metodos com temporizadores
* $state : Serviço utilizado na app para direcionar para paginas
***********************************************************************************/
.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state) {
  
	$scope.logout = function() {
		$state.go('welcome');
	};
  
})
/***********************************************************************************
* Controller : vouchersCtrl
* $stateParams: Serviço utilizado para redirecionar parametros pela URL como um php
* doRefresh: realiza o refresh dos vouchers, assim solicitando do banco
***********************************************************************************/
.controller('vouchersCtrl', function($scope, $stateParams, $timeout, statesService) {
	
	// responsavel por ordenar o refresh
	$scope.doRefresh = function() {
		statesService.getRefresh();
		$timeout(function() {
			statesService.setData();
			$scope.$broadcast('scroll.refreshComplete');	
		},4000);
	};
	
	$scope.vouchers = [
		{ title: 'Voucher Ativo', status: 'A'},
		{ title: 'Voucher Utilizado', status: 'U'},
		];
	})
/***********************************************************************************
* Controller : voucherCtrl
* $stateParams: Serviço utilizado para redirecionar parametros pela URL como um php
***********************************************************************************/
.controller('voucherCtrl', function($scope, $stateParams, $http, statesService) {
		
	if($stateParams.voucherId == 'A'){
		$scope.show = function(todo) {
			if(todo == '0'){
				return true
			}
			
		};
		$scope.title = 'Vouchers Ativos';
		$scope.status = '0';		
		/*$http({
		url: 'http://app.rjag.com.br/app-IOS/login-3.php', 
		method: "POST",
		params: {email: statesService.email, senha:statesService.senha, status:0}
		});*/
		
		$scope.todos = statesService.getData();
		
		
	
	}else if($stateParams.voucherId == 'U'){
		
		$scope.title = 'Vouchers Utilizados';	
		$scope.status = '1';
		
		$scope.show = function(todo) {
			if(todo == '1'){
				return true
			}
			
		};	
	
		$scope.todos = statesService.getData();
	
	}
})


/***********************************************************************************
* Controller : vouchersCtrl
* $stateParams: Serviço utilizado para redirecionar parametros pela URL como um php
* doRefresh: realiza o refresh dos vouchers, assim solicitando do banco
***********************************************************************************/
.controller('vouchersCtrl', function($scope, $stateParams, $timeout, statesService) {
	
	// responsavel por ordenar o refresh
	$scope.doRefresh = function() {
		statesService.getRefresh();
		$timeout(function() {
			statesService.setData();
			$scope.$broadcast('scroll.refreshComplete');	
		},4000);
	};
	
	$scope.vouchers = [
		{ title: 'Voucher Ativo', status: 'A'},
		{ title: 'Voucher Utilizado', status: 'U'},
		];
})

	
/***********************************************************************************
* Controller : unidadesLets
* $stateParams: Serviço utilizado para redirecionar parametros pela URL como um php
***********************************************************************************/
.controller('unidadesLets', function($scope, $stateParams, $http, statesService) {
		
	$scope.unidades = [
		{ title: 'Indaiatuba', endereco: 'Av. Presidente Kennedy, 1070', bairro: 'Cidade Nova', tel: ''},
		{ title: 'Cambuí', endereco: 'Rua Américo Brasiliense, 166', bairro: 'Cambuí', tel: ''},
		{ title: 'Itu', endereco: 'Av. Dr. Otaviano Pereira Mendes, 199', bairro: '', tel: '(11) 2429.9829 | 2429.9831'},
		{ title: 'Vila Madalena', endereco: 'Rua Inacio Pereira da Rocha, 359', bairro: '', tel: ''},
		{ title: 'Piracicaba', endereco: 'Av. Maria Elisa, 44', bairro: 'Vila Rezende', tel: '(19) 2534-3804'},
		{ title: 'Aracaju', endereco: 'Rua Dr. Osório de Araújo Ramos, 260 (sala 05)', bairro: 'Galeria Denise Goes | Praia 13 de Julho', tel: ''},
		{ title: 'Valinhos', endereco: 'Em breve', bairro: '', tel: ''}
	];
	
/*	 $scope.groups = [];
	 
	  for (var i=0; i<10; i++) {
		$scope.groups[i] = {
		  name: i,
		  items: []
		};
		for (var j=0; j<3; j++) {
		  $scope.groups[i].items.push(i + '-' + j);
		}
	  }
*/

	  $scope.toggleUnidade = function(unidade) {
		  console.dir(unidade);
		if ($scope.isUnidadeShown(unidade)) {
		  $scope.shownUnidade = null;
		} else {
		  $scope.shownUnidade = unidade;
		}
	  };
	  $scope.isUnidadeShown = function(unidade) {
		return $scope.shownUnidade === unidade;
	  };
  

})


