import angular from 'angular';
import uiRouter from 'angular-ui-router';
import chatComponent from './chat.component';
import BotService from '../../services/bot.service';

let chatModule = angular.module('home', [
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
    .service('BotService', BotService)

    .name;

export default chatModule;
