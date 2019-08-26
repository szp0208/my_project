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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import test.demo.bean.User;
import test.demo.service.UserService;

/**
 * 处理跨域问题-过滤器+token验证拦截
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
        System.out.println("浏览器域名：" + req.getRequestURI());
        String[] allowDomains = {"http://192.168.2.114:8000", "http://localhost:8000"};    //跨域请求白名单
        HashSet allowOrigins = new HashSet(Arrays.asList(allowDomains));
        if (allowOrigins.contains(req.getHeader("Origin"))) {    //判断字符串是否存在,contains
            System.out.println("允许该域名跨域请求");
            rep.setHeader("Access-Control-Allow-Origin", req.getHeader("Origin"));
            rep.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE,PUT");
            rep.setHeader("Access-Control-Max-Age", "3600");
            rep.setHeader("Access-Control-Allow-Headers","token, Origin, X-Requested-With, Content-Type, Accept");

            String token = req.getHeader("token");//header方式获取token
            System.out.println(token);

            MsgHandler handler = new MsgHandler();
            boolean isFilter = false;

            String method = ((HttpServletRequest) request).getMethod();
            if(method.equals("OPTIONS") || req.getRequestURI().equals("/user/userLogin")) {
                rep.setStatus(HttpServletResponse.SC_OK);
            } else {
                if(null == token || token.isEmpty()) {
                    throw new RuntimeException("用户授权认证没有通过!客户端请求参数中无token信息");
                } else {
                    try {
                        // 获取 token 中的 user id
                        String userId = TokenUtil.parseJWT(token).get("id").toString();
                        System.out.println("用户id：" + userId);
                        User user = userService.findUserById(Integer.valueOf(userId));
                        Boolean verify = TokenUtil.isVerify(token, user);
                        if (verify) {
                            isFilter = true;
                        } else {
                            throw new RuntimeException("用户授权认证没有通过!客户端请求参数token信息无效");
                        }
                    } catch (Exception e) {
                        throw new RuntimeException("用户授权认证没有通过!客户端请求参数token信息无效");
                    }
                }
            }

            if (isFilter || req.getRequestURI().equals("/user/userLogin")) {
                logger.info("token filter过滤ok!");
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