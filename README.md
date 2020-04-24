# js 实现拦截器功能

<p align="center">
  <a href="https://www.npmjs.com/package/js-interceptor-lite">
    <img src="https://img.shields.io/npm/dy/js-interceptor-lite?color=blue" alt="downloads">
  </a>
  <a href="https://github.com/yujindong/js-Interceptor-lite">
    <img src="https://img.shields.io/badge/yujindong-js--interceptor--lite-blue" alt="repository">
  </a>
</p>

<p>

</p>

## 使用方法

推荐使用 es6+的继承方式，包含三部分,before, after, handle

| 模块   | 使用           | 说明                                                       |
| ------ | -------------- | ---------------------------------------------------------- |
| handle | 子类中定义     | 具体的业务方法                                             |
| before | 实例化以后添加 | 执行 handle 的前置操作，通常用来修改和拦截 handle 的参数   |
| after  | 实例化以后添加 | 执行 handle 的后置操作，通常用来修改和拦截 handle 的返回值 |
| invoke |                | 使用 instance.invoke(params)调用                           |

```es6
import Interceptor from "js-interceptor-lite";
class Demo extends Interceptor {
  // handle函数是被拦截的业务函数
  handle(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(100); // 模拟业务返回
      }, 1000);
    });
  }
}
const instance = new Demo();
/**
 *  instance.interceptors.before 在handle之前执行
 *  instance.interceptors.after 在handle之后执行
 *  拦截请求参数，接受两个函数参数
 *    第一个函数参数为前置promise resolve执行
 *    第二个函数参数为前置promise reject执行
 *    其中resolved的参数，为前置阶段的返回值
 * instance.interceptors.before.add(resolved, rejected);
 * instance.interceptors.after.add(resolved, rejected);
 */
instance.interceptors.before.add((params) => {
  console.log(params);
  params++;
  return params;
});
// 如果是异步操作，支持返回promise对象
instance.interceptors.before.add((params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      params++;
      resolve(params);
    });
  });
});
instance.interceptors.after.add((result) => {
  console.log(params);
  params++;
  return params;
});
/**
 * 使用invoke执行handle函数
 */

instance.invoke(111);
```
