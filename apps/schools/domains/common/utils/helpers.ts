import { ParsedUrlQuery } from "querystring";

import { FilterValue } from "antd/es/table/interface";
import get from "lodash/get";
import isArray from "lodash/isArray";
import isEmpty from "lodash/isEmpty";
import isNumber from "lodash/isNumber";
import isObject from "lodash/isObject";
import { NextRouter } from "next/router";
import qs from "qs";

const DEFAULT_WIDTH_PRECISION = 2;
const PHONE_FORMAT_REGEXP = /(\d)(\d{3})(\d{3})(\d{2})(\d{2})/;

/**
 * Formats a phone, convert it from number string to string with dividers
 * for example: 01234567890 -> 0 (123) 456-78-90
 */
export const formatPhone = (phone: string): string =>
  phone ? phone.replace(PHONE_FORMAT_REGEXP, "$1 ($2) $3-$4-$5") : phone;

export const getFiltersFromQuery = <T>(
  query: ParsedUrlQuery
): T | Record<string, unknown> => {
  const { filters } = query;

  if (!filters || typeof filters !== "string") {
    return {};
  }

  try {
    return JSON.parse(filters);
  } catch (e) {
    return {};
  }
};

export const preciseFloor = (
  x: number,
  precision: number = DEFAULT_WIDTH_PRECISION
) => {
  return Math.floor(x * Math.pow(10, precision)) / 100;
};

/**
 * Generic function for extracting value from filters
 * @param filters
 * @param key
 */
export const getFilteredValue = <T>(
  filters: T,
  key: string | Array<string>
): FilterValue => get(filters, key, null);

interface IUpdateQueryOptions {
  routerAction: "replace" | "push";
  resetOldParameters: boolean;
}
interface IUpdateQueryData {
  newParameters: Record<string, unknown>;
  newRoute: string;
}
type UpdateQueryType = (
  router: NextRouter,
  data: Partial<IUpdateQueryData>,
  options?: Partial<IUpdateQueryOptions>
) => Promise<void>;

export const updateQuery: UpdateQueryType = async (router, data, options) => {
  const newParameters: any = get(data, "newParameters", {});
  const newRoute = get(data, "newRoute");
  const routerAction = get(options, "routerAction", "push");
  const resetOldParameters = get(options, "resetOldParameters", true);

  if (isEmpty(newParameters) && isEmpty(newRoute)) return;

  const payload = resetOldParameters || newRoute ? {} : { ...router.query };

  for (const key in newParameters) {
    const item = newParameters[key];
    if (item === 0 || (!isNumber(item) && isEmpty(item))) {
      delete payload[key];
    } else {
      payload[key] =
        isArray(item) || isObject(item)
          ? JSON.stringify(item)
          : (item as string);
    }
  }

  const route = newRoute || router.asPath.split("?")[0];
  const query = qs.stringify(payload, {
    arrayFormat: "comma",
    skipNulls: true,
    addQueryPrefix: true,
  });
  const url = route + query;

  if (routerAction === "push") {
    await router.push(url);
  } else {
    await router.replace(url);
  }
};
