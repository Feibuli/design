/**
 * Created by Administrator on 2017/3/28.
 */
$(function () {

    //1.left向middle拖动
    $('#left').on('mousedown', 'li', function () {
        new Drag({
            type: 'dragTo',
            point: $(this),
        });
    });

    //2.middle内部拖动
    $('#middle').on('mousedown', '.wf-component', function () {
        new Drag({
            type: 'dragIn',
            point: $(this),
        });
    });

    $('.wf-button-blue').on('click', function () {
        $.ajax({
            url: '172.16.101.124:9090/saveFlowCfg/',

            type: "POST",
            data: {
                id:xxx,
                inputJsont:new getData()
            }


        });
    });

    function getData() {
        this.init.apply(this, arguments);
    }

    getData.prototype = {
        constructor: getData,
        init: function (options) {
            var t = this;
            this.opts = $.extend({}, t.options, options);

        },
        getItem: function () {

        }



    };

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

    //5.right渲染模块
    function RightTpl() {
        this.init.apply(this, arguments);
    };

    RightTpl.prototype = {
        constructor: RightTpl,
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
                dateareafield: {
                    input: [
                        {title: '标题', limit: '最多10个字', placeholder: '开始时间'},
                        {title: '标题', limit: '最多10个字', placeholder: '结束时间'}
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
                },
                selectareafield: {
                    input: [
                        {title: '标题', limit: '最多10个字', placeholder: '多选框'}
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
                case 'selectareafield':
                    t.render(opt.selectareafield.input, opt.selectareafield.select);
                    break;
                case 'datefield':
                    t.render(opt.datefield.input);
                    break;
                case 'dateareafield':
                    t.render(opt.dateareafield.input);
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
    };

    //6.drag模块重构
    function Drag() {
        this.init.apply(this, arguments);
    }

    Drag.prototype = {
        constructor: Drag,
        init: function (options) {
            var t = this;
            t.opts = $.extend({}, t.options, options);
            t.bindEvent();
            t.opts.type == 'dragTo' ? t.dragTo() : t.dragIn();
        },
        //外部拖拽
        dragTo: function () {
            var t = this;
            var $this = t.opts.point;
            var dragMove = t.dragMove;
            var mark = $this.clone().addClass('mark').empty();      //占位栏
            var clone = $this.clone();                              //替代this元素
            var focus = $('.active');
            var type = $this.attr('data-type');
            var hasMove = 1;

            t.unbindEvent();
            $(document).on('mousemove', function (event) {
                focus.removeClass('active');
                //添加占位栏和镜像元素
                if (hasMove) {
                    $this.before(clone).appendTo($('#middle')).before(mark.addClass('none'));
                    hasMove = 0;
                }
                dragMove($this, event, mark);
            }).on('mouseup', function () {
                t.bindEvent();
                $(document).off('mousemove mouseup');
                if (!hasMove) {
                    if (!mark.hasClass('none')) {
                        var tpl = t.template(type);
                        $this.remove();
                        mark.replaceWith(tpl);
                        new RightTpl(type);
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
        //内部拖动
        dragIn: function () {
            var t = this;
            var $this = t.opts.point;
            var dragMove = t.dragMove;
            var mark = $this.clone().removeClass('active').addClass('mark').empty();
            var clone = $this.clone().removeClass('active').removeClass('hover');
            var type = $this.attr('data-type');
            var hasMove = 1;
            t.unbindEvent();

            clone.addClass('draging');
            if (!$this.hasClass('active')) {
                $this.addClass('active').siblings().removeClass('active');
            }
            new RightTpl(type);

            $('.widgetsettings').show().next().hide();
            $('[data-type="widgetsettings"]').addClass('current').siblings().removeClass('current');

            $(document).on('mousemove', function (event) {
                $this.removeClass('active').removeClass('hover');

                //添加占位栏和镜像元素
                if (hasMove) {
                    $this.before(mark).appendTo($this.parent());
                    mark.after(clone);
                    hasMove = 0;
                }

                dragMove($this, event, mark);
            }).on('mouseup', function () {
                $(document).off('mousemove mouseup');
                t.bindEvent();
                if (!hasMove) {
                    if (!mark.hasClass('none')) {
                        clone.remove();
                        mark.replaceWith($this.removeAttr('style').removeClass('drager').addClass('active'));
                    } else {
                        mark.remove();
                        $this.remove();
                        clone.removeAttr('style').removeClass('draging').addClass('active');
                    }
                }
            });
        },
        //拖动核心模块
        dragMove: function ($this, event, mark) {

            var event = event || window.event;
            var pageX = event.pageX || event.clientX + document.documentElement.scrollLeft;
            var pageY = event.pageY || event.clientY + document.documentElement.scrollTop;

            //保持鼠标在拖动元素中间
            $this.addClass('drager').css({
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
        },
        //middle框渲染
        render: function (arr, type, mod) {
            var tpl = $(template('selectfield', {item: arr, type: type, module: mod}));
            $('.active').removeClass('active');
            $('.wf-formcanvas-body').append(tpl);
            tpl.addClass('active');
            return $(tpl);
        },
        //middle框模板
        template: function (type) {
            var t = this;
            var opt = {
                textfield: [{title: '单行输入框'}],
                textareafield: [{title: '多行输入框'}],
                datefield: [{title: '日期'}],
                dateareafield: [{title: '开始时间'}, {title: '结束时间'}],
                numberfield: [{title: '数字输入框'}],
                selectfield: [{title: '单选框'}],
                selectareafield: [{title: '多选框'}]
            };

            t.opt = opt;

            switch (type) {
                case 'textfield':
                    var mod = 'input';
                    return t.render(t.opt.textfield, type, mod);
                    break;
                case 'textareafield':
                    var mod = 'input';
                    return t.render(t.opt.textareafield, type, mod);
                    break;
                case 'numberfield':
                    var mod = 'input';
                    return t.render(t.opt.numberfield, type, mod);
                    break;
                case 'selectfield':
                    var mod = 'select';
                    return t.render(t.opt.selectfield, type, mod);
                    break;
                case 'selectareafield':
                    var mod = 'select';
                    return t.render(t.opt.selectareafield, type, mod);
                    break;
                case 'datefield':
                    var mod = 'select';
                    return t.render(t.opt.datefield, type, mod);
                    break;
                case 'dateareafield':
                    var mod = 'select';
                    return t.render(t.opt.dateareafield, type, mod);
                    break;
            }


        },
        //middle框hover事件right框相应事件
        bindEvent: function () {
            $('#middle').off('mouseenter').on('mouseenter', '.wf-component', function () {
                var $this = $(this);
                $this.addClass('hover');
                $('.hover').on('click', '.icon-close', function () {
                    $this.remove();
                    $('.tabitem:eq(1)').removeClass('current').siblings().addClass('current');
                    $('.widgetsettings').empty().next().show();
                });
            });
            $('#middle').on('mouseleave', '.wf-component', function () {
                $(this).removeClass('hover');
            });
        },
        //解绑middle框hover事件
        unbindEvent: function () {
            $('#middle').off('mouseenter', '.wf-component');
        }


    };

    //right选项栏功能完善    100%
    //left与middle封装重构   100%
    //middle改为渲染形成     100%
    //middle hover事件      100%
    //
    //middle与right数据绑定
    //验证功能
    //日期与日趋区间的日期类型功能
    //日期区间自动计算时长功能
    //明细功能
    //说明文字功能
    //金额功能
    //附件功能
    //外部联系人功能
})

