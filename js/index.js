// 判断彩云是否登录
// $.ajax({
//     type:"post",
//     url:"http://caiyun.newssdk.com/caiyun/task/getlang",
//     data:{
//         // "checked":3182,
//         // "enable_node_type":"site"
//     },
//     success:function(res){
//         console.log(res);
//     }
// })
function getLoginInfo() {
    var task_id = getQuery('caiyuntaskid');
    var step = getQuery('step');
    chrome.storage.local.get({ caiyunstep: 1 }, function(items) {
        caiyunstep = getQuery("caiyunstep") || items.caiyunstep;
        chrome.storage.local.set({ caiyunstep: caiyunstep }, function() {});
        if (caiyunstep == 1) {
            chrome.storage.local.set({ caiyunseedurl: window.location.href }, function() {});
            chrome.storage.local.set({ task_id: task_id }, function() {});
        }
    });
    chrome.storage.local.get({ caiyunsteps: [] }, function(items) {
        CaiyunSteps = (caiyunstep > 1) ? items.caiyunsteps : [];
        chrome.storage.local.set({ caiyunsteps: CaiyunSteps }, function() {});
    });
    return true;
}
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) { //获取用户名
    if (request.cmd == 'test') console.log(request.value);
});
(function(root) {
    root.CaiyunSteps = [];
    root.CaiyunScope = {
        cssselector: new CssSelector({}),
        uniquepath: {}, //当前所选元素
        totalpaths: [], //所有路径
        processedpaths: [], //设置过属性的路径
        currentpaths: [], //当前选择的所有路径，如similar
        parentpaths: [], //父元素路径
        pagepath: {}, //父元素路径
        rootshadow: {},
        startcatch: false,
        setpaging:false,
        operateshadow: {},
        opeshadowcon: {},
        extraclass: '',
        datamode: 0 //操作状态：0 初始 ,1 选择了一个元素，2 确定选择一个元素 ，3 选择多个元素
    };
    root.checkStep = function(modeindex) {
        var $container = $(CaiyunScope.opeshadowcon);
        $container.find('.extracttxt-container').hide();
        $container.find('.extractattr-container').hide();
        $container.find(".select-div").hide();
        $container.find('.extraclass').hide();
        if (modeindex) {
            if ((CaiyunScope.datamode == 2 || (CaiyunScope.extraclass=='extraurl' && CaiyunScope.datamode == 1)) && modeindex == 1) {
                $container.find('.mode' + 3).show();
                $container.find('.' + CaiyunScope.extraclass).show();
            } else {
                $container.find('.mode' + modeindex).show();
            }
            $container.find("#currentelenum").text(CaiyunScope.currentpaths.length);
        }
    }

})(window)
$(document).ready(function() {
    if (!getLoginInfo()) {
        return false;
    }
    $("body").append("<div id='caiyun-root' class='caiyun-root caiyun-highlight' style='width:0;height:0'></div>");
    $("body").append("<caiyun-operate-container></caiyun-operate-container>");
    CaiyunScope.rootshadow = $("#caiyun-root")[0].createShadowRoot();
    window.HightLight = new HightLight(CaiyunScope.rootshadow, {});
    $(document).click(function(e) {
        var el = e.target;
        if (CaiyunScope.startcatch) {
            e.preventDefault();
            CaiyunScope.uniquepath = CaiyunScope.cssselector.getUniqueSelector(el);
            if (CaiyunScope.parentpaths.length <= 0) {
                CaiyunScope.totalpaths = [CaiyunScope.uniquepath];
                CaiyunScope.similarpath = ''
            }
            CaiyunScope.currentpaths = [CaiyunScope.uniquepath];
            HightLight.repainSelectedShadowDom();
            if(!CaiyunScope.setpaging){
            checkStep(1);}
        }
    })
    $(document).mouseover(function(e) {
        if (CaiyunScope.startcatch && e.target.tagName != 'CAIYUN-OPERATE-CONTAINER' && e.target.tagName != 'BODY') {
            var ele = e.target;
            var sizes = HightLight.getSizes(ele);
            HightLight.addHoverShadowDom(CaiyunScope.rootshadow, sizes);
        }
    })

    var mousedown = false;
    var targettop = 0;
    var targetleft = 0;
    var eletop = 0,
        eleleft = 0;
    $(document).mousedown(function(e) {
        if (e.target.tagName == 'CAIYUN-OPERATE-CONTAINER') {
            e.stopPropagation();
            mousedown = true;
            targettop = e.clientY;
            targetleft = e.clientX;
            eletop = parseFloat($(e.target).css('top'));
            eleleft = parseFloat($(e.target).css('left'));
        }
    })
    $(document).mousemove(function(e) {
        if (e.target.tagName == 'CAIYUN-OPERATE-CONTAINER' && mousedown) {
            e.stopPropagation();
            var top = eletop + e.clientY - targettop;
            var left = eleleft + e.clientX - targetleft;
            if (mousedown) {
                $(e.target).css({
                    top: top + 'px',
                    left: left + 'px'
                })
            }
        }
    })
    $(document).mouseup(function(e) {
        mousedown = false;
    })
})