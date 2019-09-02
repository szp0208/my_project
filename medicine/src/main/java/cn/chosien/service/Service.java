package cn.chosien.service;


import cn.chosien.bean.BaseVo;
import cn.chosien.bean.Gene;
import cn.chosien.bean.SearchReq;
import cn.chosien.bean.Tumor;

import java.util.List;
import java.util.Map;

/**
 * Created by wangxd on 2018/1/3 0003.
 */
public interface Service {

    //搜索列表
    public List<SearchReq> searchList(BaseVo vo);

    List<Map> scatter(Gene gene);


    Gene gene(Gene gene);

    List<Map> geneCell(Gene gene);

    List<Map> geneTissue(Gene gene);

    List<Map> geneMirna(Gene gene);

    int geneMirnaCount(Gene gene);

    List<Map> geneTranscriptFactor(Gene gene);

    int geneTranscriptFactorCount(Gene gene);

    List<Map> geneLncRna(Gene gene);

    int geneLncRnaCount(Gene gene);

    List<Map> genePhosphorylation(Gene gene);

    List<Map> geneRegulationLncrna(Gene gene);

    List<Map> geneRegulationMicrorna(Gene gene);

    int genePhosphorylationCount(Gene gene);

    int geneRegulationLncrnaCount(Gene gene);

    int geneRegulationMicrornaCount(Gene gene);



    //肿瘤
    public Tumor tumor(Tumor from);

    public List<Map> tumorStage(Tumor gene);

    int tumorStageCount(Tumor gene);

    public List<Map> tumorTissue(Tumor gene);

    int tumorTissueCount(Tumor gene);

    public List<Map> tumorSurviavl(Tumor gene);

    int tumorSurviavlCount(Tumor gene);

    public List<Map> tumorTranscriptFactor(Tumor gene);

    public int tumorTranscriptFactorCount(Tumor gene);

    public List<Map> tumorLncRna(Tumor gene);

    public int tumorLncRnaCount(Tumor gene);

    public List<Map> tumorMirrna(Tumor gene);

    public int tumorMirrnaCount(Tumor gene);

    public List<Map> tumorFilterDetails(Tumor gene);

    public List<Map> phenoAndSurv(Tumor gene);


    List<Gene>geneList();

    List<Tumor>tumorList();

    public List<Map> geneMethylation(Gene gene);

    public int geneMethylationCount(Gene gene);

    public List<Map> geneAnimalModel(Gene gene);

    public int geneAnimalModelCount(Gene gene);

    public List<Map> getGSEPlatform(Tumor gene);

    public List<Map> getGeneInGEOMatrix(Tumor gene);

    public List<Map> getTCGA(Tumor gene);

    public List<Map> getAlternativeSplicing(Gene gene);

    public int getAlternativeSplicingCount(Gene gene);

    List<Map> getClinicalTrial(Tumor gene);

    int getClinicalTrialCount(Tumor gene);
}
