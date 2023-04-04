export function listMarkup(countries) {
  return countries
    .map(
      country =>
        `<li class="country-item"><img src="${country.flags.svg}"><span class="country-name">${country.name.official}</span></li>`
    )
    .join('');
}

export function cardMarkup(country) {
  const { flags, name, capital, population, languages } = country;
  return `<div class="title-wrapper"><img src="${
    flags.svg
  }"><h2 class="country-title">${
    name.official
  }</h2></div><p class="country-info"><span class="info-title">Capital:</span> ${capital}</p><p class="country-info"><span class="info-title">Population:</span> ${population}</p><p class="country-info"><span class="info-title">Languages:</span> ${Object.values(
    languages
  ).join(', ')}</p>`;
}
