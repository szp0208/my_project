//package test.demo.controller;
//
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//import test.demo.entity.Student;
//import test.demo.service.StudentService;
//
//import java.util.List;
//import java.util.logging.Logger;
//
//@RestController
//@RequestMapping("/stu")
//public class StudentController {
//
////    private static final Logger logger = (Logger) LoggerFactory.getLogger(StudentController.class);
//
//    @Autowired
//    private StudentService studentService;
//
//    @RequestMapping("/list")
//    public List<Student> getStus(){
////        logger.info("从数据库读取Student集合");
//        return studentService.getList();
//    }
//
//    @RequestMapping("/hello")
//
//    public String hello() {
//        return "hello";
//    }
//}
