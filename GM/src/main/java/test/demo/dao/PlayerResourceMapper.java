package test.demo.dao;

import org.springframework.stereotype.Repository;
import test.demo.bean.PlayerResource;
import java.util.List;
import java.util.Map;

@Repository
public interface PlayerResourceMapper {
    int deleteByPrimaryKey(Integer playerId);

    int insert(PlayerResource record);

    int insertSelective(PlayerResource record);

    PlayerResource selectByPrimaryKey(Integer playerId);

    int updateByPrimaryKeySelective(PlayerResource record);

    int updateByPrimaryKey(PlayerResource record);

    List<Map> getList(PlayerResource record);

    int listCount(PlayerResource record);
}