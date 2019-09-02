package test.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import test.demo.service.StaffCenterService;
import test.demo.util.MsgHandler;

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
}
