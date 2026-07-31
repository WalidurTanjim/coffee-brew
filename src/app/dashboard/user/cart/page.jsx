import { GetCartByEmail } from "@/actions/server/addToCart";
import CartSection from "@/components/(pages)/Dashboard/CartSection/CartSection";

export const revalidate = 0;

const UserDashboardCart = async () => {
     const cartItems = (await GetCartByEmail()) || [];

     return (
          <div className="space-y-6">
               <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                         My Shopping Cart
                    </h1>
                    <p className="text-sm text-slate-500">
                         Review items in your cart, adjust quantities, or proceed to checkout.
                    </p>
               </div>

               <CartSection cartItems={cartItems} />
          </div>
     );
};

export default UserDashboardCart;
