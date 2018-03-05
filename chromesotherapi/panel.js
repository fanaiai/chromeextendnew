// 检测jQuery
document.getElementById('check_jquery111').addEventListener('click', function()
{
	$.ajax({
		"type":"get",
		"url":"www.baidu.com",
		"data":{"a":"fyy"},
		success:function(res){

		}
	})
});

// 打开某个资源
document.getElementById('open_resource').addEventListener('click', function()
{
	chrome.devtools.inspectedWindow.eval("window.location.href", function(result, isException)
	{
		chrome.devtools.panels.openResource(result, 20, function()
		{
			console.log('资源打开成功！');
		});
	});
});

// 审查元素
document.getElementById('test_inspect').addEventListener('click', function()
{
	chrome.devtools.inspectedWindow.eval("inspect(document.images[0])", function(result, isException){});
});

// 获取所有资源
document.getElementById('get_all_resources').addEventListener('click', function()
{
	chrome.devtools.inspectedWindow.getResources(function(resources)
	{
		alert(JSON.stringify(resources));
	});
});

var myconsole = 
{
	_log: function(obj)
	{
		// 不知为何，这种方式不行
		chrome.devtools.inspectedWindow('console.log('+JSON.stringify(obj)+')');
	},
	log: function(obj)
	{
		// 这里有待完善
		chrome.tabs.executeScript(chrome.devtools.inspectedWindow.tabId, {code: 'console.log(' + JSON.stringify(obj) + ')'}, function(){});
	}
};