;
(function(window, document, $, require, undefined) {
	// 配置requirejs
	require.config({
		baseUrl: '/js/'
	});


	$(function() {
		var leftFrame = $('#leftFrame'),
			centerFrame = $('#centerFrame'),
			centerTabs = $('#centerTabs');
		// 左侧栏点击
		leftFrame.on('click', '[data-handle="add_tab_click"]', function(event) {
			var item = $(this),
				data = item.data(),
				title = data.title,
				requireUrl = data.require;
			// 是否已存在
			if (centerTabs.tabs('exists', title)) {
				centerTabs.tabs('select', title);
			} else {
				// 创建新标签页
				require([requireUrl], function(obj) {
					obj.init(centerTabs);
				});
			}
		});
	});

})(window, document, jQuery, require);