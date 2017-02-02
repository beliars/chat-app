import template from './cards.html';
import controller from './cards.controller';
import './cards.scss';

let cardsComponent = {
  restrict: 'E',
  bindings: {
    onChoose: '&'
  },
  template,
  controller
};

export default cardsComponent;
