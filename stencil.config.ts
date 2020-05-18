import { Config } from '@stencil/core'
import { sass } from '@stencil/sass'

export const config: Config = {
  namespace: 'wjh-dev',
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null, // disable service workers,
      buildDir: 'app',
    }
  ],
  plugins: [ 
    sass({ injectGlobalPaths: ["src/assets/style.scss"] })
  ]
};
