package test.demo.dao;

import test.demo.bean.Staff_center;

import java.util.List;

public interface Staff_centerMapper {
    List<Staff_center> userList();

    int deleteByPrimaryKey(Integer id);

    int insert(Staff_center record);

    int insertSelective(Staff_center record);

    Staff_center selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Staff_center record);

    int updateByPrimaryKey(Staff_center record);
}