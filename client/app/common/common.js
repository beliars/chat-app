import angular from 'angular';
import Sidebar from './sidebar/sidebar';

let commonModule = angular.module('app.common', [
  Sidebar
])
  
.name;

export default commonModule;
