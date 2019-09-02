package cn.chosien.bean;

import java.util.Date;
import java.util.List;

/**
 * Created by Administrator on 2018/10/23.
 */
public class BaseVo {

    // 分页起始位置
    private String start;
    // 分页条数
    private String count;
    // 搜索类型
    private String searchType;
    // 搜索值
    private String searchName;
    // 排序字段
    private String orderName;
    // 排序 asc：升序 desc：降序
    private String orderType;
    // 是否分页，0：不分页,不传值表示要分页
    private String pageType;
    //搜索类型
    private String type;

    private String correlation_coefficent;

    private String p_value;

    private String tumor_id;

    private String symbol;

    private List<String> idlist;

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getTumor_id() {
        return tumor_id;
    }

    public void setTumor_id(String tumor_id) {
        this.tumor_id = tumor_id;
    }

    public String getCorrelation_coefficent() {
        return correlation_coefficent;
    }

    public void setCorrelation_coefficent(String correlation_coefficent) {
        this.correlation_coefficent = correlation_coefficent;
    }

    public String getP_value() {
        return p_value;
    }

    public void setP_value(String p_value) {
        this.p_value = p_value;
    }

    public List<String> getIdlist() {
        return idlist;
    }

    public void setIdlist(List<String> idlist) {
        this.idlist = idlist;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPageType() {
        return pageType;
    }

    public void setPageType(String pageType) {
        this.pageType = pageType;
    }

    public String getStart() {
        return start;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public String getCount() {
        return count;
    }

    public void setCount(String count) {
        this.count = count;
    }

    public String getSearchType() {
        return searchType;
    }

    public void setSearchType(String searchType) {
        this.searchType = searchType;
    }

    public String getSearchName() {
        return searchName;
    }
    public void setSearchName(String searchName) {
        //自动trim掉首位不可见字符
        if (searchName != null) {
            this.searchName = searchName.trim();
        } else {
            this.searchName = searchName;
        }
    }

    public String getOrderName() {
        return orderName;
    }

    public void setOrderName(String orderName) {
        this.orderName = orderName;
    }

    public String getOrderType() {
        return orderType;
    }

    public void setOrderType(String orderType) {
        this.orderType = orderType;
    }
}
