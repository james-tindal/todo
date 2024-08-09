/// <reference path='./.sst/platform/config.d.ts' />

export default $config({
  app(input) {
    return {
      name: 'todo',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
    }
  },
  async run() {
    new sst.aws.Nextjs('NextJs', {
      domain: 'todo.jamestindal.co.uk'
    })
  }
})
