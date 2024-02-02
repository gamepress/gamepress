import React, { createContext, useContext, useState } from "react";

import { clsx } from "clsx";

import { Link } from "./Link";

const TableContext = createContext<{
   bleed: boolean;
   dense: boolean;
   grid: boolean;
   striped: boolean;
   framed: boolean;
}>({
   bleed: false,
   dense: false,
   grid: false,
   striped: false,
   framed: false,
});

export function Table({
   bleed = false,
   dense = false,
   grid = false,
   striped = false,
   framed = false,
   className,
   children,
   ...props
}: {
   bleed?: boolean;
   dense?: boolean;
   grid?: boolean;
   striped?: boolean;
   framed?: boolean;
} & React.ComponentPropsWithoutRef<"div">) {
   return (
      <TableContext.Provider
         value={
            { bleed, dense, grid, striped, framed } as React.ContextType<
               typeof TableContext
            >
         }
      >
         <div className="flow-root">
            <div
               {...props}
               className={clsx(
                  className,
                  "-mx-[--gutter] overflow-x-auto whitespace-nowrap",
                  framed &&
                     "border-y tablet:border tablet:rounded-lg border-color-sub dark:bg-dark350 shadow-sm shadow-1",
               )}
            >
               <div
                  className={clsx(
                     "inline-block min-w-full align-middle",
                     !bleed && "tablet:px-[--gutter]",
                  )}
               >
                  <table className="min-w-full text-left text-sm/6">
                     {children}
                  </table>
               </div>
            </div>
         </div>
      </TableContext.Provider>
   );
}

export function TableHead({
   className,
   ...props
}: React.ComponentPropsWithoutRef<"thead">) {
   return <thead className={clsx(className)} {...props} />;
}

export function TableBody(props: React.ComponentPropsWithoutRef<"tbody">) {
   let { striped } = useContext(TableContext);

   return (
      <tbody
         className={clsx(!striped && "divide-y divide-color-sub")}
         {...props}
      />
   );
}

const TableRowContext = createContext<{
   href?: string;
   target?: string;
   title?: string;
   grouped?: boolean;
}>({
   href: undefined,
   target: undefined,
   title: undefined,
   grouped: false,
});

export function TableRow({
   href,
   target,
   title,
   className,
   children,
   ...props
}: {
   href?: string;
   target?: string;
   title?: string;
} & React.ComponentPropsWithoutRef<"tr">) {
   let { striped } = useContext(TableContext);

   return (
      <TableRowContext.Provider
         value={
            { href, target, title } as React.ContextType<typeof TableRowContext>
         }
      >
         <tr
            {...props}
            className={clsx(
               className,
               href &&
                  "has-[[data-row-link][data-focus]]:outline has-[[data-row-link][data-focus]]:outline-2 has-[[data-row-link][data-focus]]:-outline-offset-2 has-[[data-row-link][data-focus]]:outline-blue-500 dark:focus-within:bg-white/[2.5%]",
               striped && "even:bg-zinc-950/[2.5%] dark:even:bg-white/[2.5%]",
               href && striped && "hover:bg-zinc-950/5 dark:hover:bg-white/5",
               href &&
                  !striped &&
                  "hover:bg-zinc-950/[2.5%] dark:hover:bg-white/[2.5%]",
            )}
         >
            {children}
         </tr>
      </TableRowContext.Provider>
   );
}

export function TableHeader({
   className,
   ...props
}: React.ComponentPropsWithoutRef<"th">) {
   let { bleed, grid, framed } = useContext(TableContext);

   return (
      <th
         {...props}
         className={clsx(
            className,
            framed && "bg-zinc-50 dark:bg-dark400",
            "border-b border-color-sub font-semibold px-4 py-2.5 first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))]",
            grid && "border-l border-color-sub first:border-l-0",
            !bleed && "tablet:first:pl-2 tablet:last:pr-2",
         )}
      />
   );
}

export function TableCell({
   className,
   children,
   ...props
}: React.ComponentPropsWithoutRef<"td">) {
   let { bleed, dense, grid, striped, framed } = useContext(TableContext);
   let { href, target, title } = useContext(TableRowContext);
   let [cellRef, setCellRef] = useState<HTMLElement | null>(null);

   return (
      <td
         ref={href ? setCellRef : undefined}
         {...props}
         className={clsx(
            className,
            "relative px-4 first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))]",
            !striped && !framed && "border-b border-color",
            grid && "border-l border-color-sub first:border-l-0",
            dense ? "py-2.5" : "py-4",
            !bleed && "tablet:first:pl-2 tablet:last:pr-2",
         )}
      >
         {href && (
            <Link
               data-row-link
               href={href}
               target={target}
               aria-label={title}
               tabIndex={cellRef?.previousElementSibling === null ? 0 : -1}
               className="absolute inset-0 focus:outline-none"
            />
         )}
         {children}
      </td>
   );
}