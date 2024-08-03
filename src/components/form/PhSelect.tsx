/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type PhSelectProps = {
    control?: any;
    name: string;
    options: Array<{ value: string; label: string }>;
    label?: string;
    disabled?: boolean;
};

const PhSelect = ({ control, name, options, label, disabled }: PhSelectProps) => (
    <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value, ref, name } }) => (
            <Form.Item label={label}>
                <Select
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                    name={name}
                    disabled={disabled}
                >
                    {options.map((option) => (
                        <Select.Option key={option.value} value={option.value}>
                            {option.label}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
        )}
    />
);

export default PhSelect;
