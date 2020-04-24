/**
 * 拦截器
 */
class InterceptorManager {
  _handlers = [];

  /**
   *
   * @param {成功执行} resolved promise resolve时，进入这里
   * @param {失败执行} rejected promise reject时 进入这里
   */
  add(resolved, rejected) {
    this._handlers.push({
      resolved,
      rejected,
    });
    return this._handlers.length - 1;
  }
  remove(id) {
    if (this._handlers[id]) {
      this._handlers[id] = void 0;
    }
  }
}

export class Interceptor {
  interceptors = {
    before: new InterceptorManager(),
    after: new InterceptorManager(),
  };
  // 默认处理函数，直接返回参数
  handle(params) {
    return Promise.resolve(params);
  }
  // 执行方法，按顺序执行before handle after
  invoke(params) {
    let chain = [
      ...this.interceptors.before._handlers,
      {
        resolved: this.handle,
        rejected: null,
      },
      ...this.interceptors.after._handlers,
    ];
    let promise = Promise.resolve(params);

    while (chain.length > 0) {
      let stage = chain.shift();
      if (stage) {
        promise = promise.then(stage.resolved, stage.rejected);
      }
    }
    return promise;
  }
}
export default Interceptor;
