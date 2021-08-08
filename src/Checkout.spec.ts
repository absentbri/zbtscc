import Checkout from './Checkout'
import { expect } from 'chai'
import pricingRules from './Configs/Rules'

describe('Calculate Total', () => {

  let co: Checkout
  beforeEach(() => {
    co = new Checkout(pricingRules)
  })

  // examples from challenge
  it('Apply discount rule for atv, and expect total of 249.00', () => {
    // SKUs Scanned: atv, atv, atv, vga Total expected: $249.00
    co.scan('atv')
    co.scan('atv')
    co.scan('atv')
    co.scan('vga')

    expect(co.total()).equal(249.00)
  })

  it('Apply discount rule for ipd, and expect total of 2718.95', () => {
    //  SKUs Scanned: atv, ipd, ipd, atv, ipd, ipd, ipd Total expected: $2718.95
    co.scan('atv')
    co.scan('ipd')
    co.scan('ipd')
    co.scan('atv')
    co.scan('ipd')
    co.scan('ipd')
    co.scan('ipd')

    expect(co.total()).equal(2718.95)
  })

  // tests
  it('Calculates single non-rule line item, 30.00', () => {
    co.scan('vga')

    expect(co.total()).equal(30.00)
  })

  it('Calculates multiple non-rule line item, 90.00', () => {
    co.scan('vga')
    co.scan('vga')
    co.scan('vga')

    expect(co.total()).equal(90.00)
  })

  it('Calculates single MOQ rule line item, 549.99', () => {
    co.scan('ipd')

    expect(co.total()).equal(549.99)
  })

  it('Calculates multiple MOQ rule line item, 1649.97', () => {
    co.scan('ipd')
    co.scan('ipd')
    co.scan('ipd')

    expect(co.total()).equal(1649.97)
  })


  it('Calculates single XFORY rule line item, 109.50', () => {
    co.scan('atv')

    expect(co.total()).equal(109.50)
  })

  it('Calculates below XFORY rule line item, 219.00', () => {
    co.scan('atv')
    co.scan('atv')

    expect(co.total()).equal(219.00)
  })

  it('Calculates double XFORY rule line item, 438.00', () => {
    co.scan('atv')
    co.scan('atv')
    co.scan('atv')
    co.scan('atv')
    co.scan('atv')
    co.scan('atv')


    expect(co.total()).equal(438.00)
  })

})
