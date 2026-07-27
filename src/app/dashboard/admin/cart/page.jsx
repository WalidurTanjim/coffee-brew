import { GetCartByEmail } from '@/actions/server/addToCart';
import CartSection from '@/components/(pages)/Dashboard/CartSection/CartSection';

const AdminDashboardCart = async() => {
     const cartItems = await GetCartByEmail() || [];

     return (
          <div className="defaultWidth">
               <CartSection cartItems={cartItems} />
          </div>
     )
}

export default AdminDashboardCart
