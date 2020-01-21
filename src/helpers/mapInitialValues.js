export default function(data) {
  let obj = {};
  data.map(d => {
    obj[d.name] = d.default_value || "";
  });
  return obj;
}
