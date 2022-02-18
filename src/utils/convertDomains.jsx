import { domain as Domain, domain_109 as Domain_109 } from 'data';

export const convertDomains = (domains, year) => {
  const dataBase = year >= 109 ? Domain_109 : Domain;

  const binaryDomain = domains
    .toString(2)
    .padStart(10, '0')
    .split('');
  const domainName = binaryDomain
    .map((item, index) => {
      if (item === '0') return '';
      return dataBase[index + 1];
    })
    .filter((item) => {
      return !!item;
    })
    .map((item) => {
      return item.label;
    });
  return domainName;
};
