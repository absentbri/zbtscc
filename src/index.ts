import Checkout from './Checkout'
import pricingRules from './Configs/Rules'

const co = new Checkout(pricingRules)

co.scan('ipd')
co.scan('ipd')
co.scan('ipd')
co.scan('ipd')
co.scan('ipd')

console.log(co.total())
