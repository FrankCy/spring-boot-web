package com.cyoung.s.b.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * @version 1.0
 * @description：
 * @author: Yang.Chang
 * @project: spring-boot-web
 * @package: com.cyoung.s.b.web.controller
 * @email: cy880708@163.com
 * @date: 2018/11/13 下午12:40
 * @mofified By:
 */
@Controller
@RequestMapping(value = "/web")
public class WebController {

    @RequestMapping(value = "/index")
    public String index(Model model) {
        return "index";
    }

    /**
     * @description：首页跳转
     * @version 1.0
     * @author: Yang.Chang
     * @email: cy880708@163.com
     * @date: 2019/1/2 下午4:59
     * @mofified By:
     */
    @RequestMapping(value = "/index")
    public ModelAndView index() {
        //初始化响应模版
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("index");


        return modelAndView;
    }
}
