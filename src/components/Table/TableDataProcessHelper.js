import moment from 'moment';

export const processTableDataByType = ({ header, row }) => {
  const { type } = header;
  const currentData = row[`${header.name}`];

  switch (type) {
    case 'date':
      return currentData ? moment(currentData).format('DD-MMM-YYYY') : '-';

    case 'tag':
      return <div className="table-tag">{currentData}</div>;

    default:
      return currentData ?? '-';
  }
};
