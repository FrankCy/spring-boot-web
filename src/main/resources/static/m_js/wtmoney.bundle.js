/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {




function showInfo(text) {
    $("body").addClass("overflow-hidden");
    $(".info-text").html(text);
    $(".modal-info").fadeIn(300);

    setTimeout(function () {
        $("body").removeClass("overflow-hidden");
        $(".modal-info").fadeOut(300);
    }, 1000);
}
var server = 'http://139.199.23.160:8080/qmzb';
var login_uid = 1223;

var atteRolu = {

    PhoneLogin: function PhoneLogin() {
        //验证码
        $(" .af-input").keyup(function () {

            if ($(this).val().length > 0) {
                $(this).addClass("actived");
                $(this).removeClass("erroed");
                $(this).css("color", "#333");
            } else {
                $(this).removeClass("actived");
                $(this).addClass("erroed");
                $(this).css("color", "#fe426f");
            }
        });

        $(".atte-form-box input").blur(function () {

            if ($(this).val().length > 0) {
                $(this).addClass("actived");
                $(this).removeClass("erroed");
                $(this).css("color", "#333");
            } else {
                $(this).removeClass("actived");
                $(this).addClass("erroed");
                $(this).css("color", "#fe426f");
            }
        });

        var phone_reg = /^1[34578]\d{9}$/;
        $("#login_phone").blur(function () {
            var phone_val = $(this).val();
            if (!phone_reg.test(phone_val)) {
                //格式错误

                $(this).removeClass("actived");
                $(this).addClass("erroed");
                // $(this).val("");
            } else {
                $(this).addClass("actived");
                $(this).removeClass("erroed");
            }
        });
        $("#login_phone").keyup(function () {
            var phone_val = $(this).val();
            if (phone_val.length >= 11) {
                if (!phone_reg.test(phone_val)) {
                    $(this).removeClass("actived");
                    $(this).addClass("erroed");
                } else {
                    $(this).addClass("actived");
                    $(this).removeClass("erroed");
                }
            }
        });

        //获取验证码
        $(".atte-form-con-col").on("click", "a#get_sms_code.actived", function (e) {
            e.preventDefault();
            var a_get_sms = $(this);
            if ($("#login_phone").hasClass("actived")) {
                //手机号正确
                var form_2 = new FormData();
                form_2.append("mobile", $("#login_phone").val());
                fetch(server + "/sms/send", {
                    method: 'POST',
                    //headers: myHeaders,
                    mode: 'cors',
                    cache: 'default',
                    body: form_2
                }).then(function (response) {
                    return response.json();
                }).then(function (data) {

                    if (data.code == 200) {
                        //成功后 
                        var time_num = 60;
                        a_get_sms.removeClass("actived");
                        a_get_sms.find('span').removeClass("text-color-fe").html(time_num + "s");
                        var timer = setInterval(function () {
                            a_get_sms.html(--time_num + "s");
                            if (time_num <= 0) {
                                clearInterval(timer);
                                timer = null;
                                a_get_sms.addClass("actived").html("<span class='text-color-fe'>获取验证码</span>");
                            }
                        }, 1000);
                    } else {

                        showInfo('当前网络不稳定,请重新获取');
                    }
                });
            } else {
                //手机号不正确
                showInfo("手机号格式错误");
            }
        });

        //登录

        $("#all_submit_btn").click(function (e) {
            e.preventDefault();
            // 判断是否都填写完成 

            if ($("input.af-input").length == $("input.af-input.actived").length) {
                //都填了 fetch   跳转
                var form_2 = new FormData();
                for (var j = 0; j < $(" input.af-input.actived").length; j++) {
                    var element = $($(" input.af-input.actived")[j]);
                    form_2.append(element.attr("name"), element.val()); // 
                }
                //手机号登录接口
                fetch(server + "/user/authentication", {
                    method: 'POST',
                    //headers: myHeaders,
                    mode: 'cors',
                    cache: 'default',
                    body: form_2
                }).then(function (response) {
                    return response.json();
                }).then(function (data) {
                    if (data.code == 200) {
                        // 成功  ?
                        //   alert("登录成功");
                        // 已绑定银行卡 跳转到money.html


                    } else if (data.code == 400) {

                        showInfo(data.message);
                    } else {
                        showInfo('当前网络不稳定,提交失败,请重新登录');
                    }
                });
            } else {
                //有没填 的 

                //其他没填写
                showInfo($($("input.af-input.erroed")[0]).siblings("p").html() + "格式错误");
            }
        });
    },
    BindBank: function BindBank() {
        //绑定银行卡  显示姓名
        //绑定键盘事件 格式化 限制 最低6位 最高20位
        $(" .af-input").keyup(function () {

            if ($(this).val().length > 0) {
                $(this).addClass("actived");
                $(this).removeClass("erroed");
                $(this).css("color", "#333");
            } else {
                $(this).removeClass("actived");
                $(this).addClass("erroed");
                $(this).css("color", "#fe426f");
            }
        });

        $(" .af-input").blur(function () {

            if ($(this).val().length > 0) {
                $(this).addClass("actived");
                $(this).removeClass("erroed");
                $(this).css("color", "#333");
            } else {
                $(this).removeClass("actived");
                $(this).addClass("erroed");
                $(this).css("color", "#fe426f");
            }
        });

        //点击绑定

        $("#all_submit_btn").click(function (e) {
            e.preventDefault();
            // 判断是否都填写完成 


            if ($("input.af-input").length == $("input.af-input.actived").length) {
                //都填了 fetch   跳转

                if ($(".js_bank_number").val().length > 6) {
                    //填写正确
                    var form_2 = new FormData();
                    for (var j = 0; j < $(" input.af-input.actived").length; j++) {
                        var element = $($(" input.af-input.actived")[j]);
                        form_2.append(element.attr("name"), element.val()); // 
                    }
                    form_2.append("login_uid", login_uid); // 
                    //绑定银行卡接口
                    fetch(server + "/user/authentication", {
                        method: 'POST',
                        //headers: myHeaders,
                        mode: 'cors',
                        cache: 'default',
                        body: form_2
                    }).then(function (response) {
                        return response.json();
                    }).then(function (data) {
                        if (data.code == 200) {
                            // 成功  ?
                            alert("绑定成功成功");
                            // 已绑定银行卡 跳转到money.html

                        } else if (data.code == 400) {

                            showInfo(data.message);
                        } else {
                            showInfo('当前网络不稳定,提交失败,请重新登录');
                        }
                    });
                } else {
                    $(".js_bank_number").removeClass("actived");
                    $(".js_bank_number").addClass("erroed");
                    $(".js_bank_number").css("color", "#fe426f");
                    showInfo("银行卡格式错误");
                }
            } else {
                //有没填 的 
                //其他没填写
                showInfo($($("input.af-input.erroed")[0]).siblings("p").html() + "没有填写");
            }
        });
    },
    withdrawalsMoney: function withdrawalsMoney() {
        //提现页面  login_uid 
        var exchange_rate = ".07"; //汇率
        var min_money_mp = 500; //最小提现
        var bank_status = 0;
        var can_with_pm = 0; //当前可以提现民票
        //1 dataload   显示是更改 还是 赋值汇率 新增 $(".js_bind_bank").html("新增");
        var form_2 = new FormData();
        form_2.append("login_uid", login_uid);
        fetch(server + "/sms/send", {
            method: 'POST',
            //headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: form_2
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            if (data.code == 200) {
                //获取数据成功
                //更新页面数据 判断显示新增 还是更改
                //显示剩余 民票数   赋值当前可提 汇率 最小提现 
                // $(".draw_income").html(data.data.draw_income); //当前可提民票
                // $(".all_income").html(data.data.all_income); //剩余民票
                // $(".user_bank").html(data.data.user_bank); //银行卡
                // exchange_rate = data.data.exchange_rate //汇率
                // min_money_mp = data.data.min_money_mp //最小提现额度
                // can_with_pm = data.data.can_with_pm //当前可提民票

                // $(".js_bind_bank" + data.data.bank_status).show(); //显示绑定还是更改银行卡 0是绑定 1更改
                // bank_status = data.data.bank_statu;

            } else {
                showInfo(data.message);
            }
        });

        $(".js_money_mp").keyup(function () {
            //计算
            var reg = /^[1-9]\d*$/;
            var money = $(this).val();
            if (money.length > 0) {
                if (reg.test(money)) {

                    if (money >= min_money_mp) {
                        //民票大于最低值
                        if (money < can_with_pm) {
                            //民票对了
                            $(".js_money_rmb_box").show();
                            var new_money_rmb = (money * exchange_rate).toFixed(2);+"元";
                            $(".js_money_rmb").val(new_money_rmb);
                            $(".js_money_rmb_info").hide();
                            $(this).addClass("mp_pass");
                        } else {
                            $(".js_money_rmb_info").show().find("p").html("超出当前可提民票");
                            $(".js_money_rmb_box").hide();
                            $(this).removeClass("mp_pass");
                        }
                    } else {
                        //钱超出
                        $(".js_money_rmb_info").show().find("p").html("小于最低提现民票");
                        $(".js_money_rmb_box").hide();
                        $(this).removeClass("mp_pass");
                    }
                } else {
                    //钱格式输入不正确
                    $(".js_money_rmb_info").show().find("p").html("民票输入有误");
                    $(".js_money_rmb_box").hide();
                    $(this).removeClass("mp_pass");
                }
            } else {
                //钱没有输入
                $(".js_money_rmb_box").show();
                $(".js_money_rmb").val("0.00元");
                $(".js_money_rmb_info").hide();
                $(this).removeClass("mp_pass");
            }
        });
        //2 输入民票  计算 70%

        //点击提交 验证值对不对

        $("#with_btn").click(function (e) {
            e.preventDefault();
            if ($(".js_money_mp").hasClass("mp_pass")) {
                //
                if (bank_status) {
                    var money = $(".js_money_mp").val();
                    if (reg.test(money)) {

                        if (money >= min_money_mp) {
                            //民票大于最低值
                            if (money < can_with_pm) {
                                //民票对了
                                var form_3 = new FormData();
                                form_3.append("login_uid", login_uid);
                                form_3.append("money", money);
                                fetch(server + "/sms/send", {
                                    method: 'POST',
                                    //headers: myHeaders,
                                    mode: 'cors',
                                    cache: 'default',
                                    body: form_3
                                }).then(function (response) {
                                    return response.json();
                                }).then(function (data) {
                                    if (data.code == 200) {
                                        //获取数据成功
                                        //更新页面数据 判断显示新增 还是更改
                                        //显示剩余 民票数   赋值当前可提 汇率 最小提现  
                                        showInfo("提交申请成功");
                                    } else {
                                        showInfo(data.message);
                                    }
                                });
                            } else {

                                showInfo("超出当前可提民票");
                                $(this).removeClass("mp_pass");
                            }
                        } else {
                            //钱超出

                            showInfo("超出小于提现最低民票");
                            $(this).removeClass("mp_pass");
                        }
                    } else {
                        //钱格式输入不正确

                        showInfo("民票输入有误");
                        $(this).removeClass("mp_pass");
                    }
                } else {
                    showInfo("请先绑定银行卡");
                }
            } else {
                $(this).removeClass("mp_pass");
                showInfo("请填写提现民票数");
            }
        });
    }

};

/***/ })
/******/ ]);