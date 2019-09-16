package test.demo.service;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import test.demo.bean.LogInfo;
import test.demo.dao.LogInfoMapper;

@Service
public class LogInfoService {
    @Autowired
    private SqlSessionFactory sqlSessionFactory;
    @Autowired
    private LogInfoMapper logInfoMapper;


    //新增日志数据
    public Object save(LogInfo record) {
        LogInfo logInfo = new LogInfo();
        logInfo = record;
        SqlSession session = sqlSessionFactory.openSession();
        try {
            logInfoMapper.insertSelective(logInfo);
            session.commit();
        } finally {
            session.close();
        }
        return logInfo;
    }
}
