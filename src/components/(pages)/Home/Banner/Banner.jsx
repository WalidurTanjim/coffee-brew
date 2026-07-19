import Image from "next/image";

const Banner = () => {
     return (
          <div className='banner relative w-full h-[70vh] overflow-hidden'>
               <Image alt="Banner image" src={`/assets/images/banner/banner.jpg`} width={1000} height={550} className="w-full h-137.5" />

               <div className="absolute inset-0 bg-black/20" />

               {/* Text content */}
               <div className="absolute inset-0 flex flex-col justify-center text-white w-full">
                    <div className="mx-auto w-full max-w-7xl px-2 sm:px-5 lg:px-8">
                         <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-4">Welcome to <span className="text-amber-700">Coffee Brew</span></h1>

                         <p className="text-lg md:text-xl lg:text-2xl max-w-2xl mb-4">Discover amazing products at great prices</p>

                         <button className="px-7 py-2 border border-gray-300 rounded-md text-white hover:bg-black/60 hover:ring-2 ring-slate-600 active:bg-transparent">Shop Now</button>
                    </div>
               </div>
          </div>
     )
}

export default Banner;
