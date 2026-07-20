import { getSingleCoffeeById } from "@/actions/server/coffee";
import { ShoppingCartIcon, HeartIcon, StarIcon, CheckCircleIcon, GlobeAltIcon, MapPinIcon, ArrowLeftIcon, BeakerIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

const CoffeeDetails = async ({ params }) => {
     const { id } = await params;
     const coffee = await getSingleCoffeeById(id);

     return (
          <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
               {/* Back Button */}
               <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6">
                    <ArrowLeftIcon className="h-5 w-5" />
                    <span>Go back</span>
               </button>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Image */}
                    <div className="space-y-4">
                         <div className="aspect-square rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
                              <img src={coffee.image} alt={coffee.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                         </div>

                         {/* Quick Info Badges */}
                         <div className="flex flex-wrap gap-2">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{coffee.type}</span>

                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{coffee.roast_level} Roast</span>

                              {coffee.is_organic && (
                                   <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        <ShieldCheckIcon className="h-3 w-3 mr-1" />Organic</span>
                              )}
                              {coffee.decaf && (
                                   <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Decaf</span>
                              )}
                         </div>
                    </div>

                    {/* Right Column - Details */}
                    <div className="space-y-6">
                         {/* Header */}
                         <div>
                              <div className="flex items-start justify-between">
                                   <h1 className="text-3xl font-bold text-gray-900">{coffee.name}</h1>
                                   <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                        <HeartIcon className="h-6 w-6 text-gray-600 hover:text-red-600" />
                                   </button>
                              </div>

                              {/* Rating */}
                              <div className="flex items-center gap-2 mt-2">
                                   <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                             <StarIcon key={i}className={`h-5 w-5 ${i < Math.floor(coffee.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}/>
                                        ))}
                                   </div>
                                   <span className="text-sm font-medium text-gray-700">{coffee.rating}</span>
                                   <span className="text-sm text-gray-500">• {coffee.stock} in stock</span>
                              </div>
                         </div>

                         {/* Description */}
                         <p className="text-gray-700 leading-relaxed border-l-4 border-gray-200 pl-4">{coffee.description}</p>

                         {/* Origin Info */}
                         <div className="grid grid-cols-2 gap-3 bg-gray-50 rounded-lg p-4">
                              <div className="flex items-center gap-2 text-sm">
                                   <MapPinIcon className="h-4 w-4 text-gray-500" />
                                   <span className="text-gray-700">{coffee.origin}</span>
                              </div>

                              <div className="flex items-center gap-2 text-sm">
                                   <GlobeAltIcon className="h-4 w-4 text-gray-500" />
                                   <span className="text-gray-700">{coffee.processing}</span>
                              </div>

                              <div className="flex items-center gap-2 text-sm">
                                   <span className="text-gray-500">Altitude:</span>
                                   <span className="text-gray-700">{coffee.altitude}</span>
                              </div>

                              <div className="flex items-center gap-2 text-sm">
                                   <span className="text-gray-500">Author:</span>
                                   <span className="text-gray-700">{coffee.author.name}</span>
                              </div>
                         </div>

                         {/* Flavor Notes */}
                         <div>
                              <h3 className="text-sm font-semibold text-gray-700 mb-2">Flavor Notes</h3>
                              <div className="flex flex-wrap gap-2">
                                   {coffee.flavor_notes.map((note, index) => (
                                        <span key={index} className="px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-sm text-amber-800">{note}</span>
                                   ))}
                              </div>
                         </div>

                         {/* Brew Suggestions */}
                         <div>
                              <h3 className="text-sm font-semibold text-gray-700 mb-2">Brew Suggestions</h3>
                              <div className="flex flex-wrap gap-2">
                                   {coffee.brew_suggestions.map((method, index) => (
                                        <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-sm text-blue-800">
                                             <BeakerIcon className="h-3 w-3" />
                                             {method}
                                        </span>
                                   ))}
                              </div>
                         </div>

                         {/* Variants / Pricing */}
                         <div>
                              <h3 className="text-sm font-semibold text-gray-700 mb-3">Select Size</h3>
                              <div className="space-y-3">
                                   {coffee.variants.map((variant, index) => (
                                        <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors">
                                             <div>
                                                  <span className="font-medium text-gray-900">{variant.weight}</span>
                                                  <span className="ml-2 text-sm text-gray-500">({variant.stock} available)</span>
                                             </div>

                                             <div className="flex items-center gap-4">
                                                  <span className="text-lg font-semibold text-gray-900">${variant.price.toFixed(2)}</span>

                                                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm" disabled={variant.stock === 0}>
                                                       <ShoppingCartIcon className="h-4 w-4" />
                                                       Add to Cart
                                                  </button>
                                             </div>
                                        </div>
                                   ))}
                              </div>
                         </div>

                         {/* Last Updated */}
                         <div className="text-xs text-gray-400 pt-4 border-t border-gray-200">
                              Last updated: {new Date(coffee.updated_at).toLocaleDateString('en-US', {
                                   year: 'numeric',
                                   month: 'long',
                                   day: 'numeric',
                                   hour: '2-digit',
                                   minute: '2-digit'
                              })}
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default CoffeeDetails;
