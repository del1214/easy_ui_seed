if ($.fn.validatebox) {
    $.extend($.fn.validatebox.defaults.rules, {
        // 最少限制
        minLength: {
            validator: function(value, param) {
                return value.length >= param[0];
            },
            message: '请输入至少 {0} 个字符！'
        },
        // 最多限制
        maxLength:{
            validator: function(value, param) {
                return value.length <= param[0];
            },
            message: '请输入最多 {0} 个字符！'
        },
        // 邮编
        postcode: {
            validator: function(value) {
                var postcode = /\d{6}/;
                return postcode.test(value);
            },
            message: '请输入合法的邮编'
        },
        // 手机
        mobile: {
            validator: function(value) {
                var mobile = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/;
                return mobile.test(value);
            },
            message: '请输入合法的手机号'
        },
        // 下拉菜单为空  默认约定为请选择一项
        comboBoxEmpty: {
            validator: function(value) {
                return value !== '请选择一项';
            },
            message: '请选择一项'
        }
    });
}