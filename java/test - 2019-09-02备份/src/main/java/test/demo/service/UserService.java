package test.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import test.demo.bean.User;
import test.demo.dao.UserMapper;


@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;

    public User getListByName(String name) {
        return userMapper.selectByName(name);
    }
    public User getListByPhone(String phone) {
        return userMapper.selectByPhone(phone);
    }
    public User findUserById(Integer id) {
        return userMapper.selectid(id);
    }
}
