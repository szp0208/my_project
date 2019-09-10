package test.demo.bean;

import java.util.List;

/**
 * Created by szp on 17/4/12.
 * 分页模板
 */
public class Page<T>  {

    /** 总条数 */
    private int totalNum = 0;
    /** 结果对象列表 */
    private List<T> items;

    public int getTotalNum() {
        return totalNum;
    }

    public void setTotalNum(int totalNum) {
        this.totalNum = totalNum;
    }

    public List<T> getItems() {
        return items;
    }

    public void setItems(List<T> items) {
        this.items = items;
    }
}
