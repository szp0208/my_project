package cn.chosien.util;

import java.text.ParseException;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by mingzhizeng on 2017/5/4.
 * 支持多种时间格式
 */

public class MySimpleDateFormat extends SimpleDateFormat {

    public MySimpleDateFormat(String pattern) {
        super(pattern);
    }

    @Override
    public Date parse(String text, ParsePosition pos) {
        Date date = super.parse(text, pos);
        int oldIndex = pos.getIndex();
        pos.setIndex(text.length());

        if (date == null) {
            Long dateMils = null;
            try {
                dateMils = Long.valueOf(text);
                date = new Date(dateMils);
            } catch (Exception e){
                //e.printStackTrace();
            }
            if (dateMils == null) {
                SimpleDateFormat format;
                if (!text.contains(":")) {
                    format = new SimpleDateFormat("yyyy-MM-dd");
                } else if (text.contains("T")) {
                    //TODO 时间格式有些问题yyyy-MM-dd'T'HH:mm:ss.SSSZ
                    format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SS:SSSZ");
                }  else {
                    format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                }

                try {
                    date = format.parse(text);
                } catch (ParseException e) {
                    pos.setIndex(oldIndex);
                    //e.printStackTrace();
                }
            }
        }
        return date;
    }
}
