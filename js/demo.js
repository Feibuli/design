/**
 * Created by Administrator on 2017/3/28.
 */
$(function () {


    //1.left向middle拖动
    $('#left').on('mousedown', 'li', function () {
        var $this = $(this);
        var mark = $this.clone().addClass('mark').empty();      //占位栏
        var clone = $this.clone();                              //替代this元素
        var focus = $('.active');
        var type = $this.attr('data-type');
        var hasMove = 1;


        $(document).on('mousemove', function (event) {
            focus.removeClass('active');


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
                        mark.replaceWith($this.removeAttr('style').removeClass('drag').addClass('active'));
                        $this.siblings().removeClass('active');
                        new Design(type);
                        $('.widgetsettings').show().next().hide();
                        $('[data-type="widgetsettings"]').addClass('current').siblings().removeClass('current');
                    } else {
                        mark.remove();
                        $this.remove();
                        focus.addClass('active');
                    }
                }
            });


    });

    //2.middle内部拖动
    $('#middle').on('mousedown', 'li', function () {
        var $this = $(this);
        var mark = $this.clone().removeClass('active').addClass('mark').empty();      //占位栏
        var clone = $this.clone().removeClass('active').addClass('mirror');           //替代this元素
        var type = $this.attr('data-type');

        var hasMove = 1;

        if (!$this.hasClass('active')) {
            $this.addClass('active').siblings().removeClass('active');
        }
        new Design(type);

        $('.widgetsettings').show().next().hide();
        $('[data-type="widgetsettings"]').addClass('current').siblings().removeClass('current');


        $(document).on('mousemove', function (event) {
            $this.removeClass('active');


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
                        mark.replaceWith($this.removeAttr('style').removeClass('drag').addClass('active'));
                    } else {
                        mark.remove();
                        $this.remove();
                        clone.removeAttr('style').removeClass('mirror').addClass('active');
                    }
                }
            });


    });

    //3.right切换
    $('.tabitem').click(function () {
        $(this).addClass('current').siblings().removeClass('current');

        if ($(this).attr('data-type') == 'widgetsettings') {
            $('.widgetsettings').show().next().hide();
        } else {
            $('.widgetsettings').hide().next().show();
        }


    });

    //4.middle点击事件
    $('#middle').off('click').on('click', 'li', function () {
        var $this = $(this);
        var type = $this.attr('data-type');
        new Design(type);


    });


    function Design() {
        this.init.apply(this, arguments);
    };

    Design.prototype = {
        constructor: Design,
        init: function (type) {
            var t = this;
            t.template(type);
            t.bindEvent();
        },
        render: function (inputArr, selectArr) {
            var arr = inputArr || [];
            if (arr.length != 0) {
                var input = '';
                for (var i = 0; i < arr.length; i++) {
                    var item = arr[i];
                    input += '<div class="wf-field setting-label">';
                    input += '<div class="fieldname">';
                    input += '<span>' + item.title + '</span>';
                    input += '<span class="fieldinfo">' + item.limit + '</span>';
                    input += '</div>';
                    input += '<div class="fieldblock" >';
                    input += '<input type="text" maxlength="' + Number(item.limit.slice(2, 4)) + '" value=' + item.placeholder + '>';
                    input += '</div>';
                    input += '</div>';
                }
                $('.widgetsettings').html(input);
            }


            var arr = selectArr || [];
            if (arr.length != 0) {
                var select = '',
                    div = $('<div class="wf-field wf-setting-options"></div>');
                select += '<div class="fieldname">';
                select += '<span>选项</span>';
                select += '<span class="fieldinfo">最多20项，每项最多20个字</span>';
                select += '</div>';
                select += '<div class="limitdel">';
                for (var i = 0; i < arr.length; i++) {
                    var item = arr[i];
                    select += '<div class="fieldblock wf-setting-option">';
                    select += '<input type="text" class="" maxlength="20" value="' + item.option + '" index = "' + i + '">';
                    select += '<a class="action action-del"><i class="icon icon-minus">-</i></a>';
                    select += '<a class="action action-add"><i class="icon icon-plus">+</i></a>';
                    select += '</div>';
                }
                select += '</div>';
                div.appendTo($('.widgetsettings')).html(select);
            }


            var require = '',
                div = $('<div class="wf-field wf-setting-required"></div>');
            require += '<div class="fieldname">验证</div>';
            require += '<label class="fieldblock">';
            require += '<input type="checkbox"><span class="verticalmiddle">必填</span>';
            require += '</label>';
            div.appendTo($('.widgetsettings')).html(require);

            this.bindEvent();

        },
        template: function (type) {
            var t = this;
            var opt = {
                textfield: {
                    input: [
                        {title: '标题', limit: '最多10个字', placeholder: '单行输入框'},
                        {title: '提示文字', limit: '最多20个字', placeholder: '请输入'}
                    ],
                },
                textareafield: {
                    input: [
                        {title: '标题', limit: '最多10个字', placeholder: '多行输入框'},
                        {title: '提示文字', limit: '最多20个字', placeholder: '请输入'}
                    ],
                },
                datefield: {
                    input: [
                        {title: '标题', limit: '最多10个字', placeholder: '日期'}
                    ],
                },
                numberfield: {
                    input: [
                        {title: '标题', limit: '最多10个字', placeholder: '数字输入框'},
                        {title: '提示文字', limit: '最多20个字', placeholder: '请输入'},
                        {title: '单位', limit: '最多20个字', placeholder: ''}
                    ],
                },
                selectfield: {
                    input: [
                        {title: '标题', limit: '最多10个字', placeholder: '单选框'}
                    ],
                    select: [
                        {option: '选项1'},
                        {option: '选项2'},
                        {option: '选项3'}
                    ]
                }

            }

            t.opt = opt;

            switch (type) {
                case 'textfield':
                    t.render(opt.textfield.input);
                    break;
                case 'textareafield':
                    t.render(opt.textareafield.input);
                    break;
                case 'numberfield':
                    t.render(opt.numberfield.input);
                    break;
                case 'selectfield':
                    t.render(opt.selectfield.input, opt.selectfield.select);
                    break;
                case 'datefield':
                    t.render(opt.datefield.input);
                    break;
            }


        },
        bindEvent: function () {
            var t = this;
            var index = '';
            var selectfield = t.opt.selectfield;
            $('.icon-plus').off('click').on('click', function () {
                index = $(this).parents('.fieldblock ').find('input').attr('index');
                var number = selectfield.select.length + 1;
                selectfield.select.splice(+index + 1, 0, {option: '选项' + number});
                t.render(selectfield.input, selectfield.select);
            });
            $('.icon-minus').off('click').on('click', function () {
                index = $(this).parents('.fieldblock ').find('input').attr('index');
                selectfield.select.splice(index, 1);
                t.render(selectfield.input, selectfield.select);


            });


        },
        sort: function (arr) {

        }


    }


    //new Design('textareafield');


})

