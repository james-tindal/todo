import { Items } from "@/misc/items"
import { StateBox } from "@/misc/useStateBox"
import { useState } from "react"


export type FilterState = 'All' | 'Active' | 'Completed'

interface Props {
  state: StateBox<FilterState>
}

export function useFilterState(items: Items) {
  const [ state, setState ] = useState<FilterState>('All')
  return {
    get value() { return state },
    set value(x) { setState(x) },
    items:
      state == 'All'       ? items :
      state == 'Active'    ? items.active() :
      state == 'Completed' ? items.completed() : null as never
  }
}

export const Filter = ({ state }: Props) =>
  <div className="filter">
    <Button label='All' state={state} />
    <Button label='Active' state={state} />
    <Button label='Completed' state={state} />
  </div>

interface ButtonProps {
  label: FilterState
  state: StateBox<FilterState>
}
const Button = ({ label, state }: ButtonProps) =>
  <button
    data-active={setIf(state.value == label)}
    onClick={() => state.value = label}
  >
    {label}
  </button>

// Conditionally add empty attribute to element
const setIf = (condition: boolean) =>
  condition ? '' : null
