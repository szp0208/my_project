package test.demo.util;

import java.io.Serializable;

/**
 * 通用消息传输模型
 */
public class MsgHandler implements Serializable{

    /**
     * 处理状态
     */
    private String code;

    /**
     * 消息句柄
     */
    private String message;

    /**
     * 内容句柄
     */
    private Object result;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Object getResult() {
        return result;
    }

    public void setResult(Object result) {
        this.result = result;
    }

}
