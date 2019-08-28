package test.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import test.demo.bean.Stu;
import test.demo.service.StuService;
import test.demo.util.MsgHandler;
import test.demo.util.StringUtils;

@RestController
@RequestMapping("/stud")
public class StuController {

    @Autowired(required=true)
    private StuService stuService;

    @RequestMapping(value = "/get", method = RequestMethod.GET)
    public MsgHandler userList() throws Exception {
        MsgHandler handler = new MsgHandler();
        handler.setResult(stuService.getList());
        handler.setCode("200");
        return handler;
    }

    @RequestMapping(value = "/getId", method = RequestMethod.GET)
    public MsgHandler userList(Stu stu) throws Exception {
        MsgHandler handler = new MsgHandler();
        //判断是否为空-未传
        if (StringUtils.isNull(stu.getId())){
            handler.setMessage("id is not found");
            handler.setCode("400");
            return handler;
        }
        handler.setResult(stuService.getListByid(stu.getId()));
        handler.setCode("200");
        return handler;
    }

    @RequestMapping(value = "/insert", method = RequestMethod.POST)
    public MsgHandler insertData(Stu stu) throws Exception {
        MsgHandler handler = new MsgHandler();
        //判断是否为空-未传
        if (StringUtils.isNull(stu.getName()) || StringUtils.isNull(stu.getAge()) || StringUtils.isNull(stu.getSex())){
            handler.setMessage("参数填写错误");
            handler.setCode("400");
            return handler;
        }
        Stu res = stuService.addUser(stu);
        handler.setResult(res);
        handler.setMessage("添加成功ID：" + res.getId());
        handler.setCode("200");
        return handler;
    }

    @RequestMapping(value = "/delect", method = RequestMethod.POST)
    public MsgHandler delectData(Stu stu) throws Exception {
        MsgHandler handler = new MsgHandler();
        //判断是否为空-未传
        if (StringUtils.isNull(stu.getId())){
            handler.setMessage("id is not found");
            handler.setCode("400");
            return handler;
        }
        stuService.delectByid(stu.getId());
        handler.setResult("删除成功");
        handler.setCode("200");
        return handler;
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public MsgHandler updateData(Stu stu) throws Exception {
        MsgHandler handler = new MsgHandler();
        //判断是否为空-未传
        if (StringUtils.isNull(stu.getId()) || StringUtils.isNull(stu.getName()) || StringUtils.isNull(stu.getAge()) || StringUtils.isNull(stu.getSex())){
            handler.setMessage("参数填写错误");
            handler.setCode("400");
            return handler;
        }
        Stu res = stuService.updateByid(stu);
        handler.setResult(res);
        handler.setMessage("更新成功ID:" + res.getId());
        handler.setCode("200");
        return handler;
    }

}
