"use client"
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";

const AddToCartTextButton = ({ variant, coffee }) => {
     // console.log({ variant, coffee });
     let isLoggedIn = false;
     const pathname = usePathname();
     const router = useRouter();
     
     // handleAddToCart
     const handleAddToCart = async() => {
          if(isLoggedIn){
               alert(JSON.stringify(variant))
          }else{
               router.push(`/auth/signin?callbackUrl=${pathname}`);
          }
     }

     return (
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm" disabled={variant.stock === 0} onClick={handleAddToCart}>
               <ShoppingCartIcon className="h-4 w-4" />
               Add to Cart
          </button>
     )
}

export default AddToCartTextButton
