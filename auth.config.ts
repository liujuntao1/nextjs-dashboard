import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {

    /**
     * 用于判断用户是否有权限访问当前页面的回调函数。
     * @param {Object} params - 包含认证信息和请求信息的对象。
     * @param {Object|null} params.auth - 认证信息，包含用户信息。
     * @param {Object} params.request - 请求信息。
     * @param {URL} params.request.nextUrl - 请求的 URL 对象。
     * @returns {boolean|Response} - 如果用户有权限访问，返回 true；如果需要重定向，返回 Response 对象；否则返回 false。
     */
    authorized({ auth, request: { nextUrl } }) {
      // 判断用户是否已登录，将结果存储在 isLoggedIn 变量中
      const isLoggedIn = !!auth?.user;
      // 判断用户请求的路径是否以 /dashboard 开头，将结果存储在 isOnDashboard 变量中
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      // 如果用户请求的是仪表盘页面
      if (isOnDashboard) {
        // 如果用户已登录，则允许访问
        if (isLoggedIn) return true;
        // 如果用户未登录，拒绝访问，后续会重定向到登录页面
        return false; 
      } 
      // 如果用户已登录且访问的不是仪表盘页面
      else if (isLoggedIn) {
        // 将用户重定向到仪表盘页面
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      // 其他情况，允许访问
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;