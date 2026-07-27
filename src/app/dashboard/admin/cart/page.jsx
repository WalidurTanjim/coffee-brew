import { GetCartByEmail } from '@/actions/server/addToCart';
import CartSection from '@/components/(pages)/Dashboard/CartSection/CartSection';

const AdminDashboardCart = async() => {
     const cartItems = await GetCartByEmail() || [];

     return (
          <div className="defaultWidth">
               <div>
                    <CartSection cartItems={cartItems} />
               </div>
          </div>
     )
}

export default AdminDashboardCart
