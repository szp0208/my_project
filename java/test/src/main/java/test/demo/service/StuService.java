package test.demo.service;


import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import test.demo.bean.Stu;
import test.demo.dao.StuMapper;

import java.util.List;

@Service
public class StuService {

    @Autowired
    private SqlSessionFactory sqlSessionFactory;

    @Autowired
    private StuMapper stuMapper;

//    获取所有列表数据
    public List<Stu>getList(){
        return stuMapper.userList();
    }

//    通过id获取数据信息
    public Stu getListByid(String id) {
        return stuMapper.info(id);
    }
    public Stu addUser(Stu stus) {
        Stu stu = new Stu();
        stu.setName(stus.getName());
        stu.setAge(stus.getAge());
        stu.setSex(stus.getSex());
        SqlSession session = sqlSessionFactory.openSession();
        try {
            stuMapper.insertData(stu);
            session.commit();
            System.out.println("新增用户ID：" + stu.getId());
        } finally {
            session.close();
        }
        return stu;
    }

//    删除某条数据
    public void delectByid(String id) {
        stuMapper.deleteData(id);
    }

//    更新某条数据
    public Stu updateByid(Stu stus) {
        SqlSession session = sqlSessionFactory.openSession();
        try {
            Stu stu = new Stu();
            stu = getListByid(stus.getId());
            if (stu != null) {
                stu.setName(stus.getName());
                stu.setAge(stus.getAge());
                stu.setSex(stus.getSex());
                stuMapper.updateData(stu);
                session.commit();
            }
            return stu;
        } finally {
            session.close();
        }
    }
}
