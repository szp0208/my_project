package cn.chosien.bean;

/**
 * Created by Administrator on 2018/12/13.
 */
public class Tumor extends BaseVo{

    private String tumor_id;
    private String mesh_term;
    private String mesh_term_href;
    private String summary;
    private String full_name;

    private String tumor;

    private String tableName;

    private String condition;

    private String gene_id;

    private String GSE_platform;

    public String getGSE_platform() {
        return GSE_platform;
    }

    public void setGSE_platform(String GSE_platform) {
        this.GSE_platform = GSE_platform;
    }

    public String getFull_name() {
        return full_name;
    }

    public void setFull_name(String full_name) {
        this.full_name = full_name;
    }

    public String getGene_id() {
        return gene_id;
    }

    public void setGene_id(String gene_id) {
        this.gene_id = gene_id;
    }

    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public String getTumor() {
        return tumor;
    }

    public void setTumor(String tumor) {
        this.tumor = tumor;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public String getTumor_id() {
        return tumor_id;
    }

    public void setTumor_id(String tumor_id) {
        this.tumor_id = tumor_id;
    }

    public String getMesh_term() {
        return mesh_term;
    }

    public void setMesh_term(String mesh_term) {
        this.mesh_term = mesh_term;
    }

    public String getMesh_term_href() {
        return mesh_term_href;
    }

    public void setMesh_term_href(String mesh_term_href) {
        this.mesh_term_href = mesh_term_href;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }
}
