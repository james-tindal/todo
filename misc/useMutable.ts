import { DispatchWithoutAction, useMemo, useReducer } from 'react'

export function useMutable<T>(construct: (dispatch: DispatchWithoutAction) => T) {
  const dispatch = useDispatch()
  const value = useMemo(() => construct(dispatch), [])
  return value
}

function useDispatch() {
  const [, dispatch] = useReducer(x => x + 1, 0)
  return dispatch
}
