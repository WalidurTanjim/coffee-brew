import { getAllCoffee } from "@/actions/server/coffee";
import CoffeeManageList from "./CoffeeManageList";

export const revalidate = 0;

export default async function ManageCoffeePage() {
     const coffees = await getAllCoffee();

     return (
          <div className="space-y-6">
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                         <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                              Coffee Inventory & Management
                         </h1>
                         <p className="text-sm text-slate-500">
                              View, search, edit, and delete coffee products in your shop database.
                         </p>
                    </div>
               </div>

               <CoffeeManageList initialCoffees={coffees || []} />
          </div>
     );
}
