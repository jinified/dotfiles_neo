function sendRequest(a){if(null!=a)if(a.cmd&&"popupfillinputget"!=a.cmd&&"popupfilliconnumber"!=a.cmd&&L("IF -> BG : cmd="+a.cmd),g_ischrome)try{chrome_runtime_sendMessage(a,function(){})}catch(b){}else g_issafari?safari.self.tab?safari.self.tab.dispatchMessage(a.cmd,a):safari.extension&&safari.extension.globalPage&&safari.extension.globalPage.contentWindow&&safari.extension.globalPage.contentWindow.message_handler({name:a.cmd,message:a,target:window}):g_isfirefoxsdk?(a.messagetype=a.cmd,send_message(a)):
g_iscasper&&"function"==typeof t_sendmsg&&t_sendmsg(a)}
var g_reference_url="",InfieldIcons={globe:"/images/Globe.png",profile:"/images/Profile.png",other:"/images/Other.png",mastercard:"/images/Mastercard.png",visa:"/images/Visa.png",amex:"/images/Amex.png",discover:"/images/Discover.png"},InfieldCommands=function(){function a(a){csTop.LPInfieldFrame.close(a)}return{closePopup:a,copyToClipboard:function(a,c){sendRequest({cmd:"copytoclipboard",g_data:a,action:c,source:"formv2"})},editSite:function(a){sendRequest({cmd:"editaid",aid:a,fromiframe:1})},fillUsernamePass:function(b){sendRequest({cmd:"autofillaid",
aid:b,from_iframe:!0,no_manualfill_on_saveall:!0,fromiframe:1});a("action")},copyUrl:function(a){sendRequest({cmd:"copyurl",aid:a,fromiframe:1})},copyUserName:function(a){sendRequest({cmd:"copyusername",aid:a,fromiframe:1})},copyPassword:function(a){sendRequest({cmd:"copypassword",aid:a,fromiframe:1,source:"formv2"})},editFormFill:function(b){sendRequest({cmd:"editprofile",ffid:b,fromiframe:1,source:"formv2"});a("action")},fillForm:function(b){sendRequest({cmd:"fillformffid",ffid:b,fromiframe:1,source:"formv2"});
a("action")},getGeneratePrefs:function(a){chrome_runtime_sendMessage({cmd:"popupfillgetgenerateprefs"},a)},writeAllPrefs:function(a,c){chrome_runtime_sendMessage({cmd:"popupfillsetgenerateprefs",prefstr:a,genpwstr:c})},fillGeneratedPassword:function(b,c){sendRequest({cmd:"fillgenpassword",password:b,saveOptions:c,nofill:1});a("action")},searchVault:function(a,c,d){chrome_runtime_sendMessage({cmd:"searchvault",searchQuery:a,searchType:c},d)},getInitialData:function(a){chrome_runtime_sendMessage({cmd:"getpopupfilldata"},
a)}}}();
(function(a){var b=function(c,d,f){var b=this;b._onResizeCallback=f;c&&(b._triggerElement=c instanceof jQuery?c:a("#"+c),d?(b._triggerElement.click(function(a){b.show();b._setPosition(a)}),b._triggerElement.keypress(function(c){b.show();a(b._menuElement[0]).children().children()[0].focus();b._setPosition(c)})):(b._triggerElement.children().click(function(a){b.show()}),b._triggerElement.children().keypress(function(c){b.show();a(b._menuElement[0]).children().children()[0].focus()})))};b.prototype._setPosition=function(b){b=
a(b.currentTarget).offset();b.top+=20;b.left+=20;this._menuElement.offset(b)};b.prototype.show=function(){a(".dropdown").hide();a(".menuTriggered").removeClass("menuTriggered");var b=this;b._triggerElement.closest(".tile").addClass("menuTriggered");b._triggerElement.addClass("menuTriggered");this._menuElement&&this._menuElement.show(0,function(){b._onResizeCallback&&b._onResizeCallback(b._menuElement.height(),90)})};b.prototype.hide=function(a){this._triggerElement.closest(".tile").removeClass("menuTriggered");
this._triggerElement.removeClass("menuTriggered");this._triggerElement.blur();this._menuElement&&(this._menuElement.hide(a),this._onResizeCallback())};b.prototype.resetTimer=function(a){var b=this;b._menuElement&&(b._menuTimer=setTimeout(function(){b.hide()},a||1E3))};b.prototype.createMenu=function(b,d,f){var c=this;c._menuElement=a("<div></div>").attr("id",b+"Menu").addClass("dropdown").addClass(d).hide().hover(function(){c._triggerElement.closest(".tile");clearTimeout(c._menuTimer)},function(){c.resetTimer(300)}).append(c._createMenuItems(f));
return c._menuElement};b.prototype._createMenuItems=function(b){var d=this;d._menuItems=b;b=a("<ul></ul>").addClass("menuList");for(var f=0;f<d._menuItems.length;f++){var c=a("<li></li>").attr("data-viewId",d._menuItems[f].id).attr("tabindex","1").click(function(a){d.hide();d.select(a.currentTarget.getAttribute("data-viewId"),!0)}).focus(function(){clearTimeout(d._menuTimer)}).keypress(function(a){d.hide();d.select(a.currentTarget.getAttribute("data-viewId"),!0)}).append(a("<p></p>").text(d._menuItems[f].text));
b.append(c)}return b};b.prototype._findMenu=function(b){var d=a.grep(this._menuItems,function(a){return a.id===b});return d&&0<d.length?d[0]:null};b.prototype.select=function(a,b){var d=this._findMenu(a);d&&this._triggerElement&&this._triggerElement.find("p").text(d.selectedText);!0===b&&d&&d.action&&d.action()};return window.InfieldMenu=b})(jQuery);
var InfieldView=function(a){function b(){a.each(c,function(b,c){a("#"+c).hide()})}var c=[];return{init:function(a){Array.isArray(a)&&0<a.length&&(c=a,b())},show:function(d){-1!=c.indexOf(d)&&(b(),a("#"+d).show())}}}(jQuery),InfieldGeneratePassword=function(a){function b(){var b=lpCreatePass(a("#length").val(),a("#upper").prop("checked"),a("#lower").prop("checked"),a("#digits").prop("checked"),a("#special").prop("checked"),2,a("#ambig").prop("checked"),!0,a("#pronounceable").prop("checked"));a("#password").val(b).change()}
function c(){a("#generatedPasswordLength").text(a("#length").val());a("#sliderFill").width(a("#length").val()+"%")}var d={};return{init:function(f,k,h){a("#moreOptions, #hideOptions").click(function(){a("#advancedView").toggle();a("#generateAndFillView").toggle();a("#generateBtnContainer").toggle();a("#moreOptions").toggle();h&&h()});a("#length").on("input",function(){InfieldSearch.debounce(c(),500)});a(".pwgen").change(b);a("#generateBtn").click(b);a("#pronounceable").click(function(){a("#pronounceable").prop("checked")?
(a("#digits").prop("checked",!1),a("#digits").prop("disabled",!0),a("#special").prop("checked",!1),a("#special").prop("disabled",!0),a("#ambig").prop("checked",!1),a("#upper").prop("checked",!0),a("#lower").prop("checked",!0)):(a("#digits").prop("checked",!0),a("#digits").prop("disabled",!1),a("#special").prop("checked",!0),a("#special").prop("disabled",!1))});a("#ambig").click(function(){a("#ambig").prop("checked")&&(a("#pronounceable").prop("checked",!1),a("#digits").prop("disabled",!1),a("#special").prop("disabled",
!1))});a("#password").LP_addGeneratePasswordMeter();a("#btnCopy").click(function(){f.copyToClipboard(a("#password").val(),"generatepassword")});k=function(){f.fillGeneratedPassword(a("#password").val(),{pronounceable:a("#pronounceable").prop("checked"),length:a("#password").val().length,expand:a("#moreOptions").is(":hidden"),uppercase:a("#upper").prop("checked"),lowercase:a("#lower").prop("checked"),numeric:a("#digits").prop("checked"),special:a("#special").prop("checked"),avoidAmbiguous:a("#ambig").prop("checked"),
source:"formv2"});d[Object.keys(d).length]=a("#password").val();f.writeAllPrefs(JSON.stringify({generate_pronounceable:a("#pronounceable").prop("checked")?1:0,generate_length:a("#length").val(),generate_upper:a("#upper").prop("checked")?1:0,generate_lower:a("#lower").prop("checked")?1:0,generate_digits:a("#digits").prop("checked")?1:0,generate_special:a("#special").prop("checked")?1:0,generate_ambig:a("#ambig").prop("checked")?1:0,generate_mindigits:2,generate_reqevery:0}),LPJSON.stringify(d))};a("#fillPasswordBtn").click(k);
a("#generateAndFillBtn").click(k);a("#generateAndFillBtn").keypress(k);a("#advancedView").hide();a("#generateBtnContainer").hide()},setup:function(b){d=LPJSON.parse(b.genpwstr);b=JSON.parse(b.prefstr);a("#length").val(parseInt(b.generate_length));c();a("#upper").prop("checked",parseInt(b.generate_upper)?!0:!1);a("#lower").prop("checked",parseInt(b.generate_lower)?!0:!1);a("#digits").prop("checked",parseInt(b.generate_digits)?!0:!1);a("#special").prop("checked",parseInt(b.generate_special)?!0:!1);
a("#ambig").prop("checked",parseInt(b.generate_ambig)?!0:!1);a("#advancedView").hide();a("#generateAndFillView").show();parseInt(b.generate_pronounceable)?a("#pronounceable").click():a("#pronounceable").prop("pronounceable",!1);a("#password").val(lpCreatePass(a("#length").val(),a("#upper").prop("checked"),a("#lower").prop("checked"),a("#digits").prop("checked"),a("#special").prop("checked"),2,a("#ambig").prop("checked"),!0,a("#pronounceable").prop("checked"))).change()},show:function(){a("#moreOptions").show();
a("#generateBtnContainer").hide()},hide:function(){a("#moreOptions").hide();a("#generateBtnContainer").hide()}}}(jQuery),InfieldTiles=function(a,b,c,d){function f(b,d,c){var e="";if("formfills"===d)if(0==c.profiletype)b=InfieldIcons.profile;else switch(c.ccType){case "VISA":b=InfieldIcons.visa;break;case "AMEX":b=InfieldIcons.amex;break;case "MC":b=InfieldIcons.mastercard;break;case "DISC":b=InfieldIcons.discover;break;default:b=InfieldIcons.other}else e="siteIcon",b=b&&c.aid&&b[c.aid]?b[c.aid]:InfieldIcons.globe;
return{normalEl:a("<img/>").attr("src",b).addClass("defaultIcon "+e)}}function k(b){return a("<div></div>").addClass("col-2 no-left-gutter no-right-gutter").append(a("<div></div>").addClass("icon").append(b))}function h(d,e){if(!e)return null;var f=null,h=a("<div></div>").addClass("col-8 text full-height"),g=a("<button></button>").attr("id",e.id+"btn").attr("tabindex","1").text(e.moreText);switch(d){case "formfills":h.append(a("<span></span>").text(e.name));e.description&&h.removeClass("full-height").append(a("<br/>")).append(a("<span></span>").addClass("small").text(e.description));
break;case "sites":h.append(a("<span></span>").addClass("small").text(e.name)),e.description&&h.removeClass("full-height").append(a("<br/>")).append(a("<span></span>").text(e.description)),f=new c(g,!0,m),a("#menuContainer").append(f.createMenu(e.id+"btn","tileDropdown",[{id:"copyPassword",text:"Copy password",action:function(){b.copyPassword(e.id)}},{id:"copyUsername",text:"Copy username",action:function(){b.copyUserName(e.id)}},{id:"copyURL",text:"Copy URL",action:function(){b.copyUrl(e.id)}},{id:"editSite",
text:"Edit",action:function(){b.editSite(e.id)}}]))}e.moreHandler&&g.click(e.moreHandler);var f=a("<div></div>").addClass("col-2 no-right-gutter no-left-gutter pull-right more").append(g),t=k([e.icons.normalEl]);t.click(e.clickHandler);h.click(e.clickHandler);var n=a("<div></div>").addClass("tile col-12").attr("id",e.id).attr("tabindex","1").append(a("<div></div>").addClass("row").append(t,h,f)).hover(function(){},function(){n.removeClass("triggered")});e.lastTile&&n.addClass("lastTile");g.focus(function(){n.addClass("triggered")}).blur(function(){n.removeClass("triggered")}).click(function(){n.addClass("menuTriggered");
n.removeClass("triggered")});return n}var m;return{setup:function(c,e,k,q,w,t){m=w;var g=[];a("#menuContainer").empty();a("#"+c).empty().append(a('<p class="italic"></p>').text(t));if(k){var l=a.map(k,function(a,b){return a});l.sort(function(a,b){return a});a.each(l,function(a,c){var k=!1;a+1===l.length&&(k=!0);(k=h(e,{id:"sites"===e?c.aid:c.ffid,name:"sites"===e?c.name:c.decprofilename,description:"sites"===e?c.unencryptedUsername:1==c.profiletype?c.formattedCCNum:null,icons:f(q,e,c),moreText:"sites"===
e?d.translateString("More"):d.translateString("Edit"),moreHandler:"sites"===e?null:function(){b.editFormFill(c.ffid)},clickHandler:"sites"===e?function(){b.fillUsernamePass(c.aid)}:function(){b.fillForm(c.ffid)},lastTile:k}))&&g.push(k)});0<g.length&&a("#"+c).empty().append(g)}return g.length}}}(jQuery,InfieldCommands,InfieldMenu,Strings),InfieldSearch=function(a){function b(a,b){var c;return function(){var d=this,e=arguments;clearTimeout(c);c=setTimeout(function(){c=null;a.apply(d,e)},b)}}function c(){m.fadeOut();
h.show();h.animate({width:"360px"},250,function(){r.show();e.fadeIn().focus()});q.addClass("searchBtnActive")}function d(){e.val("");e.hide();r.fadeOut();h.show();h.animate({width:"16px"},250,function(){g.fadeOut();m.fadeIn()});q.removeClass("searchBtnActive")}function f(){h.show()}function k(){e.hide();g.hide();r.hide();h.hide()}var h,m,g,e,r,q;return{init:function(f){h=a("#searchContainer");m=a("#currentTab");g=a("#searchBtnContainer");e=a("#inlineSearch");r=a("#searchCloseBtn");q=a("#searchBtn");
e.hide();r.hide();h.show().css({width:"16px"});g.hide();m.show();q.removeClass("searchBtnActive");a("#searchBtn").click(function(){c()}).keypress(function(){c()});a("#searchCloseBtn").click(function(){d();f("")}).keypress(function(){d();f("")});if(f){var k=b(function(b){f(a(b.currentTarget).val())},500);e.keyup(k)}},debounce:b,showIcon:f,hideIcon:k,display:function(a){a&&!0===a?f():k()}}}(jQuery),lpInfield=function(a,b,c,d,f,k,h,m,g){function e(b){x&&b&&b.position&&a.isNumeric(b.position)&&10<b.position&&
370>b.position&&x.show("top",b.position)}function r(){u=new c("currentTab",null,l);var b=u.createMenu("navigation",null,[{id:"sitesView",text:g.translateString("Log inlower"),selectedText:g.translateString("Log in as"),action:function(){p.start_type="sites";v(p)}},{id:"formFillView",text:g.translateString("Fill form"),selectedText:g.translateString("Fill form with"),action:function(){p.start_type="formfills";v(p)}},{id:"generatePassView",text:g.translateString("Generate password"),selectedText:g.translateString("Generate password"),
action:function(){p.start_type="generate";v(p)}}]);a("#navigationPlaceholder").append(b)}function q(){a("#btnClose").click(function(){b.closePopup("close")});a("#btnClose").keypress(function(){b.closePopup("close")})}function w(a){var b=document.createElement("iframe");b.setAttribute("class","backgroundFrame");b.src="backgroundFrame.html";b.style.display="none";b.addEventListener("load",function(){b.contentWindow.LPPlatform.getBackgroundInterface({mainRequestFramework:!1,interfaceDefinition:Interfaces.InfieldPopupInterface,
context:"infieldPopup",callback:function(b){window.bg=b;a&&a()}});b.contentWindow.Topics.get(b.contentWindow.Topics.REQUEST_FRAMEWORK_INITIALIZED).subscribe(function(a,b){var c=parseInt(a.topFrameID);window.csTop=Interfaces.createInstance(Interfaces.ContentScriptInterface,{direct:!1,context:"infieldPopup",requestFunction:function(a){b.sendRequest({type:"contentScriptRequest",data:a,frameID:c})}});window.csTop.LPFrame.initializeRequestFramework(LPTools.getURLParams().dialogID)})});document.body.appendChild(b)}
function t(a){b.searchVault(a,p.start_type,n)}function n(a){var b=p.start_type;if(a&&(a=JSON.parse(a)))switch(b){case "sites":f.setup("sitesView",b,a.sites,a.bigicons,l,y);break;case "formfills":f.setup("formFillView",b,a.formfills,null,l,z)}}function l(b,c){var d=a(".infield-dialog").outerHeight()+20,e=a(".infield-dialog").outerWidth()+10;b&&a.isNumeric(b)&&(d+=b);c&&a.isNumeric(c)&&(e+=c);csTop.LPInfieldFrame.resizeFrame(d,e)}function v(c){if(c){p=c;if(c.start_type)switch(c.start_type){case "sites":if(c.sites){var e=
JSON.parse(c.sites),g=c.bigicons?JSON.parse(c.bigicons):null;c=f.setup("sitesView",c.start_type,e,g,l,A);u.select("sitesView");d.show("sitesView");k.display(2<c);h.hide()}break;case "formfills":c.formfills&&(e=JSON.parse(c.formfills),c=f.setup("formFillView",c.start_type,e,null,l,B),u.select("formFillView"),d.show("formFillView"),k.display(2<c),h.hide());break;case "generate":b.getGeneratePrefs(h.setup),u.select("generatePassView"),d.show("generatePassView"),k.display(!1),h.show()}csTop.LPInfieldFrame.positionFrame();
csTop.LPInfieldFrame.show();a(".infield-dialog").show()}else b.closePopup("close")}var u,p,x,A=g.translateString("No sites found for this web address. You can log in to this website to save your credentials"),y=g.translateString("No sites found matching your search."),B=g.translateString("No Form Fills saved. You can add one in your Vault."),z=g.translateString("No Form Fills found matching your search.");return{init:function(){document.addEventListener("DOMContentLoaded",function(){w(function(){g.translate(document.body);
x=new m({$parentEl:a(".infield-dialog")});e({position:360});q();d.init(["sitesView","formFillView","generatePassView"]);r();k.init(t);h.init(b,u,l);(new MutationObserver(function(){l()})).observe(a(".infield-dialog")[0],{subtree:!0,childList:!0});b.getInitialData(v);a("#currentTabText").focus()})})},setArrowPosition:e}}(jQuery,InfieldCommands,InfieldMenu,InfieldView,InfieldTiles,InfieldSearch,InfieldGeneratePassword,lpArrow,Strings);lpInfield&&lpInfield.init();