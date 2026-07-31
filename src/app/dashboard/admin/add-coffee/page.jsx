import AddCoffeeForm from "./AddCoffeeForm";

export default function AddCoffeePage() {
     return (
          <div className="space-y-6">
               <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                         Add New Coffee Product
                    </h1>
                    <p className="text-sm text-slate-500">
                         Create a new coffee item to display on the storefront and allow users to purchase.
                    </p>
               </div>

               <AddCoffeeForm />
          </div>
     );
}
