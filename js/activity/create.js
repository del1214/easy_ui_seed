define(function() {
    var activityCreate = function() {
        var self = this,
            container = null,
            createItem = null,
            item = null;
        // 初始化
        var init = function(_container) {
            container = _container;
            addWindow();
        };

        // 添加window
        var addWindow = function() {
            container.append('<div id="modalWindow"></div>');
            item = container.find('#modalWindow').window({
                width: 400,
                height: 300,
                modal: true,
                minimizable: false,
                maximizable: false,
                collapsible: false,
                title: '添加新活动',
                href: "/views/activity/create.html",
                onLoad: function() {},
                onClose: function() {
                    // 关闭窗体后 清除对象
                    item.remove();
                }
            }).window('center');

            bindEvent();
        };

        // 绑定事件
        var bindEvent = function() {
            // 点击关闭
            item.on('click', '[data-handle="window_close"]', function(event) {
                item.window('close');
                event.stopPropagation();
            });

            // 点击提交
            item.on('click', '[data-handle="activity_create_submit"]', function(event) {
                item.find('form').form('submit', {
                    ajax: true,
                    url: '/js/activity/submit.json',
                    onSubmit: function(param) {
                        var _item = $(this);
                        // 此方法只能验证表单里的内容，其他特殊的需要自己写
                        if ($(this).form('validate')) {
                            submitForm(_item);
                        }
                        return false;
                    }
                });
                event.stopPropagation();
            });
        };

        // 提交方法
        var submitForm = function(form) {
            $.ajax({
                url: '/js/activity/submit.json',
                type: 'get',
                dataType: 'json',
                data: form.serialize(),
                success: function(res) {
                    if (res.code == 1) {
                        $.messager.alert('提示', '保存成功', null, function() {
                            item.window('close');
                        });
                    }
                }
            });
        };
        return {
            init: init
        };
    };
    return activityCreate();
});