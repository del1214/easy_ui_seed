define(['require', 'helper'], function(require, helper) {
    var activityList = function() {
        var self = this;
        var title = '活动管理',  //tab title
            url = '/views/activity/list.html',     //请求路径
            container = null,   //父容器
            item = null,        //对象$对象
            template = null,    //模板--未启用
            dataGrid = null,    //列表$对象
            searchParam = null; //查询参数
        // 初始化
        var init = function(_container) {
            container = _container;
            addTab();
        };

        // 加入到容器中
        var addTab = function() {
            item = container.tabs('add', {
                title: title,
                href: url + '?pageSize=' + 20,
                closable: true,
                loadingMessage: '加载中',
                onLoad: function(panel) {
                    makeDataGrid();
                }
            });
            bindEvent();
        };

        // 创建列表
        var makeDataGrid = function() {
            dataGrid = item.find('#activityList').datagrid({
                url: '/js/activity/data.json', //url
                method: 'get', //get请求
                sortName: 'itemid', //默认排序列
                sortOrder: 'asc', //排序方式
                rownumbers: true, //显示行号
                pagination: true, //分页栏
                singleSelect: true, //单行选择
                fit: true, //适配宽度
                fitColumns: true, //适配列宽
                striped: true, //条纹
                // 配置列
                columns: [
                    [{
                        field: 'itemid',
                        title: 'Item ID',
                        width: 80,
                        sortable: true
                    }, {
                        field: 'productid',
                        title: 'Product ID',
                        width: 120,
                        sortable: true
                    }, {
                        field: 'listprice',
                        title: 'List Price',
                        width: 80,
                        align: 'right',
                        sortable: true
                    }, {
                        field: 'unitcost',
                        title: 'Unit Cost',
                        width: 80,
                        align: 'right',
                        sortable: true
                    }, {
                        field: 'attr1',
                        title: 'Attribute',
                        width: 250,
                        sortable: true
                    }, {
                        field: 'status',
                        title: 'Status',
                        width: 60,
                        align: 'center'
                    }, {
                        field: 'opertion',
                        title: '操作',
                        width: 60,
                        align: 'center',
                        // 格式化列
                        formatter: function(value, row, index) {
                            return [
                                '<a href="javascript:;" data-id="' + row.itemid + '" data-handle="activity_edit">编辑</a> &nbsp;',
                                '<a data-index="' + index + '" data-id="' + row.itemid + '" href="javascript:;" data-handle="activity_delete">删除</a>'
                            ].join('');;
                        }
                    }]
                ],
                onLoadSuccess: function(res) {

                },
                // 这里的toolbar  只能进行定位   无法操作列表
                toolbar: '#activity_search'
            });
        }

        // 事件绑定
        var bindEvent = function() {
            // 点击创建按钮
            item.on('click', '[data-handle="activity_create"]', function(event) {
                require(['activity/create'], function(obj) {
                    obj.init(item);
                });

                event.stopPropagation();
            });

            // 点击编辑按钮
            item.on('click', '[data-handle="activity_edit"]', function(event) {
                event.stopPropagation();
            });

            // 点击删除按钮
            item.on('click', '[data-handle="activity_delete"]', function(event) {
                var data = $(this).data(),
                    id = data.id,
                    index = data.index;
                // 刷新当前页
                dataGrid.datagrid('reload', searchParam);
                event.stopPropagation();

            });

            // 点击查询按钮
            item.on('click', '[data-handle="activity_search"]', function(event) {
                // 序列化表单
                var paramStr = item.find('form').serialize();
                // 将表单转换为对象   参数转换为全局对象 其他操作会调用
                searchParam = $.querystring(paramStr);
                // 替换时间文本为时间戳
                searchParam.birthday = helper.getStamp(searchParam.birthday);
                // 读取   加上参数的列表以后翻页依然是带参数的  重新点击查询后会替换新的参数
                dataGrid.datagrid('load', searchParam);
                event.stopPropagation();
            });
        };
        // 对外只暴露init方法
        return {
            init: init
        }

    }; // ()执行自己,返回实例

    return activityList();
});