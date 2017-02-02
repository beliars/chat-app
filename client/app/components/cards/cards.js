import angular from 'angular';
import uiRouter from 'angular-ui-router';
import cardsComponent from './cards.component';
import BotService from '../../services/bot.service';

let cardsModule = angular.module('cards', [
    uiRouter
])

    // .config(($stateProvider, $urlRouterProvider) => {
    //     "ngInject";
    //
    //     $urlRouterProvider.otherwise('/');
    //
    //     $stateProvider
    //         .state('cards', {
    //             url: '/cards',
    //             component: 'cards'
    //         });
    // })

    .component('cards', cardsComponent)
    .service('BotService', BotService)

    .name;

export default cardsModule;
