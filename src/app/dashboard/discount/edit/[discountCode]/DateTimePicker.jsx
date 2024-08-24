"use client";
import React, { useState } from "react";
import dayjs from "dayjs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const DateTimePicker = ({
  selectedStartDateTime,
  selectedEndDateTime,
  onStartDateTimeChange,
  onEndDateTimeChange,
  setValue,
}) => {
  console.log("myselectedStartDateTime", selectedStartDateTime);
  const startDateTime = dayjs(selectedStartDateTime);
  const endDateTime = dayjs(selectedEndDateTime);

  if (!startDateTime.isValid() || !endDateTime.isValid()) {
    console.log("Invalid start or end date");
    return null;
  }

  const [startDate, setStartDate] = useState(
    startDateTime.isValid() ? startDateTime.format("YYYY-MM-DD") : ""
  );
  const [startTime, setStartTime] = useState(
    startDateTime.isValid() ? startDateTime.format("HH:mm") : ""
  );
  const [endDate, setEndDate] = useState(
    endDateTime.isValid() ? endDateTime.format("YYYY-MM-DD") : ""
  );
  const [endTime, setEndTime] = useState(
    endDateTime.isValid() ? endDateTime.format("HH:mm") : ""
  );

  console.log("startDate startTime", startDate, startTime);
  console.log("endDate endTime", endDate, endTime);

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    updateStartDateTime(newStartDate, startTime);
  };

  const handleStartTimeChange = (e) => {
    const newStartTime = e.target.value;
    setStartTime(newStartTime);
    updateStartDateTime(startDate, newStartTime);
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);
    updateEndDateTime(newEndDate, endTime);
  };

  const handleEndTimeChange = (e) => {
    const newEndTime = e.target.value;
    setEndTime(newEndTime);
    updateEndDateTime(endDate, newEndTime);
  };

  const updateStartDateTime = (newDate, newTime) => {
    const combinedStartDateTime = dayjs(`${newDate}T${newTime}`).toDate();
    onStartDateTimeChange(combinedStartDateTime);
    setValue("startTimestamp", combinedStartDateTime);
  };

  const updateEndDateTime = (newDate, newTime) => {
    const combinedEndDateTime = dayjs(`${newDate}T${newTime}`).toDate();
    onEndDateTimeChange(combinedEndDateTime);
    setValue("endTimestamp", combinedEndDateTime);
  };

  return (
    <div className="">
      <div>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <Label htmlFor="start-date">Start Date</Label>
            <Input
              type="date"
              id="start-date"
              value={startDate}
              onChange={handleStartDateChange}
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <Label htmlFor="start-time">Start Time</Label>
            <Input
              type="time"
              id="start-time"
              value={startTime}
              onChange={handleStartTimeChange}
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <Label htmlFor="end-date">End Date</Label>
            <Input
              type="date"
              id="end-date"
              value={endDate}
              onChange={handleEndDateChange}
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <Label htmlFor="end-time">End Time</Label>
            <Input
              type="time"
              id="end-time"
              value={endTime}
              onChange={handleEndTimeChange}
              className="mt-1 block w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateTimePicker;
