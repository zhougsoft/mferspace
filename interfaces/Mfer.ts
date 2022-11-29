import MferAttribute from './MferAttribute'

export default interface Mfer {
  id: number
  name: string
  img: string
  attributes: MferAttribute[]
}
