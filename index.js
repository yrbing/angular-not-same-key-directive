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

        var thisValue = el.attr('not-same-key');
        var attrNames = [];
        var elList = document.querySelectorAll('[not-same-key="'+thisValue+'"]');

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
