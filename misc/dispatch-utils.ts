import { DispatchWithoutAction } from "react"


// Dispatch after every mutation of object entries
export function dispatchMutations(x: object, dispatch: DispatchWithoutAction) {
  const properties =
    Object.fromEntries(
      Object.entries(x).map(([k, v]) =>
        [k, accessors(v, dispatch)] ))

  Object.defineProperties(x, properties)
}

const accessors = <T>(initial: T, dispatch: DispatchWithoutAction) => {
  let state = initial
  return {
    get: () => state,
    set(value: T) {
      state = value
      dispatch()
    }
  }
}

// class decorator that dispatches after selected methods
export const dispatchClassMethods =
  <Class, T extends { new (...args: any[]): Class }>(...methods: (keyof Class)[]) =>
    (constructor: T, {}: ClassDecoratorContext<T>) => {
      for (const method of methods) {
        const original = constructor.prototype[method]
        constructor.prototype[method] = function(...args) {
          original.call(this, ...args)
          this.dispatch()
        }
      }
    }

// dispatch methods on an object
export function dispatchMethods<T extends object>(dispatch: DispatchWithoutAction, x: T, ...methods: (keyof T)[]) {
  console.log('T', Object.getPrototypeOf(x))
  const out = Object.create(Object.getPrototypeOf(x)) as T
  for (const method of methods) {
    const original = out[method]
    // @ts-expect-error
    out[method] = function(...args) {
      dispatch()
      // @ts-expect-error
      return original.call(this, ...args)
    }
  }
  return out
}