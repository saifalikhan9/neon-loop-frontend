type AdditionalCharges = {
  tax: number;
  shippingCharge: number;
  readonly totalAmount: number;
};

export function additionalCargesfn(total: number): AdditionalCharges {
  const additionalCarges = {
    tax: total * 0.01,
    shippingCharge: 100,
    get totalAmount() {
      return total + this.tax + this.shippingCharge;
    },
  };
  return additionalCarges;
}
