package cn.chosien.bean;

/**搜索返回对象
 * Created by Administrator on 2018/12/7.
 */
public class SearchReq {

    private String id;

    private String name;
    //0 基因 1 肿瘤
    private String type;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
