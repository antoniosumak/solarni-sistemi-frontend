export function ErrorMessageFormatter(error: any): string[] | string {
  const errors: any = error?.response?.data?.errors;
  if (error?.response?.status === 401) {
    return 'Your token has expired, refresh your page!';
  }
  if (error?.response?.status === 500) {
    return 'There is a problem with server!';
  }
  if (error?.response?.status === 503) {
    return 'Service unavailable!';
  }
  if (error?.response?.status === 504) {
    return 'Service unavailable!';
  }
  if (errors) {
    return Object.values(errors).map((error: any) => error[0]);
  }

  return error;
}

export function b64toBlob(b64Data: string, contentType = '', sliceSize = 512) {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });

  const file = new File([blob], 'name');

  return file;
}
