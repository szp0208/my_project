package test.demo.service;

import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import test.demo.dao.StaffCenterMapper;

import java.util.List;

@Service
public class StaffCenterService {
    @Autowired
    private SqlSessionFactory sqlSessionFactory;
    @Autowired
    private StaffCenterMapper staffCenterMapper;

    //获取所有列表数据
    public List<test.demo.bean.StaffCenter> getStaffCenterList() {
        return staffCenterMapper.staffList();
    }

    public Object selectByPrimaryKey(Integer id) {
        return staffCenterMapper.selectByPrimaryKey(id);
    }
}
