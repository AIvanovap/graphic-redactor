package com.it.graphic.about;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by NotePad on 22.01.2016.
 */
@Controller
public class AboutController {

    @RequestMapping(value = "about")
    public String about(){
        return "about/about";
    }
}
