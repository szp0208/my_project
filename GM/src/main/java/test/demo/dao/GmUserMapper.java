package test.demo.dao;

import org.springframework.stereotype.Repository;
import test.demo.bean.GmUser;

@Repository
public interface GmUserMapper {
    GmUser selectByName(String name);

    GmUser selectByPhone(String phone);

    GmUser selectid(Integer id);
}