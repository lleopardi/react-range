export const offset = 10; // deberia ser el bullet/2

export const getMaxAndMinValues = (range: any) => {
  if (Array.isArray(range)) {
    const max = range[range.length - 1];
    const min = range[0];
    return {
      min,
      max,
    };
  }
  return range;
};

export const getBoundaries = (ref: HTMLElement) => {
  const element = ref.getBoundingClientRect();

  const min = element.x - offset;
  const max = element.width + min;
  const width = element.width;
  return {
    min,
    max,
    width,
  };
};

export const getTranslate = (clientX: number, startPosition: number) => {
  return clientX - startPosition - offset * 2;
};

export const getFilterValue = (
  filter: { min: number; max: number },
  width: number,
  translate: number
) => {
  if(Array.isArray(filter)){
    const items = filter.length - 1;
    const block = width / items;
    const idx = Math.round(translate / block);
    return filter[idx];
  }

  const value =
    filter.min + ((translate + offset) * (filter.max - filter.min)) / width;
  return Math.round(value);
};

export const getPositionFromLabel = (
    filter: { min: number; max: number },
    width: number,
    value: number
) => {
    const translate = (((value - filter.min) * width)/(filter.max - filter.min)) - offset;
    return translate;
}

