export const htmlDocumentMessage = (message = {}) => {
  const jsonMessage = JSON.stringify(message ?? {});
  return `
      window.onReactNativeMessage('${jsonMessage}');
      true;
    `;
};

interface LogIncomingHtmlDocMessageArgs {
  type?: 'log' | 'warn' | 'error' | 'debug';
  log?: string;
}
export const logIncomingHtmlDocMessage = ({
  type = 'log',
  log = '',
}: LogIncomingHtmlDocMessageArgs) => {
  console[type](`[incoming-html-doc-message] ${log}`);
};
