declare module 'mfers' {
  import 'mfers'

  export interface MferColors {
    '4:20 watch': any
    background: any
    beard: any
    chain: any
    eyes: any
    'hat over headphones': any
    'hat under headphones': any
    headphones: any
    'long hair': any
    mouth: any
    shirt: any
    'short hair': any
    smoke: any
    type: any
  }

  // TODO: add trait-specific types like this for the rest of the traits
  type OneOfOne =
    | 'beep mfer'
    | 'bored mfer'
    | 'cbd mfer'
    | 'comic mfer'
    | 'cool mfer'
    | 'fidenz mfer'
    | 'gang mfer'
    | 'glyph mfer'

  export interface MferTraits {
    '1/1'?: OneOfOne
    '4:20 watch'?: string
    background?: string
    beard?: string
    chain?: string
    eyes?: string
    'hat over headphones'?: string
    'hat under headphones'?: string
    headphones?: string
    'long hair'?: string
    mouth?: string
    shirt?: string
    'short hair'?: string
    smoke?: string
    type?: string
  }

  export interface MferData {
    i: number
    traits: MferTraits
    colors: string[]
  }

  export const MFERS_CONTRACT: string
  export const colors: MferColors
  export const traits: MferTraits
  export const mfers: MferData[]
}
