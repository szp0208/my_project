package cn.chosien.dao;

import cn.chosien.bean.BaseVo;
import cn.chosien.bean.Gene;
import cn.chosien.bean.SearchReq;
import cn.chosien.bean.Tumor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface TumorMapper {

    List<SearchReq> tumorList(BaseVo vo);

    List<Tumor>list();
    Tumor info(Tumor gene);

    List<Map> tumorStage(Tumor gene);

    int tumorStageCount(Tumor gene);

    List<Map> tumorTissue(Tumor gene);

    int tumorTissueCount(Tumor gene);

    List<Map> tumorSurviavl(Tumor gene);

    int tumorSurviavlCount(Tumor gene);

    List<Map> tumorTranscriptFactor(Tumor gene);

    int tumorTranscriptFactorCount(Tumor gene);

    List<Map> tumorLncRna(Tumor gene);

    int tumorLncRnaCount(Tumor gene);

    List<Map> tumorMirrna(Tumor gene);

    int tumorMirrnaCount(Tumor gene);

    List<Map> tumorFilterDetails(Tumor gene);

    List<Map> phenoAndSurv(Tumor gene);

    List<Map> getGSEPlatform(Tumor gene);

    List<Map> getGeneInGEOMatrix(Tumor gene);

    List<Map> getTCGA(Tumor gene);

    List<Map> getClinicalTrial(Tumor gene);

    int getClinicalTrialCount(Tumor gene);

}