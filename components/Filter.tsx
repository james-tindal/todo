import { StateBox, useStateBox } from "@/misc/useStateBox"


export type FilterState = 'All' | 'Active' | 'Completed'

interface Props {
  state: StateBox<FilterState>
}

export const useFilterState = () =>
  useStateBox<FilterState>('All')

export const Filter = ({ state }: Props) => <>
  <Button label='All' state={state} />
  <Button label='Active' state={state} />
  <Button label='Completed' state={state} />
</>

interface ButtonProps {
  label: FilterState
  state: StateBox<FilterState>
}
const Button = ({ label, state }: ButtonProps) =>
  <button
    className='filter'
    data-active={setIf(state.value == label)}
    onClick={() => state.value = label}
  >
    {label}
  </button>


// Conditionally add empty attribute to element
const setIf = (condition: boolean) =>
  condition ? '' : null
