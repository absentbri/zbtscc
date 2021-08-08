import Item from './Item'

export default interface LineItem extends Item {
  quantity: number
  discount: number
}
