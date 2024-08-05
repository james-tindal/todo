import React from 'react'

export function useStateBox<T>(initialState: T) {
  const [ state, setState ] = React.useState<T>(initialState)
  return {
    get value() { return state },
    set value(x) { setState(x) }
  }
}

export type StateBox<T> = ReturnType<typeof useStateBox<T>>
