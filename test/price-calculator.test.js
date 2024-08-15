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

});