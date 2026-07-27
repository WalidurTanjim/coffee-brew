"use client"

import { DeleteCartItemById } from '@/actions/server/addToCart';
import { TrashIcon} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import Swal from 'sweetalert2';

const DeleteCart = (id) => {
     const pathname = usePathname();
     
     const handleDelete = async() => {
          Swal.fire({
               title: "Are you sure?",
               text: "You won't be able to revert this!",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#3085d6",
               cancelButtonColor: "#d33",
               confirmButtonText: "Yes, delete it!"
          }).then(async(result) => {
               if (result.isConfirmed) {
                    
                    try{
                         const result = await DeleteCartItemById(id?.id, pathname);
                         
                         if(result?.success) {
                              Swal.fire({
                                   title: "Deleted!",
                                   text: result?.message,
                                   icon: "success"
                              });
                         }
                    }catch(err) {
                         console.log(err);
                    }
               }
          });

     }

     return (
          <button className="p-2 rounded-lg hover:bg-red-50 transition-colors duration-200" aria-label="Remove from cart" onClick={handleDelete}>
               <TrashIcon className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors" />
          </button>
     )
}

export default DeleteCart
