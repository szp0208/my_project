package test.demo.dao;

import org.springframework.stereotype.Repository;
import test.demo.bean.Player;

import java.util.List;
import java.util.Map;

@Repository
public interface PlayerMapper {
    int deleteByPrimaryKey(Integer playerId);

    int insert(Player record);

    int insertSelective(Player record);

    Player selectByPrimaryKey(Integer playerId);

    int updateByPrimaryKeySelective(Player record);

    int updateByPrimaryKey(Player record);

    List<Map> getPlayerList(Player record);

    int playerListCount(Player record);
}