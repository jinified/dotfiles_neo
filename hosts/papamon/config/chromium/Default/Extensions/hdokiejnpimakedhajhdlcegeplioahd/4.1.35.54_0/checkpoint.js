var Checkpoint=new checkpoint_lib;initCheckpoint();function initCheckpoint(){if("undefined"==typeof Checkpoint||null===Checkpoint)Checkpoint=new checkpoint_lib;return"undefined"==typeof Checkpoint||null===Checkpoint?!1:!0}function doCheckpoint(){return g_enable_checkpoint&&"undefined"!=typeof g_isdebug&&g_isdebug?(initCheckpoint(),Checkpoint.assert.apply(this,arguments)):!0}
function checkpoint_lib(){function e(a,b){return sprintf("%sproperty '%s' is missing or wrong type",b?"["+b+"] ":"",a)}function l(a,b){return sprintf("%sunexpected value of %s was found",b?"["+b+"] ":"",a)}function m(a,b){b=LPPerl.chomp(b);"undefined"!=typeof console&&console&&(1===a?console.warn(b):2===a?console.error(b):console.log(b));return!0}var d=this,k=0,f=0,g=0,h=0;"undefined"!=typeof Date&&(h=(new Date).getTime(),this.checkpoint=function(a,b,c){return!0},this.init=function(){g=f=k=0;h=(new Date).getTime()},
this.reset=function(){d.init()},this.assert=function(){var a=arguments;if("undefined"==typeof g_isdebug||!g_isdebug)return g++,!0;var b=null;"undefined"!=typeof a[3]&&"function"==typeof a[3]&&(b=a[3],"undefined"!=typeof a[4]?b(a[4]):b());if(0>=a.length)return f++,b(),!1;if("undefined"!=typeof a[2]&&a[2])return g++,!0;if(!0===a[0])return k++,!0;f++;m(2,sprintf("ASSERT FAILED: %s !== true%s",a[0],a[1]?" : "+a[1]:""))},this.stats=function(){var a;a="undefined"!=typeof(new Date(h)).toUTCString?(new Date(h)).toUTCString():
parseInt(h/1E3).toString();return m(0,sprintf("Since %s, %d good, %d bad, %d skipped\n",a,k,f,g))},this.getstats=function(){return{good:k,bad:f,skipped:g}},this.validate_share_type=function(a,b){if(!a)return!1;var c;c=(c=(c=(c=(c=(c=(c=d.assert("string"==typeof a.id,e("id",b)))&&d.assert("string"==typeof a.sharekey,e("sharekey",b)))&&d.assert("string"==typeof a.sharename,e("sharename",b)))&&d.assert(d.in_array(a.readonly,["0","1"]),e("readonly",b)))&&d.assert(d.in_array(a.give,["0","1"]),e("give",
b)))&&d.assert("string"==typeof a.sharekeyaes||""===a.sharekeyaes,e("sharekeyaes",b)))&&d.assert(d.in_array(a.associative,[0,"0","1"]),e("associative",b));"undefined"!=typeof a.linkedshare&&(c=c&&d.assert(d.in_array(a.linkedshare,["0","1"]),e("linkedshare",b)));return c=(c=(c=(c=c&&d.assert("string"==typeof a.key,e("key",b)))&&d.assert("string"==typeof a.decsharename,e("decsharename",b)))&&d.assert(lpdec(a.sharename,a.key)===a.decsharename,l("sharename/decsharename",b)))&&d.assert(AES.hex2bin(lpmdec(a.sharekeyaes,
!0))===a.key,l("decrypted sharing key",b))},this.validate_shareinfo_type=function(a,b){if(!a)return!1;var c;return c=(c=(c=(c=(c=(c=(c=d.assert("string"==typeof a.id,e("id",b)))&&d.assert("string"==typeof a.sharekey,e("sharekey",b)))&&d.assert("string"==typeof a.decsharename,e("decsharename",b)))&&d.assert(d.in_array(a.readonly,["0","1"]),e("readonly",b)))&&d.assert(d.in_array(a.give,["0","1"]),e("give",b)))&&d.assert(d.in_array(a.associative,[0,"0","1"]),e("associative",b)))&&d.assert(d.in_array(a.linkedshare,
["0","1"]),e("linkedshare",b))},this.in_array=function(a,b){if("undefined"==typeof b||null===b)return!1;for(var c=b.length,d=0;d<=c;d++)if("undefined"!=typeof b[d]&&b[d]===a)return lpArrayOffset=d,!0;return!1},this.validate_fieldinfo=function(a,b){if(!a)return!1;var c=!0;if(null===a.name||"string"!=typeof a.name)console_warn("FAIL: field.name"),c=!1;if(null===a.type||"string"!=typeof a.type&&!lp_in_array(a.type,"text password button file hidden checkbox radio textarea submit image select select-one".split(" "))&&
!lp_in_array(a.type,"color date datetime datetime-local email month number range search tel time url week".split(" ")))console_warn("FAIL: field.type"),c=!1;"radio"==a.type||"checkbox"==a.type?!0!==a.checked&&!1!==a.checked&&(console_warn("FAIL: field.checked for "+a.type),c=!1):!1!==a.checked&&(c=!1);if("1"===a.otherlogin){""===a.url?(console_warn("FAIL: field.url should be set in addruid case"),c=!1):hex2url(a.url).match(/^https?:\/\//,"i")||(console_warn("FAIL: invalid field.url"),c=!1);if(""===
a.urid||"0"===a.urid)console_warn("FAIL: field.urid should be set in addurid case"),c=!1;!1!==a.otherfield&&(console_warn("FAIL: field.otherfield must be false in addurid case"),c=!1)}else"0"!==a.otherlogin&&""!==a.otherlogin&&(console_warn("FAIL: field.otherlogin [deprecated?]"),c=!1),""!==a.url&&(console_warn("FAIL: field.url should be empty in non-addurid case"),c=!1),"0"!==a.urid&&""!==a.urid&&(console_warn("FAIL: field.urid should be empty in non-addurid case"),c=!1);!0!==a.otherfield&&!1!==
a.otherfield&&(console_warn("FAIL: field.otherfield [deprecated?]"),c=!1);for(var d in a)a.hasOwnProperty(d)&&!lp_in_array(d,"name type value formname checked urid otherlogin url otherfield".split(" "))&&(console_warn("found an unexpected property in field info: "+d),c=!1);return c})};