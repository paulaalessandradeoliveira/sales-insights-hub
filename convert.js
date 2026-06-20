const { converter, formatCss } = require('culori');
const toOklch = converter('oklch');
const hexes = ['#d2cecc', '#e1dfd8', '#f4725c', '#ffc675', '#231f20'];
for (const h of hexes) {
  const c = toOklch(h);
  console.log(h, '->', formatCss(c));
}
