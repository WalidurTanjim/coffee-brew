import { getSingleCoffeeById } from "@/actions/server/coffee";

const CoffeeDetails = async({ params }) => {
     const { id } = await params;
     const coffee = await getSingleCoffeeById(id);
     // console.log("Coffee by id:", coffee);

     return (
          <div className='defaultWidth'>
               <h1 className="text-2xl font-medium">Coffee details</h1>
          </div>
     )
}

export default CoffeeDetails
