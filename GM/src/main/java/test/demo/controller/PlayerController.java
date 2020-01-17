package test.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import test.demo.bean.Player;
import test.demo.bean.Page;
import test.demo.service.PlayerService;
import test.demo.util.MsgHandler;
import test.demo.util.StringUtils;

import javax.servlet.ServletResponse;
import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping("/api/player")
public class PlayerController {
    @Autowired(required=true)
    private PlayerService playerService;

    //获取玩家列表数据
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public MsgHandler getList(Player vo) throws Exception {
        MsgHandler handler = new MsgHandler();

        if (StringUtils.isNotNull(vo.getPage())&&StringUtils.isNotNull(vo.getSize())){
            Page<Map> page = new Page<Map>();
            int i = playerService.playerListCount(vo);
            if (i==0){
                page.setItems(new ArrayList<>());
            }else {
                page.setItems(playerService.getPlayerList(vo));
                page.setTotal(i);
            }
            handler.setResult(page);
        }else {
            vo.setType("1");
            handler.setResult(playerService.getPlayerList(vo));
        }
        handler.setCode("200");
        return handler;
    }

    //获取玩家详细信息
    @RequestMapping(value = "/getInfoById", method = RequestMethod.GET)
    public MsgHandler getInfo(Player player) throws Exception {
        MsgHandler handler = new MsgHandler();
        //判断是否为空-未传
        if (StringUtils.isNull(player.getPlayerId())){
            handler.setMessage("id is not found");
            handler.setCode("400");
            return handler;
        }
        handler.setResult(playerService.selectByPrimaryKey(player.getPlayerId()));
        handler.setCode("200");
        return handler;
    }

    //变更玩家数据
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public MsgHandler updateData(@RequestBody Player player, ServletResponse response) throws Exception {
        MsgHandler handler = new MsgHandler();
        //判断必填值是否为空-未传
        if (StringUtils.isNull(player.getPlayerId())){
            handler.setMessage("玩家id未传");
            handler.setCode("400");
            return handler;
        }
        Player res = (Player) playerService.updatePlayerInfo(player);
        handler.setResult(res);
        handler.setMessage("变更用户ID：" + res.getPlayerId());
        handler.setCode("200");
        return handler;
    }
}
