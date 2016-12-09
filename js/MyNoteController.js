var myNoteApp = angular.module('myNoteApp', ['ngMaterial', 'ngAnimate', 'ngAria'])
        .controller('MyNoteController', ['$scope', function ($scope) {
                if ('serviceWorker' in navigator) {
                    navigator.serviceWorker
                            .register('./service-worker.js')
                            .then(function () {
                                console.log('Service Worker Registered');
                            });
                }
            }]);