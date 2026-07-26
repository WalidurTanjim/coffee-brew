import { GetCartByEmail } from "@/actions/server/addToCart"
import Cart from "@/components/(pages)/Dashboard/Cart/Cart"

const UserDashboardCart = async() => {
     const cartItems = await GetCartByEmail() || [];
     // console.log("Cart items from UserDashboardCart:", cartItems);

     return (
          <div className="defaultWidth">
               <div>
                    {
                         cartItems?.cartItems.map(item => <Cart key={item?._id} item={item} />)
                    }
               </div>
          </div>
     )
}

export default UserDashboardCart
