import React from 'react';
import { ShoppingBagIcon, HeartIcon, EyeIcon, StarIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';

const CoffeeCard = ({ coffee }) => {
     const { _id, name, image, description, type, roast_level, flavor_notes, variants, origin, rating, is_organic, decaf } = coffee;

     // Get the smallest package price for display
     const startingPrice = variants?.length > 0 ? Math.min(...variants.map(v => v.price)) : null;

     // Truncate description if needed
     const shortDescription = description?.length > 120 ? `${description.substring(0, 55)}...` : description;

     return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
               {/* Image */}
               <div className="relative aspect-4/3 overflow-hidden bg-gray-50">
                    <Image src={image} alt={name} width={150} height={250} className="w-full h-full object-cover" loading="lazy" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                         {is_organic && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-700 rounded-full border border-gray-200"><CheckBadgeIcon className="h-3.5 w-3.5 text-green-600" />Organic</span>
                         )}
                         {decaf && (
                              <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-700 rounded-full border border-gray-200">Decaf</span>
                         )}
                    </div>

                    {/* Rating */}
                    {rating && (
                         <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-gray-200">
                              <StarIcon className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                              <span className="text-sm font-medium text-gray-700">{rating}</span>
                         </div>
                    )}
               </div>

               {/* Content */}
               <div className="p-4 flex-1 flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                         <div>
                              <h3 className="text-base font-semibold text-gray-900 leading-tight">{name}</h3>

                              <div className="flex items-center gap-2 mt-0.5">
                                   <span className="text-xs text-gray-500">{type}</span>
                                   <span className="w-1 h-1 rounded-full bg-gray-300" />
                                   <span className="text-xs text-gray-500">{roast_level}</span>
                              </div>
                         </div>
                    </div>

                    {/* Origin */}
                    <p className="text-xs text-gray-500 mt-1">{origin}</p>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mt-2 flex-1">{shortDescription}</p>

                    {/* Flavor Notes */}
                    {flavor_notes && flavor_notes.length > 0 && (
                         <div className="flex flex-wrap gap-1.5 mt-3">
                              {flavor_notes.slice(0, 3).map((note, index) => (
                                   <span key={index} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">{note}</span>
                              ))}

                              {flavor_notes.length > 3 && (
                                   <span className="px-2 py-0.5 text-xs text-gray-400">+{flavor_notes.length - 3}</span>
                              )}
                         </div>
                    )}

                    {/* Price */}
                    <div className="mt-4 pt-3 border-t border-gray-100">
                         <div className="flex items-end justify-between">
                              <div>
                                   {startingPrice && (
                                        <>
                                             <span className="text-xl font-medium text-gray-900">
                                                  ${startingPrice.toFixed(2)}
                                             </span> <br />
                                             <span className="text-xs text-gray-400 ml-1">starting from</span>
                                        </>
                                   )}
                              </div>

                              <div className="flex items-center gap-1.5">
                                   {/* Wishlist Button */}
                                   <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors" aria-label="Add to wishlist"><HeartIcon className="h-5 w-5" /></button>

                                   {/* View Details Button */}
                                   <Link href={`/coffee/${_id}`}>
                                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors" aria-label="View details"><EyeIcon className="h-5 w-5" /></button>
                                   </Link>

                                   {/* Add to Cart Button */}
                                   <button className="p-2 text-white bg-gray-800 hover:bg-gray-700 rounded-full transition-colors" aria-label="Add to cart"><ShoppingBagIcon className="h-5 w-5" /></button>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default CoffeeCard;