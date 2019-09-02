package cn.chosien.util;

import java.io.Serializable;

/**
 * 通用消息传输模型
 */
public class MsgHandler implements Serializable{

    /**
     * 处理状态
     */
    private String status;

    /**
     * 消息句柄
     */
    private String message;

    /**
     * 内容句柄
     */
    private Object context;

    private Object context2;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getContext() {
        return context;
    }

    public void setContext(Object context) {
        this.context = context;
    }

    public Object getContext2() {
        return context2;
    }

    public void setContext2(Object context2) {
        this.context2 = context2;
    }
}
