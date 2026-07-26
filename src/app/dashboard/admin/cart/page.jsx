import { GetCartByEmail } from '@/actions/server/addToCart';
import Cart from '@/components/(pages)/Dashboard/Cart/Cart';

const AdminDashboardCart = async() => {
     const cartItems = await GetCartByEmail() || [];

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

export default AdminDashboardCart
