export const getRuntime = (time: number) => {
  const hrs = Math.floor(time / 60);
  const mins = time % 60;
  return `${hrs}hrs ${mins}m`;
};

export const getFormattedDate = (date: string) => {
  const pad = (x: number) => x.toString().padStart(2, "0");

  const theDate = new Date(date);
  const day = pad(theDate.getDate());
  const month = pad(theDate.getMonth() + 1);
  const year = theDate.getFullYear();

  return [month, day, year].join("/");
};

export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});