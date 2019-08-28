CascaderTreeSelect
级联下拉树形选择框
sample:
<CascaderTreeSelect
  data={[{code: '1', value: '2'}, {code: 'ce', value: 'shi', children: [{code: 'ce1', value: 'shi1'}, {code: 'ce2', value: 'shi2'}]}]}
  initialValue={['ce']}
  getFieldDecorator={getFieldDecorator}
  setFieldsValue={setFieldsValue}
  decorator="cascaderTreeSelect"
/>
<CascaderTreeSelect.CascaderTreeSelect
  value={['ce']}
  data={[{code: '1', value: '2'}, {code: 'ce', value: 'shi', children: [{code: 'ce1', value: 'shi1'}, {code: 'ce2', value: 'shi2'}]}]}
/>

###---------------------------------------- props 内容类型 ----------------------------------------###
data                    array                   [{                                        []                    数据
                                                  isLeaf          boolean 是否叶子节点
                                                  children        data    子节点
                                                  disableCheckbox boolean 是否禁用复选框
                                                }]
value                   array                   [string]|[{                               []                    选中值
                                                  key             string  值
                                                  label           string  显示值
                                                }]
loadData                function                                                          undefined             当isLeaf为false且children不存在时加载数据，需要返回promise
selectType              string                  'parent' | 'child'
childrenTrigger         string                  'onMouseOver'|'onClick'|...               'onMouseOver'         触发显示子节点的时机
filterTreeNode          boolean|function                                                  true                  触发onSearch时控制节点是否显示
其余参数参照CommonSelect
