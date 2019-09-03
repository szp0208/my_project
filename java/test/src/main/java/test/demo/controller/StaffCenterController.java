package test.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import test.demo.bean.StaffCenter;
import test.demo.service.StaffCenterService;
import test.demo.util.MsgHandler;
import test.demo.util.StringUtils;

@RestController
@RequestMapping("/api/staffCenter")
public class StaffCenterController {
    @Autowired(required=true)
    private StaffCenterService staffCenterService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public MsgHandler staffList() throws Exception {
        MsgHandler handler = new MsgHandler();

        handler.setResult(staffCenterService.getStaffCenterList());
        handler.setCode("200");
        return handler;
    }

    @RequestMapping(value = "/getStaffInfoById", method = RequestMethod.GET)
    public MsgHandler userList(StaffCenter staffCenter) throws Exception {
        MsgHandler handler = new MsgHandler();
        //判断是否为空-未传
        if (StringUtils.isNull(staffCenter.getId())){
            handler.setMessage("id is not found");
            handler.setCode("400");
            return handler;
        }
        handler.setResult(staffCenterService.selectByPrimaryKey(staffCenter.getId()));
        handler.setCode("200");
        return handler;
    }
}
