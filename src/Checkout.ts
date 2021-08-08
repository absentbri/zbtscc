/* eslint no-case-declarations: "off" */
import Item from './Models/Item'
import LineItem from './Models/LineItem'
import Rule from './Models/Rule'

import products from './Configs/Products'

export default class Checkout {
  private readonly rules: Rule[]
  private readonly products: Item[]

  private readonly scanned: LineItem[] = []

  constructor (rules: Rule[]) {
    this.rules = rules
    this.products = products
  }

  public scan (sku: string): void {
    // does this item already exist
    const lineItem = this.scanned.find(v => v.sku === sku)
    if (lineItem != null) {
      lineItem.quantity += 1
      return
    }
    // item does not already exist, add
    const scannedItem = this.getItem(sku)
    if (scannedItem != null) {
      this.scanned.push({ ...scannedItem, quantity: 1, discount: 0 })
    }
  }

  public total (): number {
    let total = 0
    for (const scan of this.scanned) {
      const rule = this.getRule(scan.sku)
      switch (rule?.type) {
        case 'MOQ':
          // Minimum Order Quantity
          if (scan.quantity > rule.quantity) {
            // discount all line items by discount value
            scan.discount = rule.discount * scan.quantity
          }
          break
        case 'XFORY':
          // Buy X Get Y For Free
          const claims = Math.floor(scan.quantity / rule.quantity)
          if (claims > 0) {
            // discount x by y, could limit 1 x per customer with a limit rule...
            scan.discount = (rule.discount * claims) * scan.price
          }
          break
      }
      total += scan.price * scan.quantity - scan.discount
    }
    return total
  }

  private getItem (sku: string): Item | undefined {
    return this.products.find(v => v.sku === sku)
  }

  private getRule (sku: string): Rule | undefined {
    return this.rules.find(r => r.sku === sku)
  }
}
