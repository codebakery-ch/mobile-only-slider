directive('miniSlider', ['$window', function ($window) {
    return {
        restrict: 'AE',
        scope: {
            rel: '@', // current Active Slide for reference
            startAt: '@', // init breakpoint
            wrapperElm: '@', // wrapper for child Elms
            childElm: '@' // child Elms
        },
        link: function (scope, element, attrs) {
            var doToggle = function () {
                var maxWidth = 0;
                var check = scope.startAt && $window.innerWidth <= scope.startAt;

                $(element).toggleClass('mini-slider', check);

                if(!check){
                    scope.rel = 0;
                    $(scope.wrapperElm).attr('style', '');
                }

                var elementHeights = $(scope.childElm).map(function () {
                    return $(this).height();
                }).get();

                $(scope.childElm).map(function () {
                    maxWidth += $window.innerWidth;
                }).get();

                var maxHeight = Math.max.apply(null, elementHeights);

                $(scope.wrapperElm).css({
                        "min-height": check ? maxHeight : '' + 'px',
                        "width": check ? maxWidth : '' + 'px'
                });

                var onePart = maxWidth / 3;

                $('.next').on('click', function () {
                    if(scope.rel == 2){
                        return;
                    }
                    scope.rel++;
                    $(scope.wrapperElm).css({
                        "transform": "translateX(-" + onePart * ( scope.rel  ) + "px)"
                    });
                });

                $('.prev').on('click', function () {
                    if(scope.rel == 0){
                        return;
                    }
                    scope.rel--;
                    $(scope.wrapperElm).css({
                        "transform": "translateX(-" + onePart * ( scope.rel  ) + "px)"
                    });$
                });
            };
            doToggle();
            angular.element($window).bind("resize", function () {
                doToggle();
            });
        }
    };
}])
