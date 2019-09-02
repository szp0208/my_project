package cn.chosien.util;


import cn.chosien.bean.CsvField;
import org.apache.ibatis.javassist.tools.reflect.Sample;
import org.springframework.context.annotation.Bean;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;


public class CsvUtils {
    public static void readCSV(String readpath, ArrayList list)
    {
        File inFile = new File(readpath);
        try
        {
            BufferedReader reader = new BufferedReader(new FileReader(inFile));
            boolean sign = false;       //用来跳过第一行的名称
            while(reader.ready())
            {
                String line = reader.readLine();
                StringTokenizer st = new StringTokenizer(line, ",");
                String id, name;

                if (st.hasMoreTokens() && sign)
                {
                    id = String.valueOf(st.nextToken().trim());
                    name = String.valueOf(st.nextToken().trim());
                    CsvField csvField = new CsvField();
                    csvField.setId(id);
                    csvField.setName(name);
                    list.add(csvField);
                }
                else
                {
                    sign = true;
                }
            }
            reader.close();

        }
        catch (FileNotFoundException e)
        {

            e.printStackTrace();
        }
        catch (IOException e)
        {

            e.printStackTrace();
        }
    }
}