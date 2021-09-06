export const EMAIL_ADDRESS_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const MOBILE_NUMBER_REGEX = /^(\+\d{1,3}[- ]?)?\d{9,12}$/;
export const NUMBER_REGEX = /^\d+$/;
export const SPECIAL_CHARACTER_REGEX = /[^A-Za-z 0-9]/;
export const WEBSITE_URL = /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/;
