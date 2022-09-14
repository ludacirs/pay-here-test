import { useLocation, useNavigate } from "react-router-dom";

interface QueryString {
  q?: string;
  page?: string;
}

const useQeuryString = () => {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const queryStringObject = parseQueryStringToObject(search) as QueryString;

  const changeQueryString = (value: QueryString) => {
    const newQuery = { ...queryStringObject, ...value };

    navigate(`${pathname}?${stringifyObjectToQueryString(newQuery)}`);
  };

  return {
    queryStringObject,
    changeQueryString,
  };
};

export default useQeuryString;

const parseQueryStringToObject = (search: string) =>
  search
    .replace("?", "")
    .split("&")
    .map((query) => query.split("="))
    .reduce((object, [key, value]) => {
      object[key] = value;
      return object;
    }, {} as { [p: string]: string });

const stringifyObjectToQueryString = (queryString: QueryString) =>
  Object.entries(queryString)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
