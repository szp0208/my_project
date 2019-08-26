package test.demo.dao;

import org.springframework.stereotype.Repository;
import test.demo.bean.User;

@Repository
public interface UserMapper {

    User select(String name);

    User selectid(Integer id);

}