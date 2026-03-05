export const useBrowserData = () => {
  const browserData = {
    java_enabled: false,
    screen_width: window.screen.width,
    screen_height: window.screen.height,
    accept_header: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    window_height: window.innerHeight,
    window_width: window.innerWidth,
    language: navigator.language,
    timezone: new Date().getTimezoneOffset(),
    color_depth: window.screen.colorDepth,
  };

  return browserData;
};
