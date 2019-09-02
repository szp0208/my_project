package cn.chosien.util;

import org.springframework.format.Formatter;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class DateFormatter implements Formatter<Date> {


    public String print(Date object, Locale locale) {
        return null;
    }


    public Date parse(String text, Locale locale) throws ParseException {
        Date date = null;
        Long dateMils = null;
        try {
            dateMils = Long.valueOf(text);
            date = new Date(dateMils);
            return date;
        } catch (Exception e){
            //e.printStackTrace();
        }
        SimpleDateFormat format;
        if (!text.contains(":")) {
            format = new SimpleDateFormat("yyyy-MM-dd");
        } else if (!text.contains("T")){
            format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        } else {
            format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
        }

        try {
            date = format.parse(text);
        } catch (Exception e) {
            format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SS:SZ");
            date = format.parse(text);
        }

        return date;
    }

}