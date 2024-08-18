/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type PhSelectProps = {
    control?: any;
    name: string;
    options: Array<{ value: string; label: string }>;
    label?: string;
    disabled?: boolean;
    mode?: "multiple" | undefined;
};

const PhSelect = ({
    control,
    name,
    options,
    label,
    disabled,
    mode
}: PhSelectProps) => (
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
                    mode={mode}
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
