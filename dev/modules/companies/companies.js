angular.module('app.companies', ['ui.router'])

.config(['$stateProvider', 'AccessLevel',
    function ($stateProvider, AccessLevel) {
        $stateProvider
            .state('companies', {
                abstract: true,
                url: '/companies',
                templateUrl: 'components/layouts/default.html',
                role: {
                    access: AccessLevel.user
                },
            })
            .state('companies.list', {
                url: '/list',
                templateUrl: 'modules/companies/index.html',
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
