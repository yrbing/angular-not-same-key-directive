try{ // CommonJS compliance
  module.exports = 'notSameKeyModule'
} catch(e){}

angular.module('notSameKeyModule',[])
//页面输入的ng-model绑定内容不重复的验证
.directive('notSameKey', ['$parse', function($parse){
  return {
    require: 'ngModel',
    priority: 100,
    link: function(scope, el, attrs, ctrl) {
      ctrl.$validators.notsamekey = function(modelValue, viewValue){

        var thisValue = el.attr('not-same-key-value');
        var attrNames = [];
        var elList = document.querySelectorAll('[not-same-key-value="'+thisValue+'"]');

        for(var i = 0; i < elList.length; i++) {
          var thisEl = angular.element(elList[i]);
            if(el[0] !== elList[i]) {
              var modelName = thisEl.attr('ng-model');
              var elScope = thisEl.scope();
              var attrName = $parse(modelName)(elScope);
              attrNames.push(attrName);
            }
        }
        return !attrNames.some(function(name){
          return viewValue == name;
        })
      }
    }
  }
}])

// 得到notSameKey编译后的值，新增属性not-same-key-value存之
.directive('notSameKey', [function(){
  return {
    priority: 10,
    scope: {
      notSameKey: '='
    },
    link: function(scope, el, attrs, ctrl) {
      // attrs.$set('not-same-key-value', scope.notSameKey);
      scope.$watch('notSameKey',function(newVal, oldVal){
        // console.log('digesting...',newVal,oldVal)
        attrs.$set('not-same-key-value', newVal);
      })
    }
  }
}])
