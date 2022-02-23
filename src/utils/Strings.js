// UTILITIES FOR STRING MANIPULATION
export const StringifyPreferences = (cities, interests) => {
  let Stringified = ''
  if (cities.length && interests.length) {
    const mergedPrefs = cities.concat(interests);

    mergedPrefs.forEach((element, index) => {
      if (index === (mergedPrefs.length - 1)) {
        Stringified += `${element}`;
      } else {
        Stringified += `${element},`;
      }
    });
  }
  return Stringified;
}
