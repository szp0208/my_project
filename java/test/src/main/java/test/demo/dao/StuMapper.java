package test.demo.dao;

import org.springframework.stereotype.Repository;
import test.demo.bean.Stu;

import java.util.List;

@Repository
public interface StuMapper {

    List<Stu>userList();

    Stu info(String id);

    void insertData(Stu stu);

    void updateData(Stu stu);

    void deleteData(String id);
}