import angular from 'angular';
import uiRouter from 'angular-ui-router';
import restangular from 'restangular';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';

import 'normalize.css';

angular.module('app', [
    uiRouter,
    restangular,
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
