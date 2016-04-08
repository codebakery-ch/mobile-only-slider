directive('miniSlider', ['$window', function ($window) {
    return {
        restrict: 'AE',
        scope: {
            startAt: '@', // init breakpoint
            childElm: '@' // init breakpoint
        },
        link: function (scope, element, attrs) {
            var doToggle = function () {
                var maxWidth = 0;
                var check = scope.startAt && $window.innerWidth <= scope.startAt;

                $(element).toggleClass('mini-slider', check);

                if(!check){
                    $(element).attr('style', '');
                }

                var elementHeights = $(scope.childElm).map(function () {
                    return $(this).height();
                }).get();

                $(scope.childElm).map(function () {
                    maxWidth += $window.innerWidth;
                }).get();

                var maxHeight = Math.max.apply(null, elementHeights);

                $(element).css({
                        "min-height": check ? maxHeight : '' + 'px',
                        "width": check ? maxWidth : '' + 'px'
                });

                var currRel = parseInt($(element).attr('rel'));
                var onePart = maxWidth / 3;

                //  $(scope.childElm).height(check ? maxHeight : '').toggleClass('inslide', check);

                $('.next').on('click', function () {
                    if(currRel == 2){
                        return;
                    }
                    currRel++;
                    $(element).attr('rel', currRel);
                    $(element).css({
                        "transform": "translateX(-" + onePart * ( currRel  ) + "px)"
                    });
                });

                $('.prev').on('click', function () {
                    if(currRel == 0){
                        return;
                    }
                    currRel--;
                    $(element).attr('rel', currRel);
                    $(element).css({
                        "transform": "translateX(-" + onePart * ( currRel  ) + "px)"
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
