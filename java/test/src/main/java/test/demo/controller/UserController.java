package test.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import test.demo.bean.User;
import test.demo.service.UserService;
import test.demo.util.MsgHandler;
import test.demo.util.StringUtils;
import test.demo.util.TokenUtil;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired(required=true)
    private UserService userService;

    @RequestMapping(value = "/userLogin", method = RequestMethod.POST)
    public MsgHandler userList(User user) throws Exception {
        MsgHandler handler = new MsgHandler();
        //判断是否为空-未传
        if (StringUtils.isNull(user.getName()) || StringUtils.isNull(user.getPassword())){
            handler.setMessage("用户名密码未传");
            handler.setStatus("400");
            return handler;
        }

        User info = new User();
        info = userService.getListByName(user.getName());
        if(StringUtils.isNull(info)) {
            handler.setMessage("该用户不存在");
        } else {
            if(info.getPassword().equals(user.getPassword())) { //用equals方法比较两个String的值是否相等，==比较的是地址是否相同
                handler.setContext(TokenUtil.createJWT(100000, info)); //返回token
                handler.setMessage("登录成功");
            } else {
                handler.setMessage("密码错误");
            }
        }
        handler.setStatus("200");
        return handler;
    }
}
