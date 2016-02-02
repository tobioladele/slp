angular.module('app.landing-pages', ['ui.router'])

.config(['$stateProvider', 'AccessLevel',
    function ($stateProvider, AccessLevel) {
        $stateProvider
            .state('landing-pages', {
                abstract: true,
                url: '/landing-pages',
                templateUrl: 'components/layouts/default.html',
                role: {
                    access: AccessLevel.user
                },
            })
            .state('landing-pages.main', {
                url: '/main',
                templateUrl: 'modules/landing-pages/index.html',
                role: {
                    access: AccessLevel.user
                },
            })
    }
])

.controller('HomeCtrl', ['$scope', '$state', 'Restangular',
    function ($scope, $state, Restangular) {
        $scope.tabs = [true, false, false];
        $scope.tab = function (index) {
            angular.forEach($scope.tabs, function (i, v) {
                $scope.tabs[v] = false;
            });
            $scope.tabs[index] = true;
        }
    }
]);
