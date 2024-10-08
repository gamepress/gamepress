import { useEffect, useState } from "react";

import { json } from "@remix-run/node";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import type { ShouldRevalidateFunctionArgs } from "@remix-run/react";
import { Link, Outlet, useLoaderData, useLocation } from "@remix-run/react";

import { getSiteSlug } from "~/routes/_site+/_utils/getSiteSlug.server";
import * as gtag from "~/utils/gtags.client";
import { useIsBot } from "~/utils/isBotProvider";
import { ColumnOne } from "~/routes/_site+/_components/Column-1";
import { MobileHeader } from "~/routes/_site+/_components/MobileHeader";
import { SiteHeader } from "~/routes/_site+/_components/SiteHeader";
import { fetchSite } from "~/routes/_site+/_utils/fetchSite.server";
import Wave from "react-wavify";
import { Image } from "~/components/Image";

export { ErrorBoundary } from "~/components/ErrorBoundary";

export async function loader({
   context: { payload, user },
   request,
}: LoaderFunctionArgs) {
   const { siteSlug } = await getSiteSlug(request, payload, user);

   const site = await fetchSite({ siteSlug, user, request, payload });

   return await json({ site });
}

export default function SiteLayout() {
   const { site } = useLoaderData<typeof loader>() || {};
   const isBot = useIsBot();

   const [isPrimaryMenu, setPrimaryMenuOpen] = useState(false);

   const adWebId = site?.adWebId;
   const gaTrackingId = site?.gaTagId;
   const enableAds = site?.enableAds;

   return (
      <>
         {process.env.NODE_ENV === "production" && !isBot && gaTrackingId && (
            <GAScript gaTrackingId={gaTrackingId} />
         )}
         <MobileHeader />
         <main
            className="laptop:grid laptop:min-h-screen 
           laptop:grid-flow-col laptop:auto-cols-[70px_1fr] max-laptop:border-b max-laptop:border-color"
         >
            <ColumnOne />
            <section className="bg-3 w-full min-h-screen flex flex-col">
               <SiteHeader
                  isPrimaryMenu={isPrimaryMenu}
                  setPrimaryMenuOpen={setPrimaryMenuOpen}
               />
               <div
                  className="flex-grow max-laptop:py-20 flex items-center relative bg-gradient-to-t from-amber-50 
                  to-white dark:from-gray-900 dark:to-gray-800"
               >
                  <div className="mx-auto w-full p-4 laptop:max-w-[800px]">
                     <div className="flex flex-col justify-center items-center gap-4">
                        <div className="flex items-center pb-4">
                           <Image
                              className="h-8 tablet:h-10 hidden dark:block"
                              url="https://static.mana.wiki/Type_white.png"
                           />
                           <Image
                              className="h-8 tablet:h-10 dark:hidden"
                              url="https://static.mana.wiki/Type_indigo.png"
                           />
                        </div>
                        <div className="inline-grid grid-cols-1 gap-4 tablet:grid-cols-3">
                           <Link
                              to="https://pokemongo.gamepress.gg"
                              className="rounded-xl dark:border-gray-700 dark:shadow-black/50 border-2 dark:bg-gray-900 p-2.5 tablet:p-4 text-center shadow-sm 
                           transition dark:hover:shadow-gray-700 flex tablet:flex-col items-center gap-2 max-tablet:w-[300px] bg-zinc-50"
                           >
                              <Image
                                 className="border-color-sub size-8 tablet:size-12 rounded-full border"
                                 width={100}
                                 height={100}
                                 alt="Pokémon GO"
                                 url="https://static.mana.wiki/-8ohTeMi_400x400-1.jpg"
                              />
                              <div className="truncate text-sm font-bold dark:text-white">
                                 Pokémon GO
                              </div>
                           </Link>
                           <Link
                              to="https://grandorder.gamepress.gg"
                              className="rounded-xl dark:border-gray-700 dark:shadow-black/50 border-2 dark:bg-gray-900 p-2.5 tablet:p-4 text-center shadow-sm 
                           transition dark:hover:shadow-gray-700 flex tablet:flex-col items-center gap-2 max-tablet:w-[300px] bg-zinc-50"
                           >
                              <Image
                                 className="border-color-sub size-8 tablet:size-12 rounded-full border"
                                 width={100}
                                 height={100}
                                 alt="Fate Grand Order"
                                 url="https://static.mana.wiki/site-zpFYi1LLOtg76h5k4nZyQ.png"
                              />
                              <div className="truncate text-sm font-bold dark:text-white">
                                 Fate Grand Order
                              </div>
                           </Link>
                           <Link
                              to="https://ak.gamepress.gg"
                              className="rounded-xl dark:border-gray-700 dark:shadow-black/50 border-2 dark:bg-gray-900 p-2.5 tablet:p-4 text-center shadow-sm 
                           transition dark:hover:shadow-gray-700 flex tablet:flex-col items-center gap-2 max-tablet:w-[300px] bg-zinc-50"
                           >
                              <Image
                                 className="border-color-sub size-8 tablet:size-12 rounded-full border"
                                 width={100}
                                 height={100}
                                 alt="Arknights"
                                 url="https://static.mana.wiki/siteIcon-ra4gMrpGBOym7gIPcEoH-.jpeg"
                              />
                              <div className="truncate text-sm font-bold dark:text-white">
                                 Arknights
                              </div>
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="w-full dark:bg-gray-900 bg-amber-50 relative z-50">
                  <div className="relative mx-auto laptop:max-w-screen-tablet">
                     <div className="absolute left-1/4 transform -translate-x-1/2 -top-4 tablet:-top-16 z-20 rotate-[5deg]">
                        <Image
                           className="h-40 tablet:h-52 swingimage1"
                           alt="Narwhale Party"
                           url="https://static.mana.wiki/Nalu_party.png"
                        />
                     </div>
                     <div className="absolute right-1/4 transform translate-x-1/2 top-4 tablet:-top-3 z-50 rotate-[5deg]">
                        <Image
                           className="h-40 tablet:h-52 swingimage2"
                           alt="Narwhale Developer"
                           url="https://static.mana.wiki/Nalu_developer.png"
                        />
                     </div>
                  </div>
                  <div className="relative h-[244px] w-full">
                     <Wave
                        className="absolute left-0 -top-4 z-10 h-44 w-full text-teal-200 dark:text-cyan-900"
                        fill="currentColor"
                        paused={false}
                        options={{
                           amplitude: 40,
                           speed: 0.2,
                           points: 4,
                        }}
                     />
                     <Wave
                        className="absolute left-0 top-12 z-30 h-40 w-full text-teal-100 text-opacity-70
                     dark:text-slate-900 dark:text-opacity-80"
                        fill="currentColor"
                        paused={false}
                        options={{
                           amplitude: 30,
                           speed: 0.2,
                           points: 5,
                        }}
                     />
                     <Wave
                        className="absolute bottom-0 z-50 h-32 w-full text-teal-50 dark:text-slate-900"
                        fill="currentColor"
                        paused={false}
                        options={{
                           amplitude: 20,
                           speed: 0.2,
                           points: 8,
                        }}
                     />
                  </div>
               </div>
               {/* <Outlet /> */}
            </section>
         </main>
      </>
   );
}

export function GAScript({ gaTrackingId }: { gaTrackingId: string }) {
   const location = useLocation();
   useEffect(() => {
      gtag.pageview(location.pathname, gaTrackingId);
   }, [location, gaTrackingId]);

   return (
      <>
         <script
            defer
            src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}
         />
         <script
            defer
            id="gtag-init"
            dangerouslySetInnerHTML={{
               __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', '${gaTrackingId}', {
      page_path: window.location.pathname,
    });
  `,
            }}
         />
      </>
   );
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
   return [
      {
         title: data?.site.name,
      },
   ];
};

// don't revalidate loader when url param changes
export function shouldRevalidate({
   currentUrl,
   nextUrl,
   formMethod,
   defaultShouldRevalidate,
}: ShouldRevalidateFunctionArgs) {
   return currentUrl.pathname === nextUrl.pathname && formMethod === "GET"
      ? false
      : defaultShouldRevalidate;
}
