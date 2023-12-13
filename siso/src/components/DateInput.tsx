"use client";
import React from "react";
import { DatePicker, Space, TimePicker } from "antd";
import { Input } from "antd";
import type { TimePickerProps } from "antd";
import type { DatePickerProps } from "antd/es/date-picker";
import { useSetAtom } from "jotai";
import {
  inputTextAtom,
  inputDateAtom,
  inputEndDateTimeAtom,
  inputContent,
} from "@/app/Stores";

const { TextArea } = Input;

export function DateInput() {
  const setInputText = useSetAtom(inputTextAtom);
  const setInputDate = useSetAtom(inputDateAtom);
  const setInputEndDateTime = useSetAtom(inputEndDateTimeAtom);
  const setInputContent = useSetAtom(inputContent);

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value: inputValue } = e.target;
    setInputText(inputValue);
  };

  const onInputContentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value: inputValue } = e.target;
    setInputContent(inputValue);
  };

  const onChange = (value: DatePickerProps["value"], dateString: string) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
    setInputDate(dateString);
  };

  const onEndDateChange = (
    value: TimePickerProps["value"],
    dateString: string,
  ) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
    setInputEndDateTime(dateString);
  };

  return (
    <Space direction="vertical" size={12}>
      <Input placeholder="Title" allowClear onChange={onInputChange} />
      <div className="flex flex-row gap-2">
        <DatePicker
          placeholder="Select start date"
          showTime={{ format: "HH:mm" }}
          format="YYYY-MM-DDTHH:mm"
          onChange={onChange}
        />
        <TimePicker
          placeholder="End time"
          format="HH:mm"
          onChange={onEndDateChange}
        />
      </div>
      <TextArea
        rows={4}
        placeholder="Content"
        onChange={onInputContentChange}
      />
    </Space>
  );
}
