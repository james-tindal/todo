'use client'
import { Filter, useFilterState } from "@/components/Filter"
import { For } from "@/components/For"
import { Show } from "@/components/Show"
import { Item, useItems } from "@/misc/items"
import { key } from "@/misc/key-chords"
import { KeyboardEventHandler, useState } from "react"


export default function Home() {
  const items = useItems()
  const filterState = useFilterState(items)
  const [ editing, setEditing ] = useState<Item>()

  const addItem: KeyboardEventHandler<HTMLInputElement> = ev => {
    const textInput = ev.target as HTMLInputElement

    if (!key('Enter').match(ev))
      return
    if (textInput.value == '')
      return

    items.add(textInput.value)
    textInput.value = ''
  }
  
  const updateItem = (item: Item) => (event: any) => {
    if (event.key && !key('Enter').match(event))
      return
    item.text = event.target.value
    setEditing(undefined)
  }

  return (
    <main>
      <h1>todos</h1>

      <button className="toggleAll" onClick={items.toggleAll}>V</button>
      <input
        type="text" autoFocus
        className="addItem"
        placeholder="What needs to be done?"
        onKeyDown={addItem}
      />

      <For each={filterState.items} reverse>{ item =>
        <div className="item" key={item.key}>
          <input type="checkbox"
            checked={item.completed}
            onChange={ev => item.completed = ev.target.checked}
          />
          <Show if={item === editing}
            then={<input
              className="text"
              defaultValue={item.text}
              onKeyDown={updateItem(item)}
              onBlur={updateItem(item)} />}
            else={
              <div
                className="text"
                onMouseDown={() => setEditing(item)}
              >{item.text}</div>}
          />
          <button className="delete" onClick={item.delete}>X</button>
        </div>}
      </For>
    
      <Show if={items.size}>
        <div className="bottom-row">
          <div className="items-left">{items.active().size} item{items.active().size == 1 ? '' : 's'} left</div>
          <Filter state={filterState} />
          <button onClick={items.clearCompleted}>Clear completed</button>
        </div>
      </Show>

      {/* catch all keystrokes */}
    </main>
  )
}

// Add tests
