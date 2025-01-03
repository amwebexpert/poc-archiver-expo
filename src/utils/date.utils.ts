import { format } from 'date-fns';

export const dateToISOLikeButLocal = (date: Date): string => {
  const offsetMs = date.getTimezoneOffset() * 60 * 1000;
  const msLocal = date.getTime() - offsetMs;
  const dateLocal = new Date(msLocal);
  const iso = dateLocal.toISOString();
  const isoLocal = iso.slice(0, 19);

  return isoLocal;
};

export const nowToISOLikeButLocal = (): string => dateToISOLikeButLocal(new Date());

export const nowToISOLikeButLocalForFilename = (): string => {
  const isoLocal = nowToISOLikeButLocal();
  const isoLocalForFilename = isoLocal.replace(/:/g, '-');

  return isoLocalForFilename;
};

export const nowAsTime = () => format(new Date(), 'HH:mm:ss');
export const nowAsDate = () => format(new Date(), 'yyyy-MM-dd');
export const nowAsDateTime = () => format(new Date(), 'yyyy-MM-dd HH:mm:ss');
export const nowAsDateTimeForFilename = () => format(new Date(), 'yyyy-MM-dd_HH-mm-ss');
