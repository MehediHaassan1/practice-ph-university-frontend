import { BaseQueryApi } from "@reduxjs/toolkit/query";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type TError = {
    status: number;
    data: {
        message: string;
        stack: string;
        success: boolean;
    }
}

export type TMeta = {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
}

export type TResponse<T> = {
    data?: T;
    error?: TError;
    meta?: TMeta;
    success: boolean;
    message: string;
}

export type TAcademicSemester = {
    _id: string;
    name: string;
    code: string;
    year: string;
    startMonth: string;
    endMonth: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;


export type TQueryParams = {
    name: string;
    value: boolean | React.Key
}

