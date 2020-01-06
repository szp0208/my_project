package test.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import test.demo.bean.GmUser;
import test.demo.service.GmUserService;
import test.demo.util.MsgHandler;
import test.demo.util.StringUtils;
import test.demo.util.TokenUtil;

import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api")
public class GmUserController {
    @Autowired(required=true)
    private GmUserService gmUserService;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public MsgHandler getData(@RequestBody GmUser gmUser, ServletResponse response) throws Exception {
        MsgHandler handler = new MsgHandler();
        //判断是否为空-未传
        if (StringUtils.isNull(gmUser.getPhone()) || StringUtils.isNull(gmUser.getPassword())){
            handler.setMessage("手机号或者密码未填写");
            handler.setCode("400");
            return handler;
        }

        GmUser info = new GmUser();
        info = gmUserService.findUserByPhone(gmUser.getPhone());
        if(StringUtils.isNull(info)) {
            handler.setMessage("该用户不存在");
        } else {
            if(info.getPassword().equals(gmUser.getPassword())) { //用equals方法比较两个String的值是否相等，==比较的是地址是否相同
                HttpServletResponse rep = (HttpServletResponse) response;   //请求接口的地址参数对象
                rep.setHeader("login-token", TokenUtil.createJWT(6000000, info));    //返回头中设置login_token
                info.setPassword("******"); //处理返回的密码
                handler.setResult(info);
                handler.setMessage("success");
            } else {
                handler.setMessage("密码错误");
            }
        }
        handler.setCode("200000");
        return handler;
    }
}
