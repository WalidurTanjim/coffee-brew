import { getAllCoffee } from "@/actions/server/coffee"
import CoffeeCard from "@/components/cards/CoffeeCard/CoffeeCard"

const CoffeePage = async() => {
     const coffees = await getAllCoffee();
     // console.log("All coffees:", coffees);

     return (
          <div className="defaultWidth">
               <h1 className="text-2xl font-medium">Coffee page</h1>

               <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-10">
                    {
                         coffees.map((coffee, idx) => <CoffeeCard key={idx} coffee={coffee} />)
                    }
               </div>
          </div>
     )
}

export default CoffeePage
