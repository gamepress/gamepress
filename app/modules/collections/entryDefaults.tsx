import type { Params } from "@remix-run/react";
import type { Request, V2_MetaFunction } from "@remix-run/node";
import { z } from "zod";
import { zx } from "zodix";
import type { Payload } from "payload";

export const getDefaultEntryData = async ({
   payload,
   params,
}: {
   payload: Payload;
   params: Params;
}) => {
   const { entryId } = zx.parseParams(params, {
      entryId: z.string(),
   });
   const entry = await payload.findByID({
      collection: "entries",
      id: entryId,
   });
   return entry;
};

export const getCustomEntryData = async ({
   payload,
   params,
   request,
   depth = 2,
}: {
   payload: Payload;
   params: Params;
   request: Request;
   depth: number;
}) => {
   const url = new URL(request.url).pathname;
   const slug = url.split("/")[3];

   const { entryId, siteId } = zx.parseParams(params, {
      entryId: z.string(),
      siteId: z.string(),
   });

   const entry = await payload.findByID({
      // @ts-ignore
      collection: `${slug}-${siteId}`,
      id: `${slug}-${entryId}`,
      depth: depth,
   });

   return entry;
};

export const meta: V2_MetaFunction = ({ matches, data }) => {
   const siteName = matches.find(({ id }) => id === "routes/$siteId")?.data
      ?.site.name;
   return [
      {
         title: `${data.entryDefault.name} - ${siteName}`,
      },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
   ];
};
