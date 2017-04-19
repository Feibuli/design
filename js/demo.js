/**
 * Created by Administrator on 2017/3/28.
 */
$(function () {

    //1.left向middle拖动
    $('#left').on('mousedown', 'li', function () {
        new Drag({
            type: 'dragTo',
            point: $(this)
        });
    });

    //2.middle内部拖动
    $('#middle').on('mousedown', 'li', function () {
        new Drag({
            type: 'dragIn',
            point: $(this)
        });
    });

    //3.right切换
    $('.tabitem').click(function () {
        var $this = $(this);
        $this.addClass('current').siblings().removeClass('current');
        if ($this.attr('data-type') == 'widgetsettings') {
            $('.widgetsettings').show().next().hide();
        } else {
            $('.widgetsettings').hide().next().show();
        }
    });

    //4.middle点击事件
    $('#middle').off('click').on('click', 'li', function () {
        var type = $(this).attr('data-type');
        new Design(type);
    });

    //5.right渲染模块
    function Design() {
        this.init.apply(this, arguments);
    };

    Design.prototype = {
        constructor: Design,
        init: function (type) {
            var t = this;
            t.template(type);
            t.bindEvent();
            t.tempArr = [];
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
                select += '<span class="fieldinfo">最多10项，每项最多20个字</span>';
                select += '</div>';
                select += '<div>';
                for (var i = 0; i < arr.length; i++) {
                    var item = arr[i];
                    select += '<div class="fieldblock wf-setting-option">';
                    select += '<input type="text" class="" maxlength="20" value="' + item.option + '" index = "' + i + '">';
                    select += '<a class="action action-del"><i class="icon icon-minus">－</i></a>';
                    select += '<a class="action action-add"><i class="icon icon-plus">＋</i></a>';
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

            };

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
            var number = '';
            var length = '';
            var selectfield = t.opt.selectfield;
            $('.icon-plus').off('click').on('click', function () {
                var tempArr = t.tempArr;

                //数组操作
                if (tempArr.length == 0) {
                    number = selectfield.select.length + 1;
                } else {
                    tempArr = sortArr(tempArr);
                    number = tempArr.shift();
                    t.tempArr = tempArr;
                }

                index = $(this).parents('.fieldblock').find('input').attr('index');
                selectfield.select.splice(+index + 1, 0, {option: '选项' + number});
                t.render(selectfield.input, selectfield.select);

                //限制最大选项数目
                length = $('.fieldblock.wf-setting-option').length;
                if (length == 10) {
                    $('.fieldblock').parent().addClass('limitadd');
                }
            });


            $('.icon-minus').off('click').on('click', function () {
                var tempArr = t.tempArr;
                index = $(this).parents('.fieldblock').find('input').attr('index');

                //存储删除数组项
                tempArr.push(selectfield.select.splice(index, 1)[0].option.slice(2));
                t.render(selectfield.input, selectfield.select);

                //限制最小选项数目
                length = $('.fieldblock.wf-setting-option').length;
                if (length == 1) {
                    $('.fieldblock').parent().addClass('limitdel');
                }
            });

            function sortArr(arr) {
                function opt(a, b) {
                    return a - b;
                }

                return arr.sort(opt);
            }

        },
    }

    //6.drag模块重构
    function Drag() {
        this.init.apply(this, arguments);
    }

    Drag.prototype = {
        constructor: Drag,
        init: function (options) {
            var t = this;
            t.opts = $.extend({}, t.options, options);
            t.opts.type == 'dragTo' ? t.dragTo() : t.dragIn();
        },
        dragTo: function () {
            var t = this;
            var $this = t.opts.point;
            var mouseMove = t.mouseMove;
            var mark = $this.clone().addClass('mark').empty();      //占位栏
            var clone = $this.clone();                              //替代this元素
            var focus = $('.active');
            var type = $this.attr('data-type');
            var hasMove = 1;

            $(document).on('mousemove', function (event) {
                focus.removeClass('active');
                //添加占位栏和镜像元素
                if (hasMove) {
                    $this.before(clone).appendTo($('#middle')).before(mark.addClass('none'));
                    hasMove = 0;
                }
                mouseMove($this, event, mark);
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
        },
        dragIn: function () {
            var t = this;
            var $this = t.opts.point;
            var mouseMove = t.mouseMove;
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

                //添加占位栏和镜像元素
                if (hasMove) {
                    $this.before(mark).appendTo($this.parent());
                    mark.after(clone);
                    hasMove = 0;
                }

                mouseMove($this, event, mark);
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
        },
        mouseMove: function ($this, event, mark) {

            var event = event || window.event;
            var pageX = event.pageX || event.clientX + document.documentElement.scrollLeft;
            var pageY = event.pageY || event.clientY + document.documentElement.scrollTop;

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

            //位置判断
            if (pageX > $('#middle').offset().left && pageX < $('#middle').offset().left + $('#middle').outerWidth()) {
                mark.removeClass('none').addClass('block');
            } else {
                mark.removeClass('block').addClass('none');
            }

            //防止文字选中
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        }
    }

    //right选项栏功能完善    100%
    //left与middle封装重构   100%
    //left与middle html重构
    //middle与right数据绑定
    //left与middle hover事件
    //验证功能
    //日期与日趋区间的日期类型功能
    //日期区间自动计算时长功能
    //明细功能
    //说明文字功能
    //金额功能
    //附件功能
    //外部联系人功能
})

