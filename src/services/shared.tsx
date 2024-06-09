export const getRuntime = (time: number) => {
  const hrs = Math.floor(time / 60);
  const mins = time % 60;
  return `${hrs}hrs ${mins}m`;
};
