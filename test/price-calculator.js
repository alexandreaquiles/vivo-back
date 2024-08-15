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
    // ?????

  });

});