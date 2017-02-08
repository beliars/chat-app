import angular from 'angular';
import uiRouter from 'angular-ui-router';
import chatComponent from './chat.component';
import ChatService from '../../services/chat.service';

let chatModule = angular.module('chat', [
    uiRouter
])

    .config(($stateProvider, $urlRouterProvider) => {
        "ngInject";

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('chat', {
                url: '/',
                component: 'chat',
            });
    })

    .component('chat', chatComponent)
    .service('ChatService', ChatService)

    .name;

export default chatModule;
