export interface IConfig {
  env: string // 开发环境
  mock?: boolean // mock数据
  title: string // 项目title
  baseApi?: string // api请求地址
  mockApi?: string // mock地址
}

const dev: IConfig = {
  env: 'development',
  mock: false,
  title: '开发',
  baseApi: 'https://api.github.com', // 本地api请求地址,注意：如果你使用了代理，请设置成'/'
  mockApi: 'https://api1.github.com'
}

const prod: IConfig = {
  env: 'production',
  mock: false,
  title: '生产',
  baseApi: 'https://localhost:8001', // 正式api请求地址
  mockApi: 'https://localhost:8001'
}

export const config: IConfig = import.meta.env.MODE === 'development' ? dev : prod
