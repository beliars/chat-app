import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import restangular from 'restangular';
import ngMaterial from 'angular-material';
import ngMessages from 'angular-messages';
import luegg from 'angularjs-scroll-glue';

import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';

import 'normalize.css';

angular.module('app', [
    uiRouter,
    ngAnimate,
    ngMaterial,
    ngMessages,
    restangular,
    luegg,
    Common,
    Components
])
    .config(($locationProvider) => {
        "ngInject";
        // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
        // #how-to-configure-your-server-to-work-with-html5mode
        $locationProvider.html5Mode(true).hashPrefix('!');
    })

    .config(function (RestangularProvider) {
        RestangularProvider.setBaseUrl('./app/shared/');
    })

    .component('app', AppComponent);
