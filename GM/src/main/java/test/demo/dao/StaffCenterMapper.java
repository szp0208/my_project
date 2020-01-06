package test.demo.dao;

import org.springframework.stereotype.Repository;
import test.demo.bean.StaffCenter;

import java.util.List;
import java.util.Map;

@Repository
public interface StaffCenterMapper {

    List<Map> staffList(StaffCenter record);

    int staffListCount(StaffCenter record);

    int deleteByPrimaryKey(Integer id);

    int insert(StaffCenter record);

    int insertSelective(StaffCenter record);

    StaffCenter selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(StaffCenter record);

    int updateByPrimaryKey(StaffCenter record);
}