///集合取交集  
Array.intersect = function() {
    var result = new Array();
    var obj = {};
    for (var i = 0; i < arguments.length; i++) {
        for (var j = 0; j < arguments[i].length; j++) {
            var str = arguments[i][j];
            if (!obj[str]) {
                obj[str] = 1;
            } else {
                obj[str]++;
                if (obj[str] == arguments.length) {
                    result.push(str);
                }
            } //end else  
        } //end for j  
    } //end for i  
    return result;
}

//集合去掉重复  
Array.prototype.uniquelize = function() {
    var tmp = {},
        ret = [];
    for (var i = 0, j = this.length; i < j; i++) {
        if (!tmp[this[i]]) {
            tmp[this[i]] = 1;
            ret.push(this[i]);
        }
    }

    return ret;
}
//并集  
Array.union = function() {
    var arr = new Array();
    var obj = {};
    for (var i = 0; i < arguments.length; i++) {
        for (var j = 0; j < arguments[i].length; j++) {
            var str = arguments[i][j];
            if (!obj[str]) {
                obj[str] = 1;
                arr.push(str);
            }
        } //end for j  
    } //end for i  
    return arr;
}

//2个集合的差集 在arr不存在  
Array.prototype.minus = function(arr) {
    var result = new Array();
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        obj[JSON.stringify(arr[i])] = 1;
    }
    for (var j = 0; j < this.length; j++) {
        if (!obj[JSON.stringify(this[j])]) {
            obj[JSON.stringify(this[j])] = 1;
            result.push(this[j]);
        }
    }
    return result;
};
Array.prototype.includeItem = function(obj) {
    var result = -1;
    for (var i = 0; i < this.length; i++) {
        if (JSON.stringify(this[i]) == JSON.stringify(obj)) {
            result = i;
            break;
        }
    }
    return result;
};
Array.prototype.deleteArray = function(delarray) {
    for (var i = this.length - 1; i >= 0; i--) {
        (function(that, item, j) {
            if (delarray.includeItem(item) > -1) {
                that.splice(j, 1);
            }
        })(this, this[i], i)

    }
};

function getQuery(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function getExtractInfo(paths) {
    var infolist = [];
    $.each(paths, function(i, ele) {
        var csspatharry = ele.css_selecter;
        var name = ele.name;
        var type = ele.extratype;
        var attr_name = ele.attr_name;
        $.each(csspatharry, function(j, pathobj) {
            var path = pathobj.pathstring;
            var $el = $(path);
            var info = {
                name: name,
                type: type,
                attr_name: attr_name || '--',
                path: path
            }
            if (type == 'txt') {
                info.value = $el.text();
                info.type_name = '提取文本';
            } else {
                info.value = $el.attr(attr_name);
                info.type_name = '提取属性';
            }
            infolist.unshift(info);
        })
    })
    return infolist;
}

function constructPostData(data,url) {
    console.log(data)
    var datatemp = {
        "id": 1,
        "name": "[构造抓取URL]",
        "title": "设置列表页URL",
        "do": "makeseeds",
        "setting": {
            "seed_type": "single_url",
            "seed_urls": "",
            "protocol": "http",
            "seed_ref_task": "1492579178947",
            "seed_ref_data": "",
            "seed_ref_period": "",
            "spidered_again": "true",
            "url_pattern": "",
            "url_filter": "",
            "timeout_ms": "300000",
            "res_tm_out": "10000",
            "user_agent_type": "pc",
            "user_agent": "",
            "cookies_send": "",
            "load_img": false,
            "is_ajax": false,
            "skip_spidered_url": false,
            "waitfinish": "1",
            "waitobjcss": "",
            "waitobjcss_condition": "exists",
            "waitobjcss_ms": "10000"
        },
        "open": true,
        "sons": [{
                "name": "[循环处理]",
                "title": "循环处理",
                "do": "loop",
                "setting": {
                    "max_loops": "4",
                    "loop_type": "pa_iterator"
                },
            "open": true,
            "sons": [
                {
                "name": "[打开URL]",
                "title": "打开URL",
                "do": "openpage",
                "setting": {
                    "url": ""
                },
                "open": true,
                "sons": [{
                        "name": "[提取数据]",
                        "title": "提取数据",
                        "do": "extradata",
                        "setting": {
                            "templet": "",
                            "data_name": "list",
                            "rowscss_selecter": "",
                            "dupcheck_field": "",
                            "fields": {}
                        }
                    }
                    ,
                    {
                        "name": "[发送事件]",
                        "title": "发送事件",
                        "do": "domevent",
                        "setting": {
                            "css_selecter": "",
                            "event_type": "click",
                            "event_effect": "AJAX",
                            "roll_interval": "100",
                            "roll_times": "10"
                        }
                    }
                ]
            }]
        }]
    }
    var finishtemp={
            "id":10,
            "name":"[结束与通知]完成",
            "title":"结束与通知",
            "do":"finish",
            "setting":{
                "notify":true,
                "notify_url":"http://newssdk01/itembase/api",
                "data_map":[

                ],
                "feild_format":{

                },
                "cls_type":"field",
                "cls_field":"data0._SEED_URL",
                "cls_map":[

                ],
                "join":"data0",
                "headlines":false,
                "originate":""
            }
        }
    var postdata = {
        "spider_interval_ms": "",
        "spider_concurrency": "",
        "doset": []
    }
    var data_map=[];
    $.each(data, function(i, ele) {
        var d = $.extend(true, {}, datatemp);
        d.setting.seed_urls=url;
        if (ele.similarpath) {
            d.sons[0].sons[0].sons[0].setting.rowscss_selecter = ele.similarpath.pathstring;
        }
        d.sons[0].sons[0].sons[0].setting.data_name="data"+i;
        d.sons[0].sons[0].sons[1].setting=ele.domevent;
        if(i<=0){
            d.sons[0].setting.max_loops="1";
            d.sons[0].setting.loop_type="count";
        }
        else{
            // d.sons[0].sons[0].sons[0].setting.data_name="data"+i;
            d.setting.seed_type="ref_cur_task";
            d.setting.seed_ref_data="data"+(i-1);
            d.setting.url_pattern='{'+data[i-1].extraurl[0].name+'}';
            d.sons[0].sons[0].sons.length=1;
        }
        d.sons[0].sons[0].sons[0].setting.fields = {};
        var fields = {};
        $.each(ele.extradata, function(j, e) {
            fields[e.name] = {
                "title": e.name,
                "css_selecter": e.css_selecter[0].pathstring,
                "val_type_select": e.extratype == 'txt' ? 'text' : 'attr',
                "val_type": e.extratype == 'txt' ? ('text') : ('attr-' + e.attr_name),
                "extend": {
                    "download": false,
                    "clean": false,
                    "attr_name": e.attr_name,
                    "const_val": "",
                    "strextract": false,
                    "strextractregular": "",
                    "strreplace": false,
                    "strreplacefrom": "",
                    "strreplaceto": "",
                    "filtercsspath": "",
                    "filter_csspaths": ""
                },
                "data_name": "data"+i,
                "data_map_key": "data"+i+"." + e.name,
                "select": e.name
            }
            var map={};
            map["data"+i+"." + e.name]=e.name;
            data_map.push(map);
            if (e.custom_css_selecter) {
                fields[e.name].css_selecter = e.custom_css_selecter.pathstring
            }
        });
        d.sons[0].sons[0].sons[0].setting.fields = $.extend(true, {}, fields);
        postdata.doset.push(d);
    })
    finishtemp.setting.data_map=data_map;
    postdata.doset.push(finishtemp);
    postData(JSON.stringify(postdata))

}

function postData(postdata) {
    var task_id;
    chrome.storage.local.get({ task_id: '' }, function(items) {
        task_id = items.task_id;
        var postinfo = {
            "task_id": task_id,
            "task_config": postdata
        }
        $.ajax({
            "type": "post",
            "url": "http://localhost:8888/caiyun/task/addnotstrict",
            "data": postinfo,
            "success": function(r) {
                window.open('http://localhost:8888/caiyun/task/taskinfo/task_id/'+task_id,'_blank');
            }
        })
        
    })
}