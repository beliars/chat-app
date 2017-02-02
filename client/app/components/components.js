import angular from 'angular';
import Chat from './chat/chat';
import CardsModal from './cards/cards';

let componentModule = angular.module('app.components', [
  Chat,
  CardsModal
])

.name;

export default componentModule;
