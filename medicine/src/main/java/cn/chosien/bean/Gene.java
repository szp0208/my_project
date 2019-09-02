package cn.chosien.bean;

/**
 * Created by Administrator on 2018/12/7.
 */
public class Gene extends BaseVo {

    private String gene_id;
    private String official_symbol;
    private String synonyms;
    private String entrez_id;
    private String ensemble_id;
    private String summary;
    private String Entrez_ID_href;
    private String Ensemble_ID_href;
    private String External_links_Uniprot;
    private String External_links_Human_protein_atlas;
    private String External_links_HGNC;


    public String getGene_id() {
        return gene_id;
    }

    public void setGene_id(String gene_id) {
        this.gene_id = gene_id;
    }

    public String getOfficial_symbol() {
        return official_symbol;
    }

    public void setOfficial_symbol(String official_symbol) {
        this.official_symbol = official_symbol;
    }

    public String getSynonyms() {
        return synonyms;
    }

    public void setSynonyms(String synonyms) {
        this.synonyms = synonyms;
    }

    public String getEntrez_id() {
        return entrez_id;
    }

    public void setEntrez_id(String entrez_id) {
        this.entrez_id = entrez_id;
    }

    public String getEnsemble_id() {
        return ensemble_id;
    }

    public void setEnsemble_id(String ensemble_id) {
        this.ensemble_id = ensemble_id;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getEntrez_ID_href() {
        return Entrez_ID_href;
    }

    public void setEntrez_ID_href(String entrez_ID_href) {
        Entrez_ID_href = entrez_ID_href;
    }

    public String getEnsemble_ID_href() {
        return Ensemble_ID_href;
    }

    public void setEnsemble_ID_href(String ensemble_ID_href) {
        Ensemble_ID_href = ensemble_ID_href;
    }

    public String getExternal_links_Uniprot() {
        return External_links_Uniprot;
    }

    public void setExternal_links_Uniprot(String external_links_Uniprot) {
        External_links_Uniprot = external_links_Uniprot;
    }

    public String getExternal_links_Human_protein_atlas() {
        return External_links_Human_protein_atlas;
    }

    public void setExternal_links_Human_protein_atlas(String external_links_Human_protein_atlas) {
        External_links_Human_protein_atlas = external_links_Human_protein_atlas;
    }

    public String getExternal_links_HGNC() {
        return External_links_HGNC;
    }

    public void setExternal_links_HGNC(String external_links_HGNC) {
        External_links_HGNC = external_links_HGNC;
    }
}
