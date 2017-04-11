/**
 * Created by Administrator on 2017/3/28.
 */
$(function () {

    /*function Drag() {
     this.init.apply(this, arguments);
     };

     Drag.prototype = {
     constructor: Drag,
     init: function (options) {
     console.log(this);

     }
     }*/

    //1.left向middle拖动元素
    $('#left').on('mousedown', 'li', function () {
        var $this = $(this);
        var mark = $this.clone().addClass('mark').empty();      //占位栏
        var clone = $this.clone();                              //替代this元素
        var hasMove = 1;


        $(document).on('mousemove', function (event) {

            var event = event || window.event;
            //获取鼠标在页面上的位置
            var pageX = event.pageX || event.clientX + document.documentElement.scrollLeft;
            var pageY = event.pageY || event.clientY + document.documentElement.scrollTop;

            //添加占位栏和镜像元素
            if (hasMove) {
                $this.before(clone).appendTo($('#middle')).before(mark.addClass('none'));
                hasMove = 0;
            }

            //位置判断
            if (pageX > $('#middle').offset().left && pageX < $('#middle').offset().left + $('#middle').outerWidth()) {
                mark.removeClass('none').addClass('block');
            } else {
                mark.removeClass('block').addClass('none');
            }

            var prev = mark.prev();
            var next = mark.next().not($this);
            //向上排序
            if (prev.length && pageY < prev.offset().top + prev.outerHeight() / 2) {
                //向下排序
                mark.after(prev);
            } else if (next.length && pageY > next.offset().top + next.outerHeight() / 2) {
                mark.before(next);
            }

            //保持鼠标在拖动元素中间
            $this.addClass('drag').css({
                'left': pageX - $this.outerWidth() / 2,
                'top': pageY - $this.outerHeight() / 2
            });

            //防止文字选中
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();

        })


            .on('mouseup', function () {
                $(document).off('mousemove mouseup');
                if (!hasMove) {
                    if (!mark.hasClass('none')) {
                        mark.replaceWith($this.removeAttr('style').removeClass('drag'));
                    } else {
                        mark.remove();
                        $this.remove();
                    }
                }
            });


    });

    //2.middle内部拖动
    $('#middle').on('mousedown', 'li', function () {
        var $this = $(this);
        var mark = $this.clone().addClass('mark').empty();      //占位栏
        var clone = $this.clone().addClass('mirror');           //替代this元素
        var hasMove = 1;


        $(document).on('mousemove', function (event) {

            var event = event || window.event;
            //获取鼠标在页面上的位置
            var pageX = event.pageX || event.clientX + document.documentElement.scrollLeft;
            var pageY = event.pageY || event.clientY + document.documentElement.scrollTop;

            //添加占位栏和镜像元素
            if (hasMove) {
                $this.before(mark).appendTo($this.parent());
                mark.after(clone);
                hasMove = 0;
            }

            //位置判断
            if (pageX > $('#middle').offset().left && pageX < $('#middle').offset().left + $('#middle').outerWidth()) {
                mark.removeClass('none').addClass('block');
            } else {
                mark.removeClass('block').addClass('none');
            }

            //保持鼠标在拖动元素中间
            $this.addClass('drag').css({
                'left': pageX - $this.outerWidth() / 2,
                'top': pageY - $this.outerHeight() / 2
            });

            var prev = mark.prev();
            var next = mark.next().not($this);
            //向上排序
            if (prev.length && pageY < prev.offset().top + prev.outerHeight() / 2) {
                //向下排序
                mark.after(prev);
            } else if (next.length && pageY > next.offset().top + next.outerHeight() / 2) {
                mark.before(next);
            }

            //防止文字选中
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        })


            .on('mouseup', function () {
                $(document).off('mousemove mouseup');
                if (!hasMove) {
                    if (!mark.hasClass('none')) {
                        clone.remove();
                        mark.replaceWith($this.removeAttr('style').removeClass('drag'));
                    } else {
                        mark.remove();
                        $this.remove();
                        clone.removeAttr('style').removeClass('mirror');
                    }
                }
            });


    });

    //3.right
    $('.tabitem').click(function () {
        $(this).addClass('current').siblings().removeClass('current');
    });


})
