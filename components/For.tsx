import { ReactNode } from 'react'

interface Props<T> {
  each: Iterable<T>
  children: (item: T, index: number) => ReactNode
  reverse?: boolean
}

export const For = <T,>({ each: items, children: mapFn, reverse }: Props<T>) => {
  const result = Iterator.from(items).map(mapFn).toArray()
  return reverse ? result.reverse() : result
}
