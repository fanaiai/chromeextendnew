xtag.register('caiyun-operate-container', {
    content: '',
    lifecycle: {
        created: function() {
            this.createDom();
        },
        inserted: function() {
            // console.log("inserted,插入标签");

        },
        removed: function() {
            console.log("removed,删除标签");
        },
        attributeChanged: function(attrName, oldValue, newValue) {
            console.log("attributeChanged", attrName, oldValue, newValue);
        }
    },
    methods: {
        createDom: function() {
            var shadow = this.createShadowRoot();
            var style = `<style type="text/css">
                            table {
                                border-collapse: collapse;
                                border-spacing: 0;
                            }
                            .catch-container{
                                width: 100%;
                                border-radius: 3px;
                                box-sizing: border-box;
                                font-size:12px;
                                font-family:'微软雅黑';
                                text-align:left;
                                color:#333;
                            }
                            .catch-container>div>div{
                                padding:10px;
                                border-top: 1px solid rgb(170, 170, 170);
                            }
                            .catch-container ul{
                                list-style: none;
                                line-height:28px;
                                font-size:14px;
                                padding: 0;
                            }
                            .catch-container ul li{
                                padding:0 10px;
                                background:rgb(250, 253, 255);
                            }
                            a{
                                cursor: pointer;
                                color:rgb(0, 139, 230);
                                margin-right:10px;
                                pointer-events:auto;
                            }
                            a:hover{
                                color:red;
                            }
                            h5{
                                font-size: 16px;
                                line-height: 40px;
                                margin: 0;
                                text-align: center;
                                cursor:move;
                                background:rgb(2, 136, 209);
                                color:#fff;
                            }
                            .ope,.info{
                                line-height: 30px;
                                 background:rgb(251, 251, 251);
                            }
                            .ope a{
                                color:rgb(0, 139, 230);
                                font-size:14px;
                            }
                            textarea{
                                width:100%;
                                height:60px;
                                box-sizing:border-box;
                            }
                            p{
                                margin:0;
                            }
                            .selected-container{
                                background:#fff;
                                overflow:auto;
                                max-height:300px;
                            }
                            .extractattr-container,.extracttxt-container{
                            }
                            #infotable{
                            }
                            #infotable td{
                                    border: 1px solid rgb(238, 238, 238);
                                    max-height: 30px;
                                    height: 30px;
                                    overflow: hidden;
                                    white-space: nowrap;
                                    max-width: 200px;
                                    text-overflow: ellipsis;
                            }
                            .inner-container{
                                height:calc(100% - 40px);
                                overflow:auto;
                            }
                            .extractattr-container a,.extracttxt-container a{
                                font-size:12px;
                                color:rgb(61, 165, 20);
                            }
                            input{
                                display:block;
                                margin-top:10px;
                            }
                            div>input:first-child{
                                margin-top:0;
                            }
                            .extractattr-container,.extracttxt-container{
                                padding: 10px 10px 0 10px;
                                background: rgb(238, 238, 238);
                            }
                        </style>`;
            var innerHtml = `
                <div class="catch-container">
                        <h5>操作提示</h5>
                        <div class="inner-container">
                        <div class="ope">
                            <a class='startcatch' data-mode='0'>开始选择页面元素</a>
                            <a class='clearselection' data-mode='0'>清除所有选择</a>
                        </div>
                        <div class="mode1 select-div">
                            <p>已选择1个元素，您可以进行以下操作：</p>
                            <ul>
                                <li class="selectsimilar" data-mode='1'><a>选择同类元素</a></li>
                                <li>
                                    <a class="extracttxt" data-mode='1'>提取文本</a>
                                    <div class="extracttxt-container">
                                        <input type="text" placeholder="字段名称" class="fieldname"/>
                                        <a class="savetxt" data-mode='1'>保存</a>
                                    </div>
                                </li>
                                <li>
                                    <a class="extractattr" data-mode='1'>提取属性</a>
                                    <div class="extractattr-container">
                                        <input type="text" placeholder="字段名称" class="fieldname"/>
                                        <input type="text" placeholder="属性名称" class="attrname"/>
                                        <a class="saveattr" data-mode='1'>保存</a>
                                    </div>
                                </li>
                                <li class="clickone" data-mode='1'><a>点击该元素内的链接</a></li>
                                <li class="cancelselected" data-mode='1'><a>取消选择</a></li>
                            </ul>
                        </div>
                        <div class="mode2 select-div">
                            <p>已选择<span id="currentelenum"></span>个元素，您可以进行以下操作：</p>
                            <ul>
                                <li>
                                    <a class="extracttxt" data-mode='2' data-extraclass="extratxt">循环提取文本</a>
                                </li>
                                <li>
                                    <a class="extractattr" data-mode='2' data-extraclass="extraattr">循环提取属性</a>
                                </li>
                                <li><a class="clickall"  data-mode='2' data-extraclass="extraurl">循环点击这些元素内的链接</a></li>
                                <li class="cancelselected"  data-mode='2'><a>取消选择</a></li>
                            </ul>
                        </div>
                        <div class="mode3 select-div">
                            <p>已选择<span id="currentelenum"></span>个元素，请选择已选元素内需要循环提取文本的子元素
:</p>
                            <ul>
                                <li class="extratxt extraclass">
                                    <div>
                                        <input type="text" placeholder="字段名称" class="fieldname"/>
                                        <a class="savetxt" data-mode='3'>保存</a>
                                    </div>
                                </li>
                                <li class="extraattr extraclass">
                                    <div>
                                        <input type="text" placeholder="字段名称" class="fieldname"/>
                                        <input type="text" placeholder="属性名称" class="attrname"/>
                                        <a class="saveattr" data-mode='3'>保存</a>
                                    </div>
                                </li>
                                <li class="extraurl extraclass">
                                    <div>
                                        <input type="text" placeholder="字段名称" class="fieldname" value="url"/>
                                        <input type="text" placeholder="属性名称" class="attrname" value="href"/>
                                        <a class="openlink" data-mode='3'>确定</a>
                                    </div>
                                </li>
                                <li class="cancelselected" data-mode='3'><a>取消</a></li>
                            </ul>
                        </div>
                        <!--<div class="info">
                            <textarea id="csspath"></textarea>
                            <a class="applynewpath">应用新css路径</a>
                        </div>-->
                        <div class="selected-container">
                            <p>已配置元素</p>
                            <table id="infotable">
                            </table>
                        </div>
                        <div class="finish">
                            <a>完成并保存</a>
                        </div>
                        </div>
                    </div>
            `;
            shadow.innerHTML = style + innerHtml;
            this.shadow = CaiyunScope.operateshadow = shadow;
            CaiyunScope.opeshadowcon = shadow.querySelector('.catch-container');
            this.checkStep(0);
            this.extradata = [];
            this.css_selecter = [];
            this.addShadowEvents();
        },
        addShadowEvents: function() {
            var that = this;
            $shadowcontainer = $(this.shadow.querySelector('.catch-container'));
            $shadowcontainer.mousedown(function(e) {
                if (e.target.tagName != 'H5') {
                    e.stopPropagation();
                }
            })
            $shadowcontainer.click(function(e) {
                var $el = $(e.target);
                var classname = $(e.target).attr("class") || $(e.target).parent().attr("class");
                var datamode = $el.attr('data-mode');

                switch (classname) {
                    case 'selectsimilar':
                        CaiyunScope.datamode = datamode;
                        var similarpaths = CaiyunScope.cssselector.getSimilarSelectorList(CaiyunScope.uniquepath);
                        CaiyunScope.totalpaths = CaiyunScope.totalpaths.concat(similarpaths.minus(CaiyunScope.totalpaths));
                        CaiyunScope.currentpaths = CaiyunScope.totalpaths;
                        CaiyunScope.similarpath = CaiyunScope.cssselector.getSimilarSelector(CaiyunScope.uniquepath)
                        HightLight.repainSelectedShadowDom();
                        checkStep(2);
                        break;
                    case 'startcatch':
                        CaiyunScope.datamode = datamode;
                        CaiyunScope.startcatch = !CaiyunScope.startcatch;
                        $(e.target).text(CaiyunScope.startcatch ? '停止选择页面元素' : '开始选择页面元素');
                        break;
                    case 'clearselection':
                        CaiyunScope.datamode = datamode;
                        CaiyunScope.totalpaths = [];
                        CaiyunScope.currentpaths = [];
                        CaiyunScope.processedpaths = [];
                        that.extradata = [];
                        that.rendInfo();
                        HightLight.repainSelectedShadowDom();
                        CaiyunScope.checkStep();
                        break;
                    case 'clickone':
                        CaiyunScope.datamode = datamode;
                        that.css_selecter.push(CaiyunScope.uniquepath);
                        that.openLink();
                        break;
                    case 'clickall':
                        // CaiyunScope.datamode = datamode;
                        // that.css_selecter = CaiyunScope.totalpaths;
                        // that.openLink();
                        CaiyunScope.startcatch = true;
                        CaiyunScope.extraclass = $el.attr('data-extraclass');
                        CaiyunScope.datamode = datamode;
                        if (CaiyunScope.parentpaths.length <= 0) {
                            CaiyunScope.parentpaths = $.extend(true, {}, CaiyunScope.currentpaths);
                            CaiyunScope.currentpaths = [];
                            HightLight.repainSelectedShadowDom();
                        }
                        checkStep(3);
                        break;
                    case 'openlink':
                        CaiyunScope.datamode = datamode;
                        var extradata = {
                            "name": $el.parent().children('.fieldname').val(),
                            "attr_name": $el.parent().children('.attrname').val(),
                            "extratype": "txt",
                            "css_selecter": CaiyunScope.currentpaths,
                            "custom_css_selecter": ""
                        }
                        extradata.custom_css_selecter = CaiyunScope.cssselector.getSubSelector(CaiyunScope.similarpath, CaiyunScope.currentpaths[0])
                        CaiyunScope.startcatch = false;
                        checkStep(2);
                        that.saveExtractData($el, extradata,true);
                        // that.css_selecter.push(CaiyunScope.uniquepath);
                        that.openLink(extradata.attr_name);
                        break;
                    case 'extracttxt':
                        CaiyunScope.startcatch = true;
                        CaiyunScope.extraclass = $el.attr('data-extraclass');
                        CaiyunScope.datamode = datamode;
                        if (datamode == 1) {
                            $el.next('.extracttxt-container').toggle();
                        } else {
                            if (CaiyunScope.parentpaths.length <= 0) {
                                CaiyunScope.parentpaths = $.extend(true, {}, CaiyunScope.currentpaths);
                                CaiyunScope.currentpaths = [];
                                HightLight.repainSelectedShadowDom();
                            }
                            checkStep(3);
                        }
                        break;
                    case 'extractattr':
                        CaiyunScope.startcatch = true;
                        CaiyunScope.extraclass = $el.attr('data-extraclass');
                        CaiyunScope.datamode = datamode;
                        if (datamode == 1) {
                            $el.next('.extracttxt-container').toggle();
                        } else {
                            if (CaiyunScope.parentpaths.length <= 0) {
                                CaiyunScope.parentpaths = $.extend(true, {}, CaiyunScope.currentpaths);
                                CaiyunScope.currentpaths = [];
                                HightLight.repainSelectedShadowDom();
                            }
                            checkStep(3);
                        }
                        $el.next('.extractattr-container').toggle();
                        break;
                    case 'savetxt':
                        CaiyunScope.datamode = datamode;
                        var extradata = {
                            "name": $el.parent().children('.fieldname').val(),
                            "extratype": "txt",
                            "css_selecter": CaiyunScope.currentpaths,
                            "custom_css_selecter": ""
                        }
                        if (datamode == 3) {
                            extradata.custom_css_selecter = CaiyunScope.cssselector.getSubSelector(CaiyunScope.similarpath, CaiyunScope.currentpaths[0])
                            CaiyunScope.startcatch = false;
                            checkStep(2);
                        } else {
                            $el.parent().hide();
                        }
                        that.saveExtractData($el, extradata);
                        break;
                    case 'saveattr':
                        CaiyunScope.datamode = datamode;
                        var extradata = {
                            "name": $el.parent().children('.fieldname').val(),
                            "attr_name": $el.parent().children('.attrname').val(),
                            "extratype": "txt",
                            "css_selecter": CaiyunScope.currentpaths,
                            "custom_css_selecter": ""
                        }
                        if (datamode == 3) {
                            console.log(CaiyunScope.similarpath, CaiyunScope.currentpaths[0])
                            extradata.custom_css_selecter = CaiyunScope.cssselector.getSubSelector(CaiyunScope.similarpath, CaiyunScope.currentpaths[0])
                            console.log(extradata.custom_css_selecter)
                            CaiyunScope.startcatch = false;
                            checkStep(2);
                        } else {
                            $el.parent().hide();
                        }
                        that.saveExtractData($el, extradata);
                        break;
                    case 'cancelselected':
                        CaiyunScope.datamode = datamode;
                        if (datamode == 1) {

                        }
                        CaiyunScope.processedpaths.deleteArray(CaiyunScope.currentpaths);
                        var newextradata = [];
                        $.each(that.extradata, function(i, ele) {
                            ele.css_selecter.deleteArray(CaiyunScope.currentpaths);
                            if (ele.css_selecter.length > 0) {
                                newextradata.push(ele);
                            }
                        })
                        that.extradata = newextradata;
                        CaiyunScope.currentpaths = CaiyunScope.totalpaths = [];
                        that.rendInfo();
                        HightLight.repainSelectedShadowDom(CaiyunScope.rootshadow, CaiyunScope.totalpaths, CaiyunScope.processedpaths, CaiyunScope.currentpaths);
                        CaiyunScope.checkStep();
                        break;
                    case 'finish':
                        CaiyunScope.datamode = datamode;
                        var openpage = {
                            "extradata": that.extradata,
                            "css_selecter": [],
                            "parentpaths": CaiyunScope.parentpaths,
                            "similarpath": CaiyunScope.similarpath
                        }
                        CaiyunSteps[caiyunstep - 1] = openpage;
                        chrome.storage.local.set({ caiyunsteps: CaiyunSteps }, function() {});
                        chrome.storage.local.get({ caiyunseedurl: '' }, function(items) {
                            constructPostData(CaiyunSteps, items.caiyunseedurl);
                        });
                        break;
                }

            })
            $shadowcontainer.find('.applynewpath').click(function(e) {
                CaiyunScope.totalpaths.splice(CaiyunScope.totalpaths.includeItem(CaiyunScope.uniquepath), 1)
                CaiyunScope.uniquepath = CaiyunScope.cssselector.getUniqueSelector($(that.shadow.querySelector('#csspath').value)[0]);
                if (CaiyunScope.totalpaths.includeItem(CaiyunScope.uniquepath) <= -1) {
                    CaiyunScope.totalpaths.push(CaiyunScope.uniquepath);
                }
                HightLight.repainSelectedShadowDom(CaiyunScope.rootshadow, CaiyunScope.totalpaths, CaiyunScope.processedpaths, CaiyunScope.currentpaths);
                CaiyunScope.checkStep();
            })
        },
        saveExtractData: function($el, extradata,isopenlink) {
            var that = this;
            that.extradata.push(extradata);
            that.rendInfo();
            CaiyunScope.processedpaths = CaiyunScope.processedpaths.concat(CaiyunScope.currentpaths);
            if(!isopenlink){
            CaiyunScope.currentpaths = [];}
            HightLight.repainSelectedShadowDom();
        },
        openLink: function(attrname) {
            var that = this;
            var openpage = {
                "extradata": that.extradata,
                "css_selecter": that.css_selecter,
                "parentpaths": CaiyunScope.parentpaths
            }
            CaiyunSteps[caiyunstep - 1] = openpage;
            chrome.storage.local.set({ caiyunsteps: CaiyunSteps }, function() { console.log(CaiyunSteps) });
            // var el_a;
            // $.each(CaiyunScope.currentpaths, function(i, ele) {
            //     var $el = $(ele.pathstring);
            //     if ($(ele.pathstring)[0].tagName == 'A') {
            //         el_a = $(ele.pathstring).attr('href');
            //         return false;
            //     } else {
            //         if ($el.find('a')[0]) {
            //             el_a = $($el.find('a')[0]).attr('href');
            //             return false;
            //         }
            //     }

            // })
            var $el=$(CaiyunScope.currentpaths[0].pathstring);
            if ($el[0].tagName!='A') {
                alert('所选属性不是可点击的链接');
            } else {
                chrome.storage.local.set({ caiyunstep: parseInt(caiyunstep) + 1 }, function() {
                    console.log('保存成功！');
                });
                window.open($el.attr(attrname), '_top');
            }
        },
        rendInfo: function() {
            var that = this;
            var $infotable = $(CaiyunScope.opeshadowcon).find("#infotable");
            $infotable.empty();
            console.log(that.extradata)
            var infolist = getExtractInfo(that.extradata);
            $.each(infolist, function(i, ele) {
                var inner = '<tr>' +
                    '<td title="' + ele.name + '">' + ele.name + '</td>' +
                    '<td title="' + ele.value + '">' + ele.value + '</td>' +
                    '<td title="' + ele.attr_name + '">' + ele.attr_name + '</td>' +
                    '<td title="' + ele.type_name + '">' + ele.type_name + '</td>' +
                    '<td title="' + ele.path + '">' + ele.path + '</td>' +
                    '</tr>'
                $infotable.append(inner);
            })
        },
        checkStep: function(modeindex) {
            var $container = $(this.shadow.querySelector('.catch-container'));
            $container.find('.extracttxt-container').hide();
            $container.find('.extractattr-container').hide();
            $container.find(".select-div").hide();
            if (modeindex) {
                $container.find('.mode' + modeindex).show();
                $container.find("#currentelenum").text(CaiyunScope.currentpaths.length);
            }
        }
    },
    events: {
        'click': function(e) {
            e.stopPropagation();
            //e.currentTarget still === your xtag element
        }
    }
});