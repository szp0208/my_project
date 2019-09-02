package cn.chosien.controller;


import cn.chosien.bean.BaseVo;
import cn.chosien.bean.Gene;
import cn.chosien.bean.Page;
import cn.chosien.bean.Tumor;
import cn.chosien.service.Service;
import cn.chosien.util.JSONObjectAbstractController;
import cn.chosien.util.MsgHandler;
import cn.chosien.util.StringUtils;
import com.alibaba.fastjson.JSONObject;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.Map;

/**
 * Created by chens on 2017/3/7.
 */


@RestController
@RequestMapping(value = "")
public class Controller extends JSONObjectAbstractController {

    @Resource
    private Service service;

    @RequestMapping(value = "/searchList", method = RequestMethod.GET)
    public MsgHandler searchList(BaseVo vo) throws Exception {
        MsgHandler handler = new MsgHandler();
        handler.setContext(service.searchList(vo));
        handler.setStatus("200");
        return handler;
    }

    @RequestMapping(value = "/scatter", method = RequestMethod.GET)
    public MsgHandler scatter(Gene vo) throws Exception {
        MsgHandler handler = new MsgHandler();
        if (StringUtils.isNull(vo.getGene_id())||StringUtils.isNull(vo.getTumor_id())||StringUtils.isNull(vo.getSymbol())||StringUtils.isNull(vo.getType())){
            handler.setMessage("id is not found");
            handler.setStatus("400");
            return handler;
        }
        handler.setContext(service.scatter(vo));
        handler.setStatus("200");
        return handler;
    }
    //基因详情
    @RequestMapping(value = "/gene", method = RequestMethod.GET)
    public MsgHandler gene(Gene vo) throws Exception {
        MsgHandler handler = new MsgHandler();
        if (StringUtils.isNull(vo.getGene_id())){
            handler.setMessage("id is not found");
            handler.setStatus("400");
            return handler;
        }
        handler.setContext(service.gene(vo));
        handler.setStatus("200");
        return handler;
    }


    //Expression profile cell
    @RequestMapping(value = "/geneCell", method = RequestMethod.GET)
    public MsgHandler geneCell(Gene vo) throws Exception {
        MsgHandler handler = new MsgHandler();
        if (StringUtils.isNull(vo.getGene_id())){
            handler.setMessage("id is not found");
            handler.setStatus("400");
            return handler;
        }
        handler.setContext(service.geneCell(vo));
        handler.setStatus("200");
        return handler;
    }


    //Expression profile tissue
    @RequestMapping(value = "/geneTissue", method = RequestMethod.GET)
    public MsgHandler geneTissue(Gene vo) throws Exception {
        MsgHandler handler = new MsgHandler();
        if (StringUtils.isNull(vo.getGene_id())){
            handler.setMessage("id is not found");
            handler.setStatus("400");
            return handler;
        }
        handler.setContext(service.geneTissue(vo));
        handler.setStatus("200");
        return handler;
    }


    //Correlation mirna
    @RequestMapping(value = "/geneMirna", method = RequestMethod.POST)
    public MsgHandler geneMirna(@RequestBody Gene vo) throws Exception {
        MsgHandler handler = new MsgHandler();
        if (StringUtils.isNull(vo.getGene_id())){
            handler.setMessage("id is not found");
            handler.setStatus("400");
            return handler;
        }

        if (StringUtils.isNotNull(vo.getStart())&&StringUtils.isNotNull(vo.getCount())){
            Page<Map> page = new Page<Map>();
            int i = service.geneMirnaCount(vo);
            if (i==0){
                page.setItems(new ArrayList<>());
            }else {
                page.setItems(service.geneMirna(vo));
                page.setTotalNum(i);
            }
            handler.setContext(page);
        }else {
            vo.setType("1");
            handler.setContext(service.geneMirna(vo));
        }
        handler.setStatus("200");
        return handler;
    }

    //Correlation TranscriptFactor
    @RequestMapping(value = "/geneTranscriptFactor", method = RequestMethod.POST)
    public MsgHandler geneTranscriptFactor(@RequestBody Gene vo) throws Exception {
        MsgHandler handler = new MsgHandler();
        if (StringUtils.isNull(vo.getGene_id())){
            handler.setMessage("id is not found");
            handler.setStatus("400");
            return handler;
        }
        if (StringUtils.isNotNull(vo.getStart())&&StringUtils.isNotNull(vo.getCount())){
            Page<Map> page = new Page<Map>();
            int i = service.geneTranscriptFactorCount(vo);
            if (i==0){
                page.setItems(new ArrayList<>());
            }else {
                page.setItems(service.geneTranscriptFactor(vo));
                page.setTotalNum(i);
            }
            handler.setContext(page);
        }else {
            vo.setType("1");
            handler.setContext(service.geneTranscriptFactor(vo));
        }
        handler.setStatus("200");
        return handler;
    }

    //Correlation geneLncRna
    @RequestMapping(value = "/geneLncRna", method = RequestMethod.POST)
    public MsgHandler geneLncRna(@RequestBody Gene vo) throws Exception {
        MsgHandler handler = new MsgHandler();
        if (StringUtils.isNull(vo.getGene_id())){
            handler.setMessage("id is not found");
            handler.setStatus("400");
            return handler;
        }
        if (StringUtils.isNotNull(vo.getStart())&&StringUtils.isNotNull(vo.getCount())){
            Page<Map> page = new Page<Map>();
            int i = service.geneLncRnaCount(vo);
            if (i==0){
                page.setItems(new ArrayList<>());
            }else {
                page.setItems(service.geneLncRna(vo));
                page.setTotalNum(i);
            }
            handler.setContext(page);
        }else {
            vo.setType("1");
            handler.setContext(service.geneLncRna(vo));
        }
        handler.setStatus("200");
        return handler;
    }
    // Post-transcriptional Modification Phosphorylation
    @RequestMapping(value = "/genePhosphorylation", method = RequestMethod.GET)
    public MsgHandler genePhosphorylation(Gene vo) throws Exception {
        MsgHandler handler = new MsgHandler();
        if (StringUtils.isNull(vo.getGene_id())){
            handler.setMessage("id is not found");
            handler.setStatus("400");
            return handler;
        }
        if (StringUtils.isNotNull(vo.getStart())&&StringUtils.isNotNull(vo.getCount())){
            Page<Map> page = new Page<Map>();
            int i = service.genePhosphorylationCount(vo);
            if (i==0){
                page.setItems(new ArrayList<>());
            }else {
                page.setItems(service.genePhosphorylation(vo));
                page.setTotalNum(i);
            }
            handler.setContext(page);
        }else {
            handler.setContext(service.genePhosphorylation(vo));
        }
        handler.setStatus("200");
        return handler;
    }

    // ncRNA regulation RegulationLncrna
    @RequestMapping(value = "/geneRegulationLncrna", method = RequestMethod.GET)
    public MsgHandler geneRegulationLncrna(Gene vo) throws Exception {
        MsgHandler handler = new MsgHandler();
        if (StringUtils.isNull(vo.getGene_id())){
            handler.setMessage("id is not found");
            handler.setStatus("400");
            return handler;
        }
        if (StringUtils.isNotNull(vo.getStart())&&StringUtils.isNotNull(vo.getCount())){
            Page<Map> page = new Page<Map>();
            int i = service.geneRegulationLncrnaCount(vo);
            if (i==0){
                page.setItems(new ArrayList<>());
            }else {
                page.setItems(service.geneRegulationLncrna(vo));
                page.setTotalNum(i);
            }
            handler.setContext(page);
        }else {
            handler.setContext(service.geneRegulationLncrna(vo));
        }

        handler.setStatus("200");
        return handler;
    }

    // ncRNA regulation RegulationMicrorna
    @RequestMapping(value = "/geneRegulationMicrorna", method = RequestMethod.GET)
    public MsgHandler geneRegulationMicrorna(Gene vo) throws Exception {
        MsgHandler handler = new MsgHandler();
        if (StringUtils.isNull(vo.getGene_id())){
            handler.setMessage("id is not found");
            handler.setStatus("400");
            return handler;
        }
        if (StringUtils.isNotNull(vo.getStart())&&StringUtils.isNotNull(vo.getCount())){
            Page<Map> page = new Page<Map>();
            int i = service.geneRegulationMicrornaCount(vo);
            if (i==0){
                page.setItems(new ArrayList<>());
            }else {
                page.setItems(service.geneRegulationMicrorna(vo));
                page.setTotalNum(i);
            }
            handler.setContext(page);
        }else {
            handler.setContext(service.geneRegulationMicrorna(vo));
        }
        handler.setStatus("200");
        return handler;
    }




    //肿瘤详情
    @RequestMapping(value = "/tumor", method = RequestMethod.GET)
    public MsgHandler tumor(Tumor vo) throws Exception {
        MsgHandler handler = new MsgHandler();
        if (StringUtils.isNull(vo.getTumor_id())){
            handler.setMessage("id is not found");
            handler.setStatus("400");
            return handler;
        }
        handler.setContext(service.tumor(vo));
        handler.setStatus("200");
        return handler;
    }
    //gene Expression By Stage
    @RequestMapping(value = "/tumorStage", method = RequestMethod.GET)
    public MsgHandler tumorStage(Tumor vo) throws Exception {
        MsgHandler handler = new MsgHandler();
        if (StringUtils.isNull(vo.getTumor_id())){
            handler.setMessage("id is not found");
            handler.setStatus("400");
            return handler;
        }

        if (StringUtils.isNotNull(vo.getStart())&&StringUtils.isNotNull(vo.getCount())){
            Page<Map> page = new Page<Map>();
            int i = service.tumorStageCount(vo);
            if (i==0){
                page.setItems(new ArrayList<>());
            }else {
                page.setItems(service.tumorStage(vo));
                page.setTotalNum(i);
            }
            handler.setContext(page);
        }else {
            handler.setContext(service.tumorStage(vo));
        }
        handler.setStatus("200");
        return handler;
    }

    //gene Expression By Sample sites
    @RequestMapping(value = "/tumorTissue", method = RequestMethod.GET)
    public MsgHandler tumorTissue(Tumor vo) throws Exception {
        MsgHandler handler = new MsgHandler();
        if (StringUtils.isNull(vo.getTumor_id())){
            handler.setMessage("id is not found");
            handler.setStatus("400");
            return handler;
        }
        if (StringUtils.isNotNull(vo.getStart())&&StringUtils.isNotNull(vo.getCount())){
            Page<Map> page = new Page<Map>();
            int i = service.tumorTissueCount(vo);
            if (i==0){
                page.setItems(new ArrayList<>());
            }else {
                page.setItems(service.tumorTissue(vo));
                page.setTotalNum(i);
            }
            handler.setContext(page);
        }else {
            handler.setContext(service.tumorTissue(vo));
        }
        handler.setStatus("200");
        return handler;
    }

    //gene Expression By surviavl
    @RequestMapping(value = "/tumorSurviavl", method = RequestMethod.GET)
    public MsgHandler tumorSurviavl(Tumor vo) throws Exception {
        MsgHandler handler = new MsgHandler();
        if (StringUtils.isNull(vo.getTumor_id())){
            handler.setMessage("id is not found");
            handler.setStatus("400");
            return handler;
        }
        if (StringUtils.isNotNull(vo.getStart())&&StringUtils.isNotNull(vo.getCount())){
            Page<Map> page = new Page<Map>();
            int i = service.tumorSurviavlCount(vo);
            if (i==0){
                page.setItems(new ArrayList<>());
            }else {
                page.setItems(service.tumorSurviavl(vo));
                page.setTotalNum(i);
            }
            handler.setContext(page);
        }else {
            handler.setContext(service.tumorSurviavl(vo));
        }

        handler.setStatus("200");
        return handler;
    }

    //Correlation transcription facto
    @RequestMapping(value = "/tumorTranscriptFactor", method = RequestMethod.POST)
    public MsgHandler tumorTranscriptFactor(@RequestBody Tumor vo) throws Exception {
        MsgHandler handler = new MsgHandler();
        if (StringUtils.isNull(vo.getTumor_id())){
            handler.setMessage("id is not found");
            handler.setStatus("400");
            return handler;
        }
        if (StringUtils.isNotNull(vo.getStart())&&StringUtils.isNotNull(vo.getCount())){
            Page<Map> page = new Page<Map>();
            int i = service.tumorTranscriptFactorCount(vo);
            if (i==0){
                page.setItems(new ArrayList<>());
            }else {
                page.setItems(service.tumorTranscriptFactor(vo));
                page.setTotalNum(i);
            }
            handler.setContext(page);
        }else {
            vo.setType("1");
            handler.setContext(service.tumorTranscriptFactor(vo));
        }
        handler.setStatus("200");
        return handler;
    }

    //Correlation  LncRna
    @RequestMapping(value = "/tumorLncRna", method = RequestMethod.POST)
    public MsgHandler tumorLncRna(@RequestBody Tumor vo) throws Exception {
        MsgHandler handler = new MsgHandler();
        if (StringUtils.isNull(vo.getTumor_id())){
            handler.setMessage("id is not found");
            handler.setStatus("400");
            return handler;
        }
        if (StringUtils.isNotNull(vo.getStart())&&StringUtils.isNotNull(vo.getCount())){
            Page<Map> page = new Page<Map>();
            int i = service.tumorLncRnaCount(vo);
            if (i==0){
                page.setItems(new ArrayList<>());
            }else {
                page.setItems(service.tumorLncRna(vo));
                page.setTotalNum(i);
            }
            handler.setContext(page);
        }else {
            vo.setType("1");
            handler.setContext(service.tumorLncRna(vo));
        }
        handler.setStatus("200");
        return handler;
    }

    //Correlation  Mirrna
    @RequestMapping(value = "/tumorMirrna", method = RequestMethod.POST)
    public MsgHandler tumorMirrna(@RequestBody Tumor vo) throws Exception {
        MsgHandler handler = new MsgHandler();
        if (StringUtils.isNull(vo.getTumor_id())){
            handler.setMessage("id is not found");
            handler.setStatus("400");
            return handler;
        }
        if (StringUtils.isNotNull(vo.getStart())&&StringUtils.isNotNull(vo.getCount())){
            Page<Map> page = new Page<Map>();
            int i = service.tumorMirrnaCount(vo);
            if (i==0){
                page.setItems(new ArrayList<>());
            }else {
                page.setItems(service.tumorMirrna(vo));
                page.setTotalNum(i);
            }
            handler.setContext(page);
        }else {
            vo.setType("1");
            handler.setContext(service.tumorMirrna(vo));
        }
        handler.setStatus("200");
        return handler;
    }
    //KM-plot 筛选项以及筛选字段
    @RequestMapping(value = "/tumorFilterDetails", method = RequestMethod.GET)
    public MsgHandler tumorFilterDetails(Tumor vo) throws Exception {
        MsgHandler handler = new MsgHandler();
        if (StringUtils.isNull(vo.getTumor_id())){
            handler.setMessage("id is not found");
            handler.setStatus("400");
            return handler;
        }
        handler.setContext(service.tumorFilterDetails(vo));
        handler.setStatus("200");
        return handler;
    }
    //KM-plot 肿瘤独立数据
    @RequestMapping(value = "/phenoAndSurv", method = RequestMethod.GET)
    public MsgHandler phenoAndSurv(Tumor vo) throws Exception {
        MsgHandler handler = new MsgHandler();
        if (StringUtils.isNull(vo.getTumor())){
            handler.setMessage("tumor is not found");
            handler.setStatus("400");
            return handler;
        }
        handler.setContext(service.phenoAndSurv(vo));
        handler.setStatus("200");
        return handler;
    }
    //基因列表
    @RequestMapping(value = "/geneList", method = RequestMethod.GET)
    public MsgHandler geneList() throws Exception {
        MsgHandler handler = new MsgHandler();
        handler.setContext(service.geneList());
        handler.setStatus("200");
        return handler;
    }


    //肿瘤列表
    @RequestMapping(value = "/tumorList", method = RequestMethod.GET)
    public MsgHandler tumorList() throws Exception {
        MsgHandler handler = new MsgHandler();
        handler.setContext(service.tumorList());
        handler.setStatus("200");
        return handler;
    }
    // Methylation
    @RequestMapping(value = "/geneMethylation", method = RequestMethod.GET)
    public MsgHandler geneMethylation(Gene vo) throws Exception {
        MsgHandler handler = new MsgHandler();
        if (StringUtils.isNull(vo.getGene_id())){
            handler.setMessage("id is not found");
            handler.setStatus("400");
            return handler;
        }
        if (StringUtils.isNotNull(vo.getStart())&&StringUtils.isNotNull(vo.getCount())){
            Page<Map> page = new Page<Map>();
            int i = service.geneMethylationCount(vo);
            if (i==0){
                page.setItems(new ArrayList<>());
            }else {
                page.setItems(service.geneMethylation(vo));
                page.setTotalNum(i);
            }
            handler.setContext(page);
        }else {
            handler.setContext(service.geneMethylation(vo));
        }
        handler.setStatus("200");
        return handler;
    }

    // AnimalModel
    @RequestMapping(value = "/geneAnimalModel", method = RequestMethod.GET)
    public MsgHandler geneAnimalModel(Gene vo) throws Exception {
        MsgHandler handler = new MsgHandler();
        if (StringUtils.isNull(vo.getGene_id())){
            handler.setMessage("id is not found");
            handler.setStatus("400");
            return handler;
        }
        if (StringUtils.isNotNull(vo.getStart())&&StringUtils.isNotNull(vo.getCount())){
            Page<Map> page = new Page<Map>();
            int i = service.geneAnimalModelCount(vo);
            if (i==0){
                page.setItems(new ArrayList<>());
            }else {
                page.setItems(service.geneAnimalModel(vo));
                page.setTotalNum(i);
            }
            handler.setContext(page);
        }else {
            handler.setContext(service.geneAnimalModel(vo));
        }
        handler.setStatus("200");
        return handler;
    }

    // AnimalModel
    @RequestMapping(value = "/getGSEPlatform", method = RequestMethod.GET)
    public MsgHandler getGSEPlatform(Tumor vo) throws Exception {
        MsgHandler handler = new MsgHandler();
        if (StringUtils.isNull(vo.getTumor_id())){
            handler.setMessage("id is not found");
            handler.setStatus("400");
            return handler;
        }
        handler.setContext(service.getGSEPlatform(vo));
        handler.setStatus("200");
        return handler;
    }

    // AnimalModel
    @RequestMapping(value = "/getGeneInGEOMatrix", method = RequestMethod.GET)
    public MsgHandler getGeneInGEOMatrix(Tumor vo) throws Exception {
        MsgHandler handler = new MsgHandler();
        if (StringUtils.isNull(vo.getTumor_id())){
            handler.setMessage("id is not found");
            handler.setStatus("400");
            return handler;
        }
        handler.setContext(service.getGeneInGEOMatrix(vo));
        handler.setStatus("200");
        return handler;
    }

    //TCGA
    @RequestMapping(value = "/getTCGA", method = RequestMethod.GET)
    public MsgHandler getTCGA(Tumor vo) throws Exception {
        MsgHandler handler = new MsgHandler();
        if (StringUtils.isNull(vo.getTumor_id())){
            handler.setMessage("id is not found");
            handler.setStatus("400");
            return handler;
        }
        handler.setContext(service.getTCGA(vo));
        handler.setStatus("200");
        return handler;
    }

    //Alternative splicing
    @RequestMapping(value = "/getAlternativeSplicing", method = RequestMethod.GET)
    public MsgHandler getAlternativeSplicing(Gene vo) throws Exception {
        MsgHandler handler = new MsgHandler();
        if (StringUtils.isNull(vo.getGene_id())){
            handler.setMessage("id is not found");
            handler.setStatus("400");
            return handler;
        }
        if (StringUtils.isNotNull(vo.getStart())&&StringUtils.isNotNull(vo.getCount())){
            Page<Map> page = new Page<Map>();
            int i = service.getAlternativeSplicingCount(vo);
            if (i==0){
                page.setItems(new ArrayList<>());
            }else {
                page.setItems(service.getAlternativeSplicing(vo));
                page.setTotalNum(i);
            }
            handler.setContext(page);
        }else {
            handler.setContext(service.getAlternativeSplicing(vo));
        }

        handler.setStatus("200");
        return handler;
    }


    //Clinical Trial”表格
    @RequestMapping(value = "/getClinicalTrial", method = RequestMethod.GET)
    public MsgHandler getClinicalTrial(Tumor vo) throws Exception {
        MsgHandler handler = new MsgHandler();
        if (StringUtils.isNull(vo.getTumor_id())){
            handler.setMessage("id is not found");
            handler.setStatus("400");
            return handler;
        }
        if (StringUtils.isNotNull(vo.getStart())&&StringUtils.isNotNull(vo.getCount())){
            Page<Map> page = new Page<Map>();
            int i = service.getClinicalTrialCount(vo);
            if (i==0){
                page.setItems(new ArrayList<>());
            }else {
                page.setItems(service.getClinicalTrial(vo));
                page.setTotalNum(i);
            }
            handler.setContext(page);
        }else {
            handler.setContext(service.getClinicalTrial(vo));
        }

        handler.setStatus("200");
        return handler;
    }




    @Override
    protected JSONObject handleAjaxRequestInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws Exception {
        // TODO Auto-generated method stub
        return null;
    }

}

