package cn.chosien.controller;


import cn.chosien.bean.CsvField;
import cn.chosien.service.TestService;
import cn.chosien.util.*;
import com.alibaba.fastjson.JSONObject;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.beans.PropertyDescriptor;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by chens on 2017/3/7.
 */


/*
* 获取用户信息
* */
@RestController
@RequestMapping(value = "/api/user")
public class TestController extends JSONObjectAbstractController {

    @Resource
    private TestService testService;

    @RequestMapping(value = "getTest", method = RequestMethod.GET)
    public MsgHandler getTest(
            HttpServletRequest request, String uid) throws Exception {
        MsgHandler handler = new MsgHandler();
        System.out.println(GZipUtils.compress(StringUtils.ObjectToByte(testService.getId())).length());
        System.out.println((StringUtils.ObjectToByte(testService.getId())).length);
        handler.setContext(GZipUtils.compress(StringUtils.ObjectToByte(testService.getId())));
        handler.setContext2(testService.getId());
        handler.setStatus("200");
        return handler;
    }
    @RequestMapping(value = "getTest1", method = RequestMethod.GET)
    public MsgHandler getTest1(
            HttpServletRequest request, final String uid) throws Exception {
        MsgHandler handler = new MsgHandler();
        String filepath = "D:\\apioc";//D盘下的file文件夹的目录
        File file = new File(filepath);//File类型可以是文件也可以是文件夹
        File[] fileList = file.listFiles();//将该目录下的所有文件放置在一个File类型的数组中
        List<File> wjList = new ArrayList<File>();//新建一个文件集合
        String a = "";
        for (int i = 0; i < fileList.length; i++) {
            if (fileList[i].isFile()) {//判断是否为文件
                wjList.add(fileList[i]);
                a = fileList[i].getName();
                ArrayList c = new ArrayList();
                CsvUtils.readCSV(filepath+'\\'+a,c);
                System.out.println(filepath+'\\'+a);
                for (Object o:c){
                    CsvField csvField = (CsvField)o;

                }
            }
        }
        List<File> wjjList = new ArrayList<File>();//新建一个文件夹集合
        for (int i = 0; i < fileList.length; i++) {
            if (fileList[i].isDirectory()) {//判断是否为文件夹
                wjjList .add(fileList[i]);
                a = fileList[i].getName();
            }
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

