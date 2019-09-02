package test.demo.dao;

import org.springframework.stereotype.Repository;
import test.demo.bean.User;

@Repository
public interface UserMapper {

    User selectByName(String name);

    User selectByPhone(String phone);

    User selectid(Integer id);

}