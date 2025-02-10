import CartItem from "./cart-items"

export default function CartList({ cartItems }) {
  return (
    <div className="row row-cols-1">
      {cartItems.map((item, index) => (
        <div className="col" key={index}>
          <CartItem item={item} />
        </div>
      ))}
    </div>
  )
}
