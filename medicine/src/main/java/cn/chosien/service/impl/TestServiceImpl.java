package cn.chosien.service.impl;


import cn.chosien.dao.TestMapper;
import cn.chosien.service.*;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;


/**
 * 活动相关
 * Created by wangxd on 2018/1/3 0003.
 */
@Service
public class TestServiceImpl implements TestService {

    @Resource
    private TestMapper testMapper;

    public List<Map> getId(){
        return testMapper.getId();
    }
}
