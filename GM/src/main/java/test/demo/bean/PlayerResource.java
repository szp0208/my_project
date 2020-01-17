package test.demo.bean;

import java.util.Date;

public class PlayerResource extends BaseVo {
    private Integer playerId;

    private Integer copper;

    private Integer wood;

    private Integer food;

    private Integer iron;

    private Integer exp;

    private Date updateTime;

    private Long kfgzVersion;

    public Integer getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Integer playerId) {
        this.playerId = playerId;
    }

    public Integer getCopper() {
        return copper;
    }

    public void setCopper(Integer copper) {
        this.copper = copper;
    }

    public Integer getWood() {
        return wood;
    }

    public void setWood(Integer wood) {
        this.wood = wood;
    }

    public Integer getFood() {
        return food;
    }

    public void setFood(Integer food) {
        this.food = food;
    }

    public Integer getIron() {
        return iron;
    }

    public void setIron(Integer iron) {
        this.iron = iron;
    }

    public Integer getExp() {
        return exp;
    }

    public void setExp(Integer exp) {
        this.exp = exp;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public Long getKfgzVersion() {
        return kfgzVersion;
    }

    public void setKfgzVersion(Long kfgzVersion) {
        this.kfgzVersion = kfgzVersion;
    }
}