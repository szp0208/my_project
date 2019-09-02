package cn.chosien.dao;

import cn.chosien.bean.BaseVo;
import cn.chosien.bean.Gene;
import cn.chosien.bean.SearchReq;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface GeneMapper {

    List<SearchReq> geneList(BaseVo vo);

    Gene info(Gene gene);

    List<Gene> genes();

    List<Map> geneCell(Gene gene);

    List<Map> geneTissue(Gene gene);

    List<Map> geneMirna(Gene gene);

    int geneMirnaCount(Gene gene);

    List<Map> geneTranscriptFactor(Gene gene);

    int geneTranscriptFactorCount(Gene gene);

    List<Map> geneLncRna(Gene gene);

    int geneLncRnaCount(Gene gene);

    List<Map> genePhosphorylation(Gene gene);

    int genePhosphorylationCount(Gene gene);

    List<Map> geneRegulationLncrna(Gene gene);

    int geneRegulationLncrnaCount(Gene gene);

    List<Map> geneRegulationMicrorna(Gene gene);

    int geneRegulationMicrornaCount(Gene gene);

    List<Map> scatterAg(Gene gene);

    List<Map> scatterL(Gene gene);

    List<Map> scatterM(Gene gene);

    List<Map> scatterTf(Gene gene);


    List<Map> geneMethylation(Gene gene);

    int geneMethylationCount(Gene gene);

    List<Map> geneAnimalModel(Gene gene);

    int geneAnimalModelCount(Gene gene);

    List<Map> getAlternativeSplicing(Gene gene);

    int getAlternativeSplicingCount(Gene gene);

}