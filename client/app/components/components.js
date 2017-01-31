import angular from 'angular';
import Chat from './chat/chat';

let componentModule = angular.module('app.components', [
  Chat
])

.name;

export default componentModule;
