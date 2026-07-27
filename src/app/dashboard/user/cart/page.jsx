import { GetCartByEmail } from "@/actions/server/addToCart"
import CartSection from "@/components/(pages)/Dashboard/CartSection/CartSection";

const UserDashboardCart = async() => {
     const cartItems = await GetCartByEmail() || [];
     // console.log("Cart items from UserDashboardCart:", cartItems);

     return (
          <div className="defaultWidth">
               <CartSection cartItems={cartItems} />
          </div>
     )
}

export default UserDashboardCart
