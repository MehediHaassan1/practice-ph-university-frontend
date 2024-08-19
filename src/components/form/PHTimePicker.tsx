import React from "react";
import { TimePicker, Form } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Controller, useFormContext } from "react-hook-form";

dayjs.extend(customParseFormat);

type TTimePickerProps = {
    name: string;
    label?: string;
    defaultValue?: string;
};

const PHTimePicker: React.FC<TTimePickerProps> = ({
    name,
    label,
    defaultValue,
}) => {
    const { control } = useFormContext();

    return (
        <div style={{ marginBottom: "20px" }}>
            <Controller
                name={name}
                control={control}
                defaultValue={
                    defaultValue ? dayjs(defaultValue, "HH:mm") : null
                }
                render={({ field }) => (
                    <Form.Item label={label}>
                        <TimePicker
                            minuteStep={15}
                            {...field}
                            id={name}
                            value={
                                field.value ? dayjs(field.value, "HH:mm") : null
                            }
                            onChange={(time) => {
                                field.onChange(
                                    time ? time.format("HH:mm") : null
                                );
                            }}
                            format="HH:mm"
                            style={{ width: "100%" }}
                        />
                    </Form.Item>
                )}
            />
        </div>
    );
};

export default PHTimePicker;
