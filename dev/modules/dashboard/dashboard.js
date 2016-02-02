angular.module('app.dashboard', ['ui.router'])

.config(['$stateProvider', 'AccessLevel',
    function ($stateProvider, AccessLevel) {
        $stateProvider
            .state('dashboard', {
                abstract: true,
                url: '/dashboard',
                templateUrl: 'components/layouts/default.html',
                role: {
                    access: AccessLevel.user
                },
            })
            .state('dashboard.home', {
                url: '/home',
                templateUrl: 'modules/dashboard/index.html',
                role: {
                    access: AccessLevel.user
                },
            })
    }
])

.controller('DashboardCtrl', ['$scope', '$state', 'Restangular',
    function ($scope, $state, Restangular) {
    }
]);