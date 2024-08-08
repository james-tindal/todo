
// Method decorator
export function bind(method, { name, addInitializer, kind }: ClassMethodDecoratorContext) {
  addInitializer(function() {
  //@ts-expect-error
    this[name] = this[name].bind(this)
  })
}
