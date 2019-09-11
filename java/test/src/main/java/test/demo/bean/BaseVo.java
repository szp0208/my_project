package test.demo.bean;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.util.List;

/**
 * Created by Administrator on 2018/10/23.
 */
//@JsonIgnoreProperties(ignoreUnknown = true)   //过滤某些字段不返回
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)  //不返回为null的字段
public class BaseVo {

    // 分页起始位置
    private Integer page;
    // 分页条数
    private Integer size;
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

    private List<String> idlist;

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

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
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
