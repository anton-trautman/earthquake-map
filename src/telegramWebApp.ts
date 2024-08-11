declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready: () => void;
        close: () => void;
        MainButton: {
          text: string;
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
        };
      };
    };
  }
}

export const initTelegramWebApp = () => {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.ready();
  }
};

export const closeTelegramWebApp = () => {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.close();
  }
};

export const showMainButton = (text: string, callback: () => void) => {
  if (window.Telegram?.WebApp?.MainButton) {
    window.Telegram.WebApp.MainButton.text = text;
    window.Telegram.WebApp.MainButton.onClick(callback);
    window.Telegram.WebApp.MainButton.show();
  }
};

export const hideMainButton = () => {
  if (window.Telegram?.WebApp?.MainButton) {
    window.Telegram.WebApp.MainButton.hide();
  }
};