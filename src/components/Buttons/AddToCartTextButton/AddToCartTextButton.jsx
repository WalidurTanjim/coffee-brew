"use client"
import { AddToCart } from "@/actions/server/addToCart";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';

const AddToCartTextButton = ({ variant, coffee }) => {
     // console.log({ variant, coffee });
     const user = useSession();
     const pathname = usePathname();
     const router = useRouter();
     
     // handleAddToCart
     const handleAddToCart = async() => {
          if(user?.status === 'authenticated'){
               // alert(JSON.stringify(variant))
               const res = await AddToCart(variant, coffee);
               
               if(!res?.success) {
                    toast.error(res?.message)
               }

               if(res?.insertedId) {
                    toast.success(res?.message);
               }
          }else{
               router.push(`/auth/signin?callbackUrl=${pathname}`);
          }
     }

     return (
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm" disabled={variant.stock === 0} onClick={handleAddToCart}>
               <ShoppingCartIcon className="h-4 w-4" />
               Add to Cart
               <Toaster />
          </button>
     )
}

export default AddToCartTextButton
