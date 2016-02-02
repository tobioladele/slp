angular.module('app.people', ['ui.router'])

.config(['$stateProvider', 'AccessLevel',
    function ($stateProvider, AccessLevel) {
        $stateProvider
            .state('people', {
                abstract: true,
                url: '/people',
                templateUrl: 'components/layouts/default.html',
                role: {
                    access: AccessLevel.user
                },
            })
            .state('people.list', {
                url: '/list',
                templateUrl: 'modules/people/index.html',
                controller: 'PeopleCtrl',
                role: {
                    access: AccessLevel.user
                },
                resolve: {
                    people: ['API', '$stateParams', function(API, $stateParams) {
                        return API.all('people').getList($stateParams);
                    }]
                }
            })
    }
])

.controller('PeopleCtrl', ['$scope', '$state', 'API', 'people',
    function ($scope, $state, API, people) {
        $scope.people = people;
    }
]);
