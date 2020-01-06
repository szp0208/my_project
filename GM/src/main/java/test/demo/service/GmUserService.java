package test.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import test.demo.bean.GmUser;
import test.demo.dao.GmUserMapper;


@Service
public class GmUserService {

    @Autowired
    private GmUserMapper gmUserMapper;

    public GmUser findUserByName(String name) {
        return gmUserMapper.selectByName(name);
    }
    public GmUser findUserByPhone(String phone) {
        return gmUserMapper.selectByPhone(phone);
    }
    public GmUser findUserById(Integer id) {
        return gmUserMapper.selectid(id);
    }
}
