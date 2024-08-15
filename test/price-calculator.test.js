import { calculateAnnualPrice } from '../price-calculator.js';
import { expect } from 'chai';

describe('Annual price calculator', () => {

  it('should calculate annual price without offer', () => {

    // arrange
    const plan = {
      title: "1 Giga",
      price: 500
    };

    // act
    const annualPrice = calculateAnnualPrice(plan);

    // assert
    expect(annualPrice).to.equal(6000); // 500 * 12 = 6000

  });

  it('should handle plans with different prices', () => {
    const plan = {
      title: "2 Gigas",
      price: 750
    };
    const annualPrice = calculateAnnualPrice(plan);
    expect(annualPrice).to.equal(9000); // 750 * 12 = 9000
  });

  it('should calculate annual price with offer for 3 months', () => {
    const plan = {
      title: "500 Mega",
      monthlyPrice: 120,
      offer: 30
    };
    const annualPrice = calculateAnnualPrice(plan);
    expect(annualPrice).to.equal(1350); // (90 * 3) + (120 * 9) 
                                        // = 270 + 1080 = 1350
  });

});