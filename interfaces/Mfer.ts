import type { MferData } from 'mfers'

export default interface Mfer extends MferData {
  id: MferData['i']
  img: string
}
