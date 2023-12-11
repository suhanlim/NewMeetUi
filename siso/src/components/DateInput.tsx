"use client";
import React from "react";
import { DatePicker, Space } from "antd";
import { Input } from "antd";
import type { DatePickerProps } from "antd/es/date-picker";
import { useSetAtom } from "jotai";
import { inputTextAtom, inputDateAtom } from "@/app/Stores";

export function DateInput() {
  const setInputText = useSetAtom(inputTextAtom);
  const setInputDate = useSetAtom(inputDateAtom);

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value: inputValue } = e.target;
    setInputText(inputValue);
  };

  const onChange = (value: DatePickerProps["value"], dateString: string) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
    setInputDate(dateString);
  };

  const onOk = (value: DatePickerProps["value"]) => {
    console.log("onOk: ", value);
  };

  return (
    <Space direction="vertical" size={12}>
      <Input
        placeholder="input with title"
        allowClear
        onChange={onInputChange}
      />
      <DatePicker
        showTime={{ format: "HH:mm" }}
        format="YYYY-MM-DDTHH:mm"
        onChange={onChange}
        onOk={onOk}
      />
    </Space>
  );
}
