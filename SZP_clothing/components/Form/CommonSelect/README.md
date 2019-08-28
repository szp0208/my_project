/**
 * Created by wangjun on 2017/9/19.
 * copy by zero on 2018/01/24
 */

###---------------------------------------- props 内容类型 ----------------------------------------###
/**
 * allowClear                       boolean                 false               清除所有
 * className                        string                  null                formItem样式
 * decorator                        string                  'label'             表单注册标识符
 * disabled                         boolean                 false               禁用
 * filterOption                     boolean|function        参考antd            筛选配置
 * getFieldDecorator                function                必选                Form表单注册
 * hasPaste                         boolean                 false               是否粘贴添加
 * message                          string                  参考antd            校验失败提示信息
 * mode                             string                  参考antd            模式
 * onBlur                           function                null                失去焦点回调
 * onFocus                          function                null                获得焦点回调
 * onSearch                         function（              null                查询回调（节流300ms）
 *                                    value,                                    查询结果
 *                                    time                                      当前查询时间戳
 *                                  ）
 * placeholder                      string                  ''                  占位符
 * initialValue                     array|string            null                初始值
 * isHideRequireIcon                boolean                 false               必填项icon是否显示
 * list                             array                   []                  数据（优先级高于children）
 * listConfig                       object                  null                异步加载数据
 * listFilter                       function                null                数据筛选
 * listRender                       function                null                数据渲染函数（优先级高于listRenderGetKey与listRenderGetValue）
 * listRenderGetKey                 function                null                数据key渲染函数
 * listRenderGetValue               function                null                数据显示值渲染函数
 * required                         boolean                 false               必填项
 * size                             string                  'default'           规格（参考antd）
 * style                            object                  {                   样式
 *                                                            width: '100%',
 *                                                            height: '30px'
 *                                                          }
 * tokenSeparators                  string                  null                间隔符
 * type                             string                  参考antd            校验类别
 * validateFirst                    boolean                 参考antd            校验是否中断
 */
