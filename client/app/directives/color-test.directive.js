export default function colorTestDirective() {
    return {
        restrict: 'A',
        link: function(scope, el, attrs) {
            el.css('color', 'green');
        }
    }
}