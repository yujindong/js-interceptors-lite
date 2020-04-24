interface InterceptorManager<V> {
  add(onFulfilled?: (value: V) => V | Promise<V>, onRejected?: (error: any) => any): number;
  remove(id: number): void;
}
export default class Interceptor<P, R> {
  interceptors: {
    before: InterceptorManager<P>;
    after: InterceptorManager<R>;
  };
  handle: (params?: P) => R;
  invoke: (params?: P) => Promise<R>;
}
