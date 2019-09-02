package cn.chosien.service.impl;


import cn.chosien.bean.BaseVo;
import cn.chosien.bean.Gene;
import cn.chosien.bean.SearchReq;
import cn.chosien.bean.Tumor;
import cn.chosien.dao.GeneMapper;
import cn.chosien.dao.TumorMapper;
import cn.chosien.service.Service;
import cn.chosien.util.StringSplit;
import cn.chosien.util.StringUtils;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * 活动相关
 * Created by wangxd on 2018/1/3 0003.
 */
@org.springframework.stereotype.Service
public class ServiceImpl implements Service {

    @Resource
    private GeneMapper geneMapper;
    @Resource
    private TumorMapper tumorMapper;

    public List<Map> scatter(Gene gene){
        if ("0".equals(gene.getType())){
            //LNC
            List<Map> xList = geneMapper.scatterAg(gene);
            List<Map> yList = geneMapper.scatterL(gene);
            for (Map ymap:yList){
                for (Map xmap:xList){
                    if (String.valueOf(ymap.get("pt")).equals(String.valueOf(xmap.get("pt")))){
                        ymap.put("x",xmap.get("x"));
                        break;
                    }
                }
            }
            return yList;
        }else if ("1".equals(gene.getType())){
            //TF
            List<Map> xList = geneMapper.scatterAg(gene);
            List<Map> yList = geneMapper.scatterTf(gene);
            for (Map ymap:yList){
                for (Map xmap:xList){
                    if (String.valueOf(ymap.get("pt")).equals(String.valueOf(xmap.get("pt")))){
                        ymap.put("x",xmap.get("x"));
                        break;
                    }
                }
            }
            return yList;
        }else if ("2".equals(gene.getType())){
            //MIR
            List<Map> xList = geneMapper.scatterAg(gene);
            List<Map> yList = geneMapper.scatterM(gene);
            for (Map ymap:yList){
                for (Map xmap:xList){
                    if (String.valueOf(ymap.get("pt")).equals(String.valueOf(xmap.get("pt")))){
                        ymap.put("x",xmap.get("x"));
                        break;
                    }
                }
            }
            return yList;
        }
        return null;
    }

    public List<SearchReq> searchList(BaseVo vo){

        List<SearchReq> searchReqs = new ArrayList<>();
        if (StringUtils.isNull(vo.getType())){
            searchReqs.addAll(geneMapper.geneList(vo));
            searchReqs.addAll(tumorMapper.tumorList(vo));
        }else if ("0".equals(vo.getType())){
            searchReqs.addAll(geneMapper.geneList(vo));
        }else if ("1".equals(vo.getType())){
            searchReqs.addAll(tumorMapper.tumorList(vo));
        }

        return searchReqs;
    }

    //基因
    public Gene gene(Gene from){
        Gene gene = geneMapper.info(from);
        return gene;
    }

    public List<Map> geneCell(Gene gene){
        return geneMapper.geneCell(gene);
    }

    public List<Map> geneTissue(Gene gene){
        return geneMapper.geneTissue(gene);
    }

    public List<Map> dos(List<Map> maps,String id,String name){
        List<Map> mapList = new ArrayList<>();
        for (Map map:maps){
            boolean a = true;
            for (Map ma:mapList){
                if (String.valueOf(ma.get(id)).equals(map.get(id).toString())){
                    List<Map> list = (List<Map>)ma.get("list");
                    list.add(map);
                    ma.put("list",list);
                    a = false;
                    break;
                }
            }
            if (a){
                Map map1 = new HashMap();
                map1.put(name,map.get(name));
                map1.put(id,map.get(id));
                List<Map> mapList1 = new ArrayList<>();
                mapList1.add(map);
                map1.put("list",mapList1);
                mapList.add(map1);
            }
        }
        return mapList;
    }

    public List<Map> geneMirna(Gene gene){
        List<Map> maps = geneMapper.geneMirna(gene);
        if ("1".equals(gene.getType())){
            maps = dos(maps,"tumor_id","tumor_name");
        }
        return maps;
    }

    public int geneMirnaCount(Gene gene){
        return geneMapper.geneMirnaCount(gene);
    }

    public List<Map> geneTranscriptFactor(Gene gene){
        List<Map> maps = geneMapper.geneTranscriptFactor(gene);
        if ("1".equals(gene.getType())){
            maps = dos(maps,"tumor_id","tumor_name");
        }
        return maps;
    }

    public int geneTranscriptFactorCount(Gene gene){
        return geneMapper.geneTranscriptFactorCount(gene);
    }

    public List<Map> geneLncRna(Gene gene){
        List<Map> maps = geneMapper.geneLncRna(gene);
        if ("1".equals(gene.getType())){
            maps = dos(maps,"tumor_id","tumor_name");
        }
        return maps;
    }

    public int geneLncRnaCount(Gene gene){
        return geneMapper.geneLncRnaCount(gene);
    }

    public List<Map> genePhosphorylation(Gene gene){
        return geneMapper.genePhosphorylation(gene);
    }

    public int genePhosphorylationCount(Gene gene){
        return geneMapper.genePhosphorylationCount(gene);
    }

    public int geneRegulationLncrnaCount(Gene gene){
        return geneMapper.geneRegulationLncrnaCount(gene);
    }

    public List<Map> geneRegulationLncrna(Gene gene){
        return geneMapper.geneRegulationLncrna(gene);
    }

    public int geneRegulationMicrornaCount(Gene gene){
        return geneMapper.geneRegulationMicrornaCount(gene);
    }
    public List<Map> geneRegulationMicrorna(Gene gene){
        return geneMapper.geneRegulationMicrorna(gene);
    }


    //肿瘤
    public Tumor tumor(Tumor from){
        return tumorMapper.info(from);
    }


    public List<Map> tumorStage(Tumor gene){
        return tumorMapper.tumorStage(gene);
    }

    public int tumorStageCount(Tumor gene){
        return tumorMapper.tumorStageCount(gene);
    }

    public List<Map> tumorTissue(Tumor gene){
        return tumorMapper.tumorTissue(gene);
    }


    public int tumorTissueCount(Tumor gene){
        return tumorMapper.tumorTissueCount(gene);
    }

    public List<Map> tumorSurviavl(Tumor gene){
        return tumorMapper.tumorSurviavl(gene);
    }

    public int tumorSurviavlCount(Tumor gene){
        return tumorMapper.tumorSurviavlCount(gene);
    }

    public List<Map> tumorTranscriptFactor(Tumor gene){
        List<Map> maps = tumorMapper.tumorTranscriptFactor(gene);
        if ("1".equals(gene.getType())){
            maps = dos(maps,"gene_id","gene_name");
        }
        return maps;
    }
    public int tumorTranscriptFactorCount(Tumor gene){
        return tumorMapper.tumorTranscriptFactorCount(gene);
    }
    public List<Map> tumorLncRna(Tumor gene){
        List<Map> maps = tumorMapper.tumorLncRna(gene);
        if ("1".equals(gene.getType())){
            maps = dos(maps,"gene_id","gene_name");
        }
        return maps;
    }

    public int tumorLncRnaCount(Tumor gene){
        return tumorMapper.tumorLncRnaCount(gene);
    }

    public List<Map> tumorMirrna(Tumor gene){
        List<Map> maps = tumorMapper.tumorMirrna(gene);
        if ("1".equals(gene.getType())){
            maps = dos(maps,"gene_id","gene_name");
        }
        return maps;
    }

    public int tumorMirrnaCount(Tumor gene){
        return tumorMapper.tumorMirrnaCount(gene);
    }

    public List<Map> tumorFilterDetails(Tumor gene){
        List<Map> maps = tumorMapper.tumorFilterDetails(gene);
        for (Map map:maps){
            map.put("listDetail", StringSplit.stringSplitThree(map.get("details").toString(),";"));
        }
        return maps;
    }

    public List<Map> phenoAndSurv(Tumor gene){
        gene.setTableName("pheno_and_surv_"+gene.getTumor());
        return tumorMapper.phenoAndSurv(gene);
    }


    public List<Gene>geneList(){
        return geneMapper.genes();
    }

    public List<Tumor>tumorList(){
        return tumorMapper.list();
    }


    public List<Map> geneMethylation(Gene gene){
        return geneMapper.geneMethylation(gene);
    }

    public int geneMethylationCount(Gene gene){
        return geneMapper.geneMethylationCount(gene);
    }

    public List<Map> geneAnimalModel(Gene gene){
        return geneMapper.geneAnimalModel(gene);
    }

    public int geneAnimalModelCount(Gene gene){
        return geneMapper.geneAnimalModelCount(gene);
    }


    public List<Map> getGSEPlatform(Tumor gene){
        return tumorMapper.getGSEPlatform(gene);
    }

    public List<Map> getGeneInGEOMatrix(Tumor gene){
        return tumorMapper.getGeneInGEOMatrix(gene);
    }

    public List<Map> getTCGA(Tumor gene){
        return tumorMapper.getTCGA(gene);
    }

    public List<Map> getAlternativeSplicing(Gene gene){
        return geneMapper.getAlternativeSplicing(gene);
    }

    public int getAlternativeSplicingCount(Gene gene){
        return geneMapper.getAlternativeSplicingCount(gene);
    }

    public List<Map> getClinicalTrial(Tumor gene){
        return tumorMapper.getClinicalTrial(gene);
    }

    public int getClinicalTrialCount(Tumor gene){
        return tumorMapper.getClinicalTrialCount(gene);
    }
}
