'use client'
import { Filter, useFilterState } from "@/components/Filter"
import { For } from "@/components/For"
import { Show } from "@/components/Show"
import { key } from "@/misc/key-chords"
import { KeyboardEventHandler, useState } from "react"



type Item = ReturnType<typeof Item>
const Item = (text: string) => ({
  text,
  completed: false,
  key: Date.now(),
  delete: 0 /*  This needs access to the List and its position  */
})

function useItems() {
  const [items, setItems] = useState<Item[]>([])


  // How do you add an item?
  // push, pop, shift, unshift



  // const setAllCompleted = (completed: boolean) =>
  //   items.forEach(item => item.completed = completed)

  const setAllCompleted = (completed: boolean) =>
    setItems(items.map(item => ({ ...item, completed })))

  // Should be able to call complete() on an item and have it update state

  // Does this build on top of the list abstraction?
  // What are the base abstractions?
  // You can mutate any item keys and it will update
  // So first feature is: can add items

  const toggleAll = () => {
    const allCompleted = items.every(item => item.completed)
    setAllCompleted(!allCompleted)
  }

  // How are items accessed?
  // Through iteration only

  // CRUD
  // Read only by listing all


  return Object.assign(Object.create(items) as Item[], {
    // I only need a method to set individual items
    // I could build useArray
    // It's a proxy that lets you get and set individual items

    // If you want to SET value of an item, using a mutable interface.

    // Not the top priority. Great to show off TS skills but get it working first.
    

    
  })
}

// ABSTRACTION
// useList
// Takes Interable<T>
// Return Iterable<StateBox<T>>
// Since it has multiple fields on the item, it's actually a store
// what kind of store?

// BETTER ABSTRACTION
// Instead of useList,
// Have the For component add funny methods to it
// On the other hand, we'd need both value and setter passed to For

export default function Home() {
  // const items = useItems()
  const [items, setItems] = useState<Item[]>([])
  const filterState = useFilterState()
  // filter out checked or unchecked dependig on filter state
  const filteredItems = items.filter( item =>
    filterState.value == 'Completed' &&  item.completed ||
    filterState.value == 'Active'    && !item.completed ||
    filterState.value == 'All'
  )
  // Start by allowing duplicate keys
  // If that fails, do some Set business

  // I should export this from useList
  // Not sure I need useCallback
  // Just write the function first
  // const addItem = 

  // ABSTRACTION
  // useState hook which gives you a function
  // (value, setter) => ({ item, setItem })
  // So you can still pick names but have them as object properties
  const [ editing, setEditing ] = useState<Item>()

  // I should be able to use item.delete()
  // and have that contain all the data needed to do so.


  const addItem: KeyboardEventHandler<HTMLInputElement> = ev => {
    const textInput = ev.target as HTMLInputElement
    if (!key('Enter').match(ev))
      return
    if (textInput.value == '')
      return

    setItems([...items, Item(textInput.value)])
    textInput.value = ''
  }

  // const setAllCompleted = (completed: boolean) =>
  //   items.forEach(item => item.completed = completed)

  const setAllCompleted = (completed: boolean) =>
    setItems(items.map(item => ({ ...item, completed })))

  // Should be able to call complete() on an item and have it update state

  const toggleAll = () => {
    const allCompleted = items.every(item => item.completed)
    setAllCompleted(!allCompleted)
  }

  
  const updateItem = (index: number) => (event: any) => {
    if (event.key && !key('Enter').match(event))
      return
    setItems(items.toSpliced(index, 1, { ...items[index], text: event.target.value }))
    setEditing(undefined)
  }

  const getIndex = (item: Item) =>
    items.findIndex(item2 => item2.key === item.key)

  return (
    <main>
      <h1>todos</h1>

      <button className="toggleAll" onClick={toggleAll}>V</button>
      <input
        type="text" autoFocus
        className="addItem"
        placeholder="What needs to be done?"
        onKeyDown={addItem}
      />

      <For each={filteredItems} reverse>{ (item, index) =>
        <div className="item" key={item.key}>
          <input type="checkbox"
            checked={item.completed}
            onChange={ev => setItems(items.toSpliced(index, 1, { ...item, completed: ev.target.checked }))}
          />
          <Show if={item === editing}
            then={<input
              className="text"
              defaultValue={item.text}
              onKeyDown={updateItem(index)}
              onBlur={updateItem(index)} />}
            else={
              <div
                className="text"
                onMouseDown={() => setEditing(item)}
              >{item.text}</div>}
          />
          <button className="delete" onClick={() => setItems(items.toSpliced(getIndex(item), 1))}>X</button>
        </div>}
      </For>
    
      <Show if={items.length}>
        <div>
          <div>{items.length} items left</div>
          <Filter state={filterState} />
          <button onClick={() => setItems(items.filter(item => !item.completed))}>Clear completed</button>
        </div>
      </Show>

      {/* catch all keystrokes */}
    </main>
  )
}

// Add tests


// Another abstraction
// Surely we could have an Iterator / Generator that knows how to efficiently update when a list item is changed
// This sounds like a job for Proxies or mapped property descriptors

class ArrayState extends Array {
  // Trying to 
}

// Would like this to accept Iterator
function useList<T extends object>(...initialState: T[]) {
  const [list, setList] = useState<T[]>(initialState)
  return new Proxy(list, {

  })
  // I need a proxy for every item, not the whole list
  // When item is added, convert to proxy
}

// Every item has getter / setter to setState on get / set
// How do you transform an object to a proxy of it?
