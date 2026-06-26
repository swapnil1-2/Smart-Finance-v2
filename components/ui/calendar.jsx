"use client";
import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  const [month, setMonth] = React.useState(new Date())

  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString("default", { month: "long" })
  )

  const years = Array.from(
    { length: 60 },
    (_, i) => new Date().getFullYear() - 30 + i
  )

  return (
    <div className="rounded-xl border bg-background shadow-sm">
      <DayPicker
        showOutsideDays={showOutsideDays}
        month={month}
        onMonthChange={setMonth}
        className={cn("p-4", className)}
        classNames={{
          months: "flex flex-col sm:flex-row gap-6",
          month: "space-y-4",
          caption: "flex items-center justify-center gap-2 relative",
          caption_label: "hidden",
          nav: "flex items-center gap-1",
          nav_button: cn(
            buttonVariants({ variant: "ghost" }),
            "h-8 w-8 rounded-full hover:bg-accent"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse",
          head_row: "flex justify-between",
          head_cell:
            "w-9 text-center text-xs font-medium text-muted-foreground",
          row: "flex justify-between mt-2",
          cell: cn(
            "relative w-9 h-9 text-center text-sm rounded-md focus-within:z-10",
            props.mode === "range"
              ? "[&:has(>.day-range-start)]:rounded-l-md [&:has(>.day-range-end)]:rounded-r-md"
              : "[&:has([aria-selected])]:bg-accent"
          ),
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-9 w-9 rounded-md font-normal hover:bg-accent"
          ),
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary",
          day_today:
            "border border-primary text-primary",
          day_outside:
            "text-muted-foreground opacity-50",
          day_disabled:
            "opacity-40 cursor-not-allowed",
          day_range_middle:
            "aria-selected:bg-accent",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: () => <ChevronLeft className="h-4 w-4" />,
          IconRight: () => <ChevronRight className="h-4 w-4" />,
          Caption: ({ displayMonth }) => (
            <div className="flex items-center gap-2">
              {/* Month Selector */}
              <select
                value={displayMonth.getMonth()}
                onChange={(e) =>
                  setMonth(
                    new Date(
                      displayMonth.getFullYear(),
                      Number(e.target.value)
                    )
                  )
                }
                className="bg-transparent text-sm font-semibold outline-none cursor-pointer"
              >
                {months.map((m, index) => (
                  <option key={m} value={index}>
                    {m}
                  </option>
                ))}
              </select>

              {/* Year Selector */}
              <select
                value={displayMonth.getFullYear()}
                onChange={(e) =>
                  setMonth(
                    new Date(
                      Number(e.target.value),
                      displayMonth.getMonth()
                    )
                  )
                }
                className="bg-transparent text-sm font-semibold outline-none cursor-pointer"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          ),
        }}
        {...props}
      />
    </div>
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
