import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    name: string;
    colors: {
      bgColor: string;
      bgSecColor: string;
      textColor: string;
      textSecColor: string;
      highlightColor: string;
    };
    fonts: {
      title: string;
      text: string;
    };
  }
}
