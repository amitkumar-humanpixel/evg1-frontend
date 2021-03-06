export const downloadAll = response => {
  try {
    const blob = new Blob([response?.data], { type: response?.headers?.['content-type'] });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const fileName = response?.headers?.['content-disposition']
      ? response?.headers?.['content-disposition']?.split('filename=')[1]
      : 'file';

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
