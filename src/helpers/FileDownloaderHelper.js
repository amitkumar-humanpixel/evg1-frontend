const { convertArrayToCSV } = require('convert-array-to-csv');

export const downloadFile = response => {
  try {
    const responseObj = response.map((e, index) => ({ No: index + 1, Error: e }));
    const fileData = convertArrayToCSV(responseObj);
    const blob = new Blob([fileData]);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    const fileName = `errors.csv`;

    link.setAttribute('download', fileName);
    link.setAttribute('target', '__blank');
    link.style.display = 'none';

    document.body.appendChild(link);

    link.setAttribute('href', url);
    link.click();
  } catch (e) {
    /**/
  }
};
