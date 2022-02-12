const desktop = 1440;
const table = 1280;
const tableSmall = 1024;
const phone = 768;
const phoneSmall = 576;

export const size = {
  desktop,
  table,
  tableSmall,
  phone,
  phoneSmall,
}

export const device = {
  desktop: `(max-width: ${size.desktop}px)`,
  table: `(max-width: ${size.table}px)`,
  tableSmall: `(max-width: ${size.tableSmall}px)`,
  phone: `(max-width: ${size.phone}px)`,
  phoneSmall: `(max-width: ${size.phoneSmall}px)`,
}
