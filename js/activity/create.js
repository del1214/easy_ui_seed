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
                width: 588,
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

        // 绑定时间
        var bindEvent = function() {
            item.on('click', '[data-handle="window_close"]', function(event) {
                item.window('close');
                event.stopPropagation();
            });
        };

        return {
            init: init
        };
    };
    return activityCreate();
});