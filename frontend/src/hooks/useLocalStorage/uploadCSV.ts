export const uploadCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const text = e.target?.result?.toString();
    if (!text) return;

    // Assuming the first row contains headers
    const rows = text.split('\n');
    const headers = rows[0].split(',');
    const data = rows.slice(1).map(row => {
      const values = row.split(',');
      const obj: { [key: string]: string } = {};
      headers.forEach((header, index) => {
        obj[header] = values[index];
      });
      return obj;
    });

    // Now `data` is the array of objects, you can update your state here
    console.log(data);
    // For example, if using Redux: dispatch(updateStateAction(data));
  };
  reader.readAsText(file);
};
