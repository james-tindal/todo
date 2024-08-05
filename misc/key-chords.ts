
interface Chord {
  meta?: boolean
  ctrl?: boolean
  alt?: boolean
  shift?: boolean
  key: string
  match: (ev: React.KeyboardEvent) => boolean
}

class ChordBuilder {
  private constructor(private partial: Omit<Chord, 'key' | 'match'> = {}) {}

  key(key: string): Chord {
    const match = (ev: React.KeyboardEvent) =>
      ev.metaKey  === !!this.partial.meta  &&
      ev.ctrlKey  === !!this.partial.ctrl  &&
      ev.altKey   === !!this.partial.alt   &&
      ev.shiftKey === !!this.partial.shift &&
      ev.key      === key
    return { ...this.partial, key, match }
  }
  static key(key: string) {
    return new ChordBuilder().key(key)
  }

  static get meta() {
    return new ChordBuilder({ meta: true })
  }
  static get ctrl() {
    return new ChordBuilder({ ctrl: true })
  }
  static get alt() {
    return new ChordBuilder({ alt: true })
  }
  static get shift() {
    return new ChordBuilder({ shift: true })
  }

  get ctrl() {
    return new ChordBuilder({ ...this.partial, ctrl: true })
  }
  get alt() {
    return new ChordBuilder({ ...this.partial, alt: true })
  }
  get shift() {
    return new ChordBuilder({ ...this.partial, shift: true })
  }
}

export const key   = ChordBuilder.key
export const meta  = ChordBuilder.meta
export const ctrl  = ChordBuilder.ctrl  as Omit<ChordBuilder, 'ctrl'>
export const alt   = ChordBuilder.alt   as Omit<ChordBuilder, 'ctrl' | 'alt'>
export const shift = ChordBuilder.shift as Omit<ChordBuilder, 'ctrl' | 'alt' | 'shift'>
