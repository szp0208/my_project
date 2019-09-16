package test.demo.util;

import net.sf.json.JSONObject;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import test.demo.bean.LogInfo;
import test.demo.service.LogInfoService;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;

@Aspect
@Component
public class LogUtil {
    Logger logger = LoggerFactory.getLogger(getClass());
    private static SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    @Autowired
    private LogInfoService logInfoService; //自己创建，用来保存日志信息



    @Pointcut("execution(* test.demo.controller..*.*(..))") //切点-请求日志
    public void webRequestLog(){}


    @Pointcut("execution(* test.demo.controller..*.*(..))") //切点-请求错误日志
    public void webExceptionLog(){}


    @Before("webRequestLog()")
    public void doBefore(JoinPoint joinPoint){
        try {
            LogInfo logInfo = new LogInfo();
            ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
            HttpServletRequest request= attributes.getRequest();
            String method = request.getMethod();
            //判断是否是post方法，如果是，则记录到日志表中
            // if("POST".equals(method)){
            long beginTime = System.currentTimeMillis();
            String beanName = joinPoint.getSignature().getDeclaringTypeName(); //方法所在的类名
            String methodName = joinPoint.getSignature().getName()+"-"+method;//方法名
            String param = String.valueOf(JSONObject.fromObject(request.getParameterMap()));//请求参数
            System.out.println(param);
            String uri = request.getRequestURI(); //接口名
            String url = request.getRequestURL().toString(); //url
            String remoteAddr = getIpAddr(request); //ip地址
            String sessionId = request.getSession().getId();
            Integer uid = (Integer) request.getSession().getAttribute("uid"); //用户id
            if(uid != null){

            }
            logInfo.setMethod(methodName);
            logInfo.setBeanName(beanName);
            logInfo.setIntf(uri);
            logInfo.setUrl(url);
            Date date = new Date(beginTime);
            logInfo.setRequestTime(date);
            logInfo.setRequestIp(remoteAddr);
            logInfo.setRequestParam(param);

            logger.info(String.valueOf(JSONObject.fromObject(logInfo)));

            logInfoService.save(logInfo);   //保存日志到数据库
        } catch (Exception e) {
        e.printStackTrace();
        }
    }


/** 
  * 异常通知 用于拦截异常日志
  * 
  * @param joinPoint 
  * @param e 
  */
    @AfterThrowing(pointcut = "webExceptionLog()", throwing = "e")
    public void doAfterThrowing(JoinPoint joinPoint, Throwable e) {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        HttpSession session = request.getSession();
        //获取请求ip  
        String ip = request.getRemoteAddr();
        //获取用户请求方法的参数并序列化为JSON格式字符串   
        try {
            String method = request.getMethod();
            String param = String.valueOf(JSONObject.fromObject(request.getParameterMap()));//请求参数
            System.out.println(param);
            String beanName = joinPoint.getSignature().getDeclaringTypeName(); //方法所在的类名
            String methodName = joinPoint.getSignature().getName()+"-"+method;//方法名
            String uri = request.getRequestURI(); //接口名
            String url = request.getRequestURL().toString(); //url

            LogInfo logInfo = new LogInfo();
            logInfo.setExceptionName(e.getClass().getName());
            logInfo.setExceptionMsg(e.getMessage());
            logInfo.setMethod(methodName);
            logInfo.setUrl(url);
            logInfo.setIntf(uri);
            logInfo.setRequestParam(param);
            logInfo.setBeanName(beanName);
            long beginTime = System.currentTimeMillis();
            Date date = new Date(beginTime);
            logInfo.setRequestTime(date);
            logInfo.setRequestIp(ip);

            //保存数据库
            logger.info(String.valueOf(JSONObject.fromObject(logInfo)));
            logInfoService.save(logInfo);   //保存日志到数据库
            System.out.println("=====异常通知结束=====");
        } catch (Exception ex) {
            //记录本地异常日志  
            e.printStackTrace();
            logger.error("==异常通知异常==");
        }
    }

/*@AfterReturning(returning="result",pointcut = "webRequestLog()")
public void doAfterReturning(Object result){
}
*/

    //获取ip地址
    private String getIpAddr(HttpServletRequest request){
        String ip = request.getHeader("x-forwarded-for");
        if(ip==null || ip.length()==0 || "unknowm".equalsIgnoreCase(ip)){
            ip = request.getHeader("Proxy-Client-IP");
        }
        if(ip==null || ip.length()==0 || "unknowm".equalsIgnoreCase(ip)){
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if(ip==null || ip.length()==0 || "unknowm".equalsIgnoreCase(ip)){
            ip = request.getRemoteAddr();
        }
        return ip;
    }
}
