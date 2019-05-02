var app=angular.module('app',[]);

//templateCache.put(模板名称,模板内容)
//templateCache.put方法的第二个参数不能为url,url模版会自己加缓存
//使用场景：模板内容是通过$http异步获取的.然后将模板放入$templateCache中以便将来使用
app.run(function($templateCache){
	$templateCache.put('skeleton.html',
		`<div class="skeleton">
		    <div class="skeleton-head doLoading"></div>
		    <div class="skeleton-body">
		        <div class="skeleton-title doLoading"></div>
		        <div class="skeleton-content doLoading"></div>
		    </div>
		</div>`
	);
});

//初始化noReady的值为false,进行页面加载效果
app.run(['$rootScope',function($rootScope){
	$rootScope.noReady=true;
}]);

//创建一个加载时的skeleton指令
app.directive('skeleton',function($templateCache,$timeout){
	return {
		restrict:'AE',		
		template:$templateCache.get('skeleton.html'),
		link:function(scope,element,attr){
			$timeout(function(){
				scope.$emit('ngLoadFinished');
			},3000);
		}
	}
});

app.controller('checkInSelect',function($scope,$rootScope){	
	$scope.btnClick=function(){
		$rootScope.noReady=!$rootScope.noReady;
	}
	$scope.$on('ngLoadFinished',function(ngLoadFinishedEvent){
		$rootScope.noReady=!$rootScope.noReady;
	});
});


//页面加载完后执行方法,类似于$(document).ready(function(){});
angular.element(document).ready(function() {
   console.log("Ready");
   angular.bootstrap(document.body,['app']);			//手动启动angular
});