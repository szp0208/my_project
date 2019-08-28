package test.demo.util;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashSet;

import javax.annotation.Resource;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import test.demo.bean.User;
import test.demo.service.UserService;

/**
 * 处理跨域问题-过滤器+login_token验证拦截
 * @author MR.SHI
 * @date 2019/06/06
 *
 */
@Component
public class OriginFilter implements Filter {

    private static Logger logger = LoggerFactory
            .getLogger(OriginFilter.class);

    @Resource
    private UserService userService;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletResponse rep = (HttpServletResponse) response;   //请求接口的地址参数对象
        HttpServletRequest req = (HttpServletRequest) request;  //浏览器url地址参数对象

        System.out.println("浏览器域名：" + req.getHeader("Origin"));
        System.out.println("浏览器接口地址：" + req.getRequestURI());
        String[] allowDomains = {"http://localhost:8083", "http://localhost:8085"};    //跨域请求白名单
        HashSet allowOrigins = new HashSet(Arrays.asList(allowDomains));
        if (allowOrigins.contains(req.getHeader("Origin"))) {    //判断字符串是否存在,contains
            System.out.println("允许该域名跨域请求");
            rep.setHeader("Access-Control-Allow-Origin", req.getHeader("Origin"));
            rep.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE,PUT");
            rep.setHeader("Access-Control-Allow-Credentials", "true");
            rep.setHeader("Connection", "keep-alive");
            rep.setHeader("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS");
            rep.setHeader("Access-Control-Max-Age", "3600");
            rep.setHeader("Access-Control-Allow-Headers","login_token, Origin, X-Requested-With, Content-Type, Accept");
            rep.setContentType("application/json; charset=utf-8");

            String login_token = req.getHeader("login_token");//header方式获取login_token
            System.out.println("login_token：" + login_token);
            boolean isFilter = false;

            String method = ((HttpServletRequest) request).getMethod();
            if(method.equals("OPTIONS") || req.getRequestURI().equals("/api/login")) {
                rep.setStatus(HttpServletResponse.SC_OK);
            } else {
                if(null == login_token || login_token.isEmpty()) {  //请求头中无login_token信息
                    MsgHandler handler = new MsgHandler();
                    handler.setMessage("用户授权认证没有通过!客户端请求参数中无login_token信息");
                    handler.setCode("100002");
                    JSONObject responObj = JSONObject.fromObject(handler); //将实体对象转换为JSON Object转换
                    response.getWriter().print(responObj);
                } else {
                    try {
                        // 获取 login_token 中的 user id
                        String userId = TokenUtil.parseJWT(login_token).get("id").toString();
                        System.out.println("用户id：" + userId);
                        User user = userService.findUserById(Integer.valueOf(userId));
                        Boolean verify = TokenUtil.isVerify(login_token, user);
                        if (verify) {
                            isFilter = true;
                        } else {
                            MsgHandler handler = new MsgHandler();
                            handler.setMessage("用户授权认证没有通过!客户端请求参数login_token信息无效");
                            handler.setCode("100003");
                            JSONObject responObj = JSONObject.fromObject(handler); //将实体对象转换为JSON Object转换
                            response.getWriter().print(responObj);
                        }
                    } catch (Exception e) { //如果获取用户信息失败login_token过期
                        MsgHandler handler = new MsgHandler();
                        handler.setMessage("用户授权认证没有通过!客户端请求参数login_token信息无效");
                        handler.setCode("100003");
                        JSONObject responObj = JSONObject.fromObject(handler); //将实体对象转换为JSON Object转换
                        response.getWriter().print(responObj);
                    }
                }
            }

            if (isFilter || req.getRequestURI().equals("/api/login")) {
                logger.info("login_token filter过滤ok!");
                chain.doFilter(request, response);
            }
        } else {
            System.out.println("禁止该域名跨域请求");
        }
    }

    @Override
    public void destroy() {
        // TODO Auto-generated method stub

    }

}