import Rule from '../Models/Rule'

/*
  sku:      item identifier to add discount rules for
  type:     type of discount (MOQ: minimum order quantity, or XFORY: Buy X Get Y Free)
  quantity: minimum order quantity for discounts to apply
  discount: amount to discount (MOQ:value or XFORY:qty)
*/

const rules: Rule[] = [
  {
    sku: 'atv',
    type: 'XFORY',
    quantity: 3,
    discount: 1
  },
  {
    sku: 'ipd',
    type: 'MOQ',
    quantity: 4,
    discount: 50
  }
]

export default rules
