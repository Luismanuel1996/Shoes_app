export function filterShoesByBrand(list, Brand) {
    if (Brand) return list.filter((item) => item.Brand === Brand);
    else return list;
  }

export function getListOf(list, prop) {
    return [...new Set(list.map((item) => item[prop]))];
  }





