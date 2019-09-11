package test.demo.service;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import test.demo.bean.StaffCenter;
import test.demo.dao.StaffCenterMapper;

import java.util.List;
import java.util.Map;

import static test.demo.util.StringUtils.setCodeById;

@Service
public class StaffCenterService {
    @Autowired
    private SqlSessionFactory sqlSessionFactory;
    @Autowired
    private StaffCenterMapper staffCenterMapper;

    //获取所有列表数据
    public List<Map> getStaffCenterList(StaffCenter record) {
        return staffCenterMapper.staffList(record);
    }

    //根据id获取详情
    public Object selectByPrimaryKey(Integer id) {
        return staffCenterMapper.selectByPrimaryKey(id);
    }

    //新增员工信息
    public Object addStaff(StaffCenter record) {
        StaffCenter staffCenter = new StaffCenter();
        staffCenter = record;
        SqlSession session = sqlSessionFactory.openSession();
        try {
            staffCenterMapper.insert(staffCenter);
            staffCenter.setCode(setCodeById(staffCenter.getId())); //设置唯一的code
            staffCenterMapper.updateByPrimaryKey(staffCenter);  //自增code
            System.out.println("新增用户ID：" + staffCenter.getId());
            session.commit();
        } finally {
            session.close();
        }
        return updateStaff(staffCenter);
    }

    //根据id变更员工数据
    public Object updateStaff(StaffCenter record) {
        StaffCenter staffCenter = new StaffCenter();
        staffCenter = record;
        SqlSession session = sqlSessionFactory.openSession();
        try {
            staffCenterMapper.updateByPrimaryKey(staffCenter);
            session.commit();
        } finally {
            session.close();
        }
        return staffCenter;
    }

    //根据id删除员工
    public void deleteStaff(Integer id) {
        staffCenterMapper.deleteByPrimaryKey(id);
    }

    //获取列表数据总数
    public int staffListCount(StaffCenter record){
        return staffCenterMapper.staffListCount(record);
    }

}
