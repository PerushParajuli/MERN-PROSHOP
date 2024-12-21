export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2); //we are rounding to 2 decimal places so .toFixed(2)
};

export const updateCart = (state) => {
  //calculate item price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0 //default value of the accumulator
    )
  );
  //calculate shipping price  -> if the order is over $100 then free else $10 shipping
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
  //calculate tax price -> 15% tax
  state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice).toFixed(2));

  //calculate total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state)); //save the entire state in the local storage

  return state;
};
