package cn.chosien.util;


import java.util.ArrayList;
import java.util.List;


public class StringSplit {


    public static List<String> stringSplitTwo(String text){
        List<String> stringList = new ArrayList<String>();
        String[] _strings = String.valueOf(text).split(",");
        for (int m = 0, n = _strings.length; m < n; m++) {
            stringList.add(_strings[m]);
        }
        return stringList;
    }
    public static List<String> stringSplitThree(String text,String string){
        List<String> stringList = new ArrayList<String>();
        String[] _strings = String.valueOf(text).split(string);
        for (int m = 0, n = _strings.length; m < n; m++) {
            stringList.add(_strings[m]);
        }
        return stringList;
    }
    //判断 test1 是否包含test2
    public static boolean baoHan(String test,String test2){
        if (test.indexOf(test2)!=-1){
                         return true;
                     }else{
                       return false;
                     }
    }


    public static String stringReplace(String text){
        String a ;
        a=text.replace("/", "-");
        return a;
    }
    //替换字符串  target 替换成 repleacement
    public static String stringReplace(String text,String target,String repleacement){
        String a ;
        a=text.replace(target, repleacement);
        return a;
    }

}