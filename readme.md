Force different ng-model do not equal to each other by a key.

Use it like this:

```html
<input type="text" ng-model="person1name" not-same-key="everyoneName">
<input type="text" ng-model="person2name" not-same-key="everyoneName">
<input type="text" ng-model="person3name" not-same-key="everyoneName">
<input type="text" ng-model="person4name" not-same-key="everyoneName">
```

Each person's name won't pass the validator(thus will have a ng-error in its class) once it equals to another's.
