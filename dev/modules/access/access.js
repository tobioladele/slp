angular.module('app.access', ['ui.router'])

.config(['$stateProvider', 'AccessLevel',
    function ($stateProvider, AccessLevel) {
        $stateProvider
            .state('access', {
                url: '/access',
                template: '<div ui-view class="fade-in-up smooth"></div>',
                role: {
                    access: AccessLevel.anon
                },
            })
            .state('access.login', {
                url: '/login',
                templateUrl: 'modules/access/login.html',
                role: {
                    access: AccessLevel.anon
                },
            })
            .state('access.forgot_password', {
                url: '/forgot',
                templateUrl: 'modules/access/forgot_password.html',
                role: {
                    access: AccessLevel.anon
                }
            })
    }
])

.controller('LoginCtrl', ['$scope', '$state', 'Auth',
    function ($scope, $state, Auth) {
        $scope.credentials = {};
        $scope.alert = null;

        $scope.login = function () {
            $scope.closeAlert();

            Auth.login($scope.credentials).then(function (res) {
                $scope.$emit('fetchUserData', 'true');
                $state.go('dashboard.home');
            }, function (error) {
                $scope.alert = {
                    type: 'danger',
                    message: error.data.response.message
                };
            });
        };

        $scope.closeAlert = function () {
            $scope.alert = null;
        };
    }
])

.controller('ForgotPasswordCtrl', ['$scope', '$http', '$state', 'Restangular',
    function ($scope, $http, $state, Restangular) {
        $scope.alert = null;
        $scope.userData = {};

        $scope.sendPasswordLink = function () {
            $scope.closeAlert();
            $scope.isCollapsed = true;
            $scope.disabled = true;
            $scope.buttonText = 'Sending Mail...';

            Restangular.all('reset_link').post({
                username: $scope.username
            }).then(function (data) {
                $scope.disabled = false;
                $scope.isCollapsed = false;
                $scope.userData = data;
                $scope.buttonText = 'Reset Password';
                $scope.username = '';
            }, function (error) {
                $scope.disabled = false;
                $scope.buttonText = 'Reset Password';
                $scope.alert = {
                    type: 'danger',
                    message: error.data.response.message
                };
            });
        };

        $scope.closeAlert = function () {
            $scope.alert = null;
        };
    }
]);