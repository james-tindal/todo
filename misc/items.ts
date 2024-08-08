import { DispatchWithoutAction } from 'react'
import { useMutable } from '@/misc/useMutable'
import { dispatchClassMethods, dispatchMutations } from '@/misc/dispatch-utils'
import { bind } from '@/misc/bind-decorator'


export class Item {
  key = Date.now()
  completed = false
  constructor(
    public text: string,
    dispatch: DispatchWithoutAction,
    private delete_: () => void
  ) {
    dispatchMutations(this, dispatch)
  }

  @bind
  delete() {
    this.delete_()
  }
}


export class Items {
  private set = new DispatchSet<Item>(this.dispatch)
  public *[Symbol.iterator]() {
    for (const member of this.set)
      yield member
  }

  constructor(
    private dispatch: DispatchWithoutAction
  ) {}

  add(text: string) {
    const item = new Item(text, this.dispatch, () => this.set.delete(item))
    this.set.add(item)
  }
  completed() {
    return new Set(Iterator.from(this.set).filter(item => item.completed))
  }
  active() {
    return new Set(Iterator.from(this.set).filter(item => !item.completed))
  }
  setCompleted(completed: boolean) {
    for (const item of this)
      item.completed = completed
  }
  every(predicate: (item: Item, index: number) => unknown) {
    return Iterator.from(this.set).every(predicate)
  }
  get size() { return this.set.size }
  
  @bind
  clearCompleted() {
    for (const item of this)
      if (item.completed)
        item.delete()
  }

  @bind
  toggleAll() {
    const allCompleted = this.every(item => item.completed)
    this.setCompleted(!allCompleted)
  }
}

@dispatchClassMethods('add', 'delete', 'clear')
class DispatchSet<T> extends Set<T> {
  constructor(
    private dispatch: DispatchWithoutAction,
    values?: readonly T[] | null
  ) {
    super(values)
  }
}

export const useItems = () => useMutable(dispatch => new Items(dispatch))
