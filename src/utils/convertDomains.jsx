import { domain as Domain } from 'data';

export const convertDomains = (domains) => {
  const binaryDomain = domains
    .toString(2)
    .padStart(10, '0')
    .split('');
  const domainName = binaryDomain
    .map((item, index) => {
      if (item === '0') return '';
      return Domain[index + 1];
    })
    .filter((item) => {
      return !!item;
    })
    .map((item) => {
      return item.label;
    });
  return domainName;
};
