//package test.demo.service;
//
//
//import test.demo.entity.Student;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.jdbc.core.JdbcTemplate;
//import org.springframework.jdbc.core.RowMapper;
//import org.springframework.stereotype.Service;
//
//import java.sql.ResultSet;
//import java.sql.SQLException;
//import java.util.List;
//
//@Service
//public class StudentService {
//    @Autowired
//    private JdbcTemplate jdbcTemplate;
//
//    public List<Student> getNewList() {
//        String sql = "SELECT * FROM stu";
//        List<Student> studentList = jdbcTemplate.query(sql, new RowMapper<Student>() {
//            Student stu = null;
//
//            @Override
//            public Student mapRow(ResultSet rs, int rowNum) throws SQLException {
//                stu = new Student();
//                stu.setId(rs.getString("id"));
//                stu.setAge(rs.getString("age"));
//                stu.setName(rs.getString("name"));
//                stu.setSex(rs.getString("sex"));
//
//                return stu;
//            }
//        });
//
//        return studentList;
//    }
//
//    public List<Student> getList(){
//        String sql = "SELECT * FROM stu";
//        List<Student> studentList = null;
//        studentList = jdbcTemplate.query(sql, new RowMapper<Student>() {
//            @Override
//            public Student mapRow(ResultSet rs, int i) throws SQLException {
//                Student stu = new Student();
//                stu.setId(rs.getString("id"));
//                stu.setAge(rs.getString("age"));
//                stu.setName(rs.getString("name"));
//                stu.setSex(rs.getString("sex"));
//
//                return stu;
//            }
//        });
//        return (studentList != null && studentList.size() > 0) ? studentList : null;
//    }
//}
