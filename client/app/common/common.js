import angular from 'angular';
import Sidebar from './sidebar/sidebar';
import Topbar from './topbar/topbar';

let commonModule = angular.module('app.common', [
  Sidebar,
  Topbar
])
  
.name;

export default commonModule;
