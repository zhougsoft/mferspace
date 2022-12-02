export interface MferAttribute {
  trait_type: string
  value: string
}

export default interface Mfer {
  id: number
  name: string
  img: string
  attributes: MferAttribute[]
}
