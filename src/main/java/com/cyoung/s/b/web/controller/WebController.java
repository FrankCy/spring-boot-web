package com.cyoung.s.b.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

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
}
