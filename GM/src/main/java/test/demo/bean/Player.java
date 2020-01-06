package test.demo.bean;

import java.util.Date;

public class Player extends BaseVo {
    private Integer playerId;

    private String playerName;

    private Short playerLv;

    private Integer maxLv;

    private Integer sysGold;

    private Integer userGold;

    private String userId;

    private Byte consumeLv;

    private String yx;

    private String yxSource;

    private Integer forceId;

    private Integer pic;

    private Integer powerId;

    private Date loginTime;

    private Date quitTime;

    private Integer dailyOnlineTime;

    private Byte state;

    private Date deleteTime;

    private Date createTime;

    private Integer playerServerId;

    private Integer totalUserGold;

    private Integer totalTicketGold;

    private Integer gm;

    private Byte defaultPay;

    private String servernameServeridPlayerid;

    private Date gmExpiresTime;

    public Integer getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Integer playerId) {
        this.playerId = playerId;
    }

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName == null ? null : playerName.trim();
    }

    public Short getPlayerLv() {
        return playerLv;
    }

    public void setPlayerLv(Short playerLv) {
        this.playerLv = playerLv;
    }

    public Integer getMaxLv() {
        return maxLv;
    }

    public void setMaxLv(Integer maxLv) {
        this.maxLv = maxLv;
    }

    public Integer getSysGold() {
        return sysGold;
    }

    public void setSysGold(Integer sysGold) {
        this.sysGold = sysGold;
    }

    public Integer getUserGold() {
        return userGold;
    }

    public void setUserGold(Integer userGold) {
        this.userGold = userGold;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId == null ? null : userId.trim();
    }

    public Byte getConsumeLv() {
        return consumeLv;
    }

    public void setConsumeLv(Byte consumeLv) {
        this.consumeLv = consumeLv;
    }

    public String getYx() {
        return yx;
    }

    public void setYx(String yx) {
        this.yx = yx == null ? null : yx.trim();
    }

    public String getYxSource() {
        return yxSource;
    }

    public void setYxSource(String yxSource) {
        this.yxSource = yxSource == null ? null : yxSource.trim();
    }

    public Integer getForceId() {
        return forceId;
    }

    public void setForceId(Integer forceId) {
        this.forceId = forceId;
    }

    public Integer getPic() {
        return pic;
    }

    public void setPic(Integer pic) {
        this.pic = pic;
    }

    public Integer getPowerId() {
        return powerId;
    }

    public void setPowerId(Integer powerId) {
        this.powerId = powerId;
    }

    public Date getLoginTime() {
        return loginTime;
    }

    public void setLoginTime(Date loginTime) {
        this.loginTime = loginTime;
    }

    public Date getQuitTime() {
        return quitTime;
    }

    public void setQuitTime(Date quitTime) {
        this.quitTime = quitTime;
    }

    public Integer getDailyOnlineTime() {
        return dailyOnlineTime;
    }

    public void setDailyOnlineTime(Integer dailyOnlineTime) {
        this.dailyOnlineTime = dailyOnlineTime;
    }

    public Byte getState() {
        return state;
    }

    public void setState(Byte state) {
        this.state = state;
    }

    public Date getDeleteTime() {
        return deleteTime;
    }

    public void setDeleteTime(Date deleteTime) {
        this.deleteTime = deleteTime;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Integer getPlayerServerId() {
        return playerServerId;
    }

    public void setPlayerServerId(Integer playerServerId) {
        this.playerServerId = playerServerId;
    }

    public Integer getTotalUserGold() {
        return totalUserGold;
    }

    public void setTotalUserGold(Integer totalUserGold) {
        this.totalUserGold = totalUserGold;
    }

    public Integer getTotalTicketGold() {
        return totalTicketGold;
    }

    public void setTotalTicketGold(Integer totalTicketGold) {
        this.totalTicketGold = totalTicketGold;
    }

    public Integer getGm() {
        return gm;
    }

    public void setGm(Integer gm) {
        this.gm = gm;
    }

    public Byte getDefaultPay() {
        return defaultPay;
    }

    public void setDefaultPay(Byte defaultPay) {
        this.defaultPay = defaultPay;
    }

    public String getServernameServeridPlayerid() {
        return servernameServeridPlayerid;
    }

    public void setServernameServeridPlayerid(String servernameServeridPlayerid) {
        this.servernameServeridPlayerid = servernameServeridPlayerid == null ? null : servernameServeridPlayerid.trim();
    }

    public Date getGmExpiresTime() {
        return gmExpiresTime;
    }

    public void setGmExpiresTime(Date gmExpiresTime) {
        this.gmExpiresTime = gmExpiresTime;
    }
}