需要部分loading的组件需要两次包装

1、包装需要遮罩的组件loadingWrap(Component)
  这里Component有一定的要求，Loading组件会遮罩Component的父级，所以Component需要充满父级
  包装后会影响组件的布局，Loading组件采用relative布局
2、当需要触发loading时，需要包装触发的组件loadingWrap.dispatchLoadingWrap(Component),
  被包装后的组件props会增加addLoading方法，需要保存addLoading的返回值，当关闭loading或组件卸载时需要调用返回值
