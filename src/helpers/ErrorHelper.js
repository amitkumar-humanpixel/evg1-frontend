import { errorNotification } from '../components/common/NotifyToaster';

export const displayErrors = e => {
  if (e?.code === 'ECONNABORTED') {
    errorNotification('Request Timeout, Make sure you are connected to network.');
  } else {
    switch (e?.response?.data?.status) {
      case 500:
        errorNotification('Internal server error');
        break;
      case 'ERROR':
        if (typeof e?.response?.data?.message === 'string')
          errorNotification(e?.response?.data?.message ?? 'It seems like server is down, Please try again later.');
        if (typeof e?.response?.data?.message === 'object')
          e?.response?.data?.message?.map(error => errorNotification(error));
        break;
      case 'BAD_REQUEST':
        errorNotification(e?.response?.data?.message || 'Bad request');
        break;
      default:
        errorNotification('Something went wrong, Please try again later.');
        throw e;
    }
  }
};
