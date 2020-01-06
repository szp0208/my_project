package test.demo.service;

import net.sf.json.JSONObject;

import net.sf.json.JSONObject;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import test.demo.bean.Player;
import test.demo.dao.PlayerMapper;

import java.util.List;
import java.util.Map;

@Service
public class PlayerService {
    Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private SqlSessionFactory sqlSessionFactory;
    @Autowired
    private PlayerMapper playerMapper;

    //获取所有列表数据
    public List<Map> getPlayerList(Player record) {
        logger.info(String.valueOf(JSONObject.fromObject(record)));
        return playerMapper.getPlayerList(record);
    }

    //获取列表数据总数
    public int playerListCount(Player record){
        return playerMapper.playerListCount(record);
    }

    //根据id变更玩家数据
    public Object updatePlayerInfo(Player record) {
        Player player = new Player();
        player = record;
        SqlSession session = sqlSessionFactory.openSession();
        try {
            playerMapper.updateByPrimaryKeySelective(player);
            session.commit();
        } finally {
            session.close();
        }
        return player;
    }
}
