import { errorNotification, warningNotification } from '../components/common/NotifyToaster';

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
      case 'VALIDATION_FAILED':
        errorNotification('Unable to Submit Form due to Missing Information.');
        if (e.response.data?.data?.length > 0) {
          e.response.data.data.forEach(s => warningNotification(s));
        }
        break;
      default:
        errorNotification('Something went wrong, Please try again later.');
        throw e;
    }
  }
};
