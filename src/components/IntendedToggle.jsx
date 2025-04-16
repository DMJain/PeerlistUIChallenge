import { useState } from "react"

const liquidEasing = "cubic-bezier(0.68, -0.55, 0.27, 1.55)";

export default function PlanToggle() {
 const [isPaid, setIsPaid] = useState(false)
 const [isAnnual, setIsAnnual] = useState(false)
 
 return (
     <div className="bg-white rounded-xl shadow-[0_0_15px_0px_rgba(0,0,0,0.10)] p-8 w-full max-w-md">
       <div className="relative mb-10">
         <div
           className={`relative bg-white rounded-full h-18 w-96 cursor-pointer mx-auto overflow-hidden flex items-center shadow-[0_0_20px_3px_rgba(0,255,127,0.22)]`}
           onClick={(e) => {
             const target = e.target;
             const rect = target.closest(`.bg-white`)?.getBoundingClientRect();
             if (!rect) return;
             const isClickOnNested = !!target.closest(".nested-toggle");
             if (isClickOnNested) return;
             const clickX = e.clientX - rect.left;
             const isClickOnRightSide = clickX > rect.width / 2;
             if (isClickOnRightSide && !isPaid) {
                 setIsPaid(true);
             } else if (!isClickOnRightSide && isPaid) {
                 setIsPaid(false);
             }
           }}
           role="switch"
           aria-checked={isPaid}
           aria-label="Plan type toggle: Free or Paid"
         >
           <div
             className={`absolute top-1 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 z-10
                        transition-all duration-300 ease-out
                        w-[calc(50%-2px)] // Set width directly
                        ${isPaid ? 'left-[calc(50%+1px)]' : 'left-[1px]'}`
                      }
                      style={{ transitionTimingFunction: liquidEasing }}
           />
           <div className="relative flex h-full items-center w-full z-20">
             <div
               className={`flex-1 flex items-center justify-center transition-colors duration-200 ease-in-out font-semibold ${
                 isPaid ? "text-black" : "text-black"
               }`}
               onClick={() => setIsPaid(false)}
             >
               Free
             </div>
             <div
               className={`flex-1 flex items-center justify-center transition-colors duration-200 ease-in-out font-semibold`}
               onClick={() => {if (!isPaid) setIsPaid(true)}}
             >
               {!isPaid ? (
                 <span className="text-black">Paid</span>
               ) : (
                 <div
                   className={`nested-toggle relative rounded-full h-16 w-46 cursor-pointer`}
                   onClick={(e) => {
                     e.stopPropagation()
                     const target = e.target;
                     const rect = target.closest('.nested-toggle')?.getBoundingClientRect();
                      if (!rect) return;
                      const clickX = e.clientX - rect.left;
                      const isClickOnRightSide = clickX > rect.width / 2;


                      if (isClickOnRightSide && !isAnnual) {
                          setIsAnnual(true);
                      } else if (!isClickOnRightSide && isAnnual) {
                          setIsAnnual(false);
                      }
                   }}
                   role="switch"
                   aria-checked={isAnnual}
                   aria-label="Billing cycle toggle: Monthly or Annually"
                 >
                   <div
                     className={`absolute h-14 top-1 rounded-full bg-white shadow-sm z-10
                                transition-all duration-300 ease-out
                                w-[calc(50%-3px)]
                                ${isAnnual ? 'left-[calc(50%+1px)]' : 'left-[2px]'}`
                              }
                              style={{ transitionTimingFunction: liquidEasing }}
                   />
                   <div className="relative flex h-full items-center">
                     <div
                       className={`flex-1 flex items-center justify-center z-20 text-xs font-medium transition-colors duration-200 ease-in-out ${
                         isAnnual ? "text-black" : "text-gray-800"
                       }`}
                        onClick={(e) => {e.stopPropagation(); setIsAnnual(false)}}
                     >
                       Monthly
                     </div>
                     <div
                       className={`flex-1 flex items-center justify-center z-20 text-xs font-medium transition-colors duration-200 ease-in-out ${
                         !isAnnual ? "text-black" : "text-gray-800"
                       }`}
                        onClick={(e) => {e.stopPropagation(); setIsAnnual(true)}}
                     >
                       Annually
                     </div>
                   </div>
                 </div>
               )}
             </div>
           </div>
         </div>
       </div>
       <div className="text-center text-slate-700">
         <p className="text-lg font-medium">Selected Plan:</p>
         <p className="text-xl font-bold text-slate-800 mt-1">
           {/* Dynamically display plan name based on state */}
           {!isPaid ? "Free Plan" : `Paid (${isAnnual ? "Annually" : "Monthly"})`}
         </p>
       </div>
     </div>
 )
}
