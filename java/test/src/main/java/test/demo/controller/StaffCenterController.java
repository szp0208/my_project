package test.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import test.demo.bean.StaffCenter;
import test.demo.bean.Page;
import test.demo.service.StaffCenterService;
import test.demo.util.MsgHandler;
import test.demo.util.StringUtils;

import javax.servlet.ServletResponse;
import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping("/api/staffCenter")
public class StaffCenterController {
    @Autowired(required=true)
    private StaffCenterService staffCenterService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public MsgHandler staffList(StaffCenter vo) throws Exception {
        MsgHandler handler = new MsgHandler();

        if (StringUtils.isNotNull(vo.getPage())&&StringUtils.isNotNull(vo.getSize())){
            Page<Map> page = new Page<Map>();
            int i = staffCenterService.staffListCount(vo);
            if (i==0){
                page.setItems(new ArrayList<>());
            }else {
                page.setItems(staffCenterService.getStaffCenterList());
                page.setTotalNum(i);
            }
            handler.setResult(page);
        }else {
            vo.setType("1");
            handler.setResult(staffCenterService.getStaffCenterList());
        }

        handler.setResult(staffCenterService.getStaffCenterList());
        handler.setCode("200");
        return handler;
    }

    @RequestMapping(value = "/getStaffInfoById", method = RequestMethod.GET)
    public MsgHandler getInfo(StaffCenter staffCenter) throws Exception {
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

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public MsgHandler insertData(@RequestBody StaffCenter staffCenter, ServletResponse response) throws Exception {
        MsgHandler handler = new MsgHandler();
        //判断必填值是否为空-未传
        if (StringUtils.isNull(staffCenter.getName()) || StringUtils.isNull(staffCenter.getPhone())){
            handler.setMessage("参数错误");
            handler.setCode("400");
            return handler;
        }
        StaffCenter res = (StaffCenter) staffCenterService.addStaff(staffCenter);
        handler.setResult(res);
        handler.setMessage("添加成功ID：" + res.getId());
        handler.setCode("200");
        return handler;
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public MsgHandler updateData(@RequestBody StaffCenter staffCenter, ServletResponse response) throws Exception {
        MsgHandler handler = new MsgHandler();
        //判断必填值是否为空-未传
        if (StringUtils.isNull(staffCenter.getName()) || StringUtils.isNull(staffCenter.getPhone()) || StringUtils.isNull(staffCenter.getId())){
            handler.setMessage("参数错误");
            handler.setCode("400");
            return handler;
        }
        StaffCenter res = (StaffCenter) staffCenterService.updateStaff(staffCenter);
        handler.setResult(res);
        handler.setMessage("变更用户ID：" + res.getId());
        handler.setCode("200");
        return handler;
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public MsgHandler deleteData(@RequestBody StaffCenter staffCenter, ServletResponse response) throws Exception {
        MsgHandler handler = new MsgHandler();
        //判断必填值是否为空-未传
        if (StringUtils.isNull(staffCenter.getId())){
            handler.setMessage("id is not found");
            handler.setCode("400");
            return handler;
        }
        staffCenterService.deleteStaff(staffCenter.getId());
        handler.setResult("success");
        handler.setMessage("删除用户ID：" + staffCenter.getId());
        handler.setCode("200");
        return handler;
    }
}
