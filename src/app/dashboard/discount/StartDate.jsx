"use client";
import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const StartDate = () => {
  const [selectedDate, setSelectedDate] = useState(new Date()); // Set today's date as default

  return (
    <div className="w-[310px] h-10">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] pl-3 text-left font-normal",
              !selectedDate && "text-muted-foreground"
            )}
          >
            {selectedDate ? (
              format(selectedDate, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              console.log("selected date", date);
              setSelectedDate(date);
            }}
            // disabled={(date) =>
            //   date > new Date() || date < new Date("1900-01-01")
            // }
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default StartDate;
