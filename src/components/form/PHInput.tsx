/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input } from "antd";
import { Control, Controller } from "react-hook-form";

type TInputProps = {
    control?: Control<any>;
    type: string;
    name: string;
    label?: string;
};

const PHInput = ({ control, type, name, label }: TInputProps) => {
    return (
        <div style={{ marginBottom: "20px" }}>
            <Controller
                control={control}
                name={name}
                render={({ field, fieldState: { error } }) => (
                    <Form.Item label={label}>
                        <Input {...field} type={type} id={name} />
                        {error && (
                            <small style={{ color: "red" }}>
                                {error.message}
                            </small>
                        )}
                    </Form.Item>
                )}
            />
        </div>
    );
};

export default PHInput;
