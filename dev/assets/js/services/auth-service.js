angular.module('app.authService', [])
    .factory('Auth', ['$http', 'LocalService', 'API', '$q', 'AccessLevel',
        function ($http, LocalService, API, $q, AccessLevel) {
            return {
                 authorize: function (access) {
                    if (access === AccessLevel.user) {
                        return this.isAuthenticated();
                    } else {
                        return true;
                    }
                },
                isAuthenticated: function () {
                    return LocalService.get('auth_token');
                },
                login: function (credentials) {
                    var deferred = $q.defer();
                    API.all('auth').post(credentials).then(function (data) {
                        LocalService.set('auth_token', JSON.stringify(data));
                        deferred.resolve(data);
                    }, function (error) {
                        deferred.reject(error);
                    });

                    return deferred.promise;
                },
                logout: function () {
                    // The backend doesn't care about logouts, delete the token and you're good to go.
                    LocalService.unset('auth_token');
                },
                getUser: function () {
                    if (LocalService.get('auth_token')) {
                        return angular.fromJson(LocalService.get('auth_token')).user;
                    } else {
                        return false;
                    }
                }
            }
        }
    ])
    .factory('AuthInterceptor', ['$q', '$injector', 'LocalService',
        function ($q, $injector, LocalService) {
            return {
                request: function (config) {
                    var token;
                    if (LocalService.get('auth_token')) {
                        token = angular.fromJson(LocalService.get('auth_token')).token;
                    }
                    if (token) {
                        config.headers.Authorization = 'Bearer ' + token;
                    }
                    return config;
                },
                responseError: function (response) {
                    if (response.status === 401 || response.status === 403) {
                        LocalService.unset('auth_token');
                        $injector.get('$state').go('access.signin');
                    }
                    return $q.reject(response);
                }
            }
        }
    ])
    .config(['$httpProvider',
        function ($httpProvider) {
            $httpProvider.interceptors.push('AuthInterceptor');
        }
    ]);