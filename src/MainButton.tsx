import { FC, useEffect } from 'react';
import { useWebApp } from './WebAppProvider';

/**
 * The props type of {@link MainButton | `MainButton`}.
 */
export interface MainButtonProps {
  /**
   * Current button text
   * @defaultValue Set to `CONTINUE` by default
   */
  text?: string;
  /**
   * The button progress state indicator.
   * @defaultValue  Set to `false` by default
   */
  progress?: boolean;
  /**
   * The button disable state.
   * @defaultValue Set to `false` y defaults
   */
  disable?: boolean;
  /** The button press event handler */
  onClick?: () => void;
  /**
   * Current button color.
   * @defaultValue Set to themeParams.button_color by default
   */
  color?: string;
  /**
   * Current button text color
   * @defaultValue Set to themeParams.button_text_color by default
   */
  textColor?: string;
}

/**
 * Renders a {@link telegram!MainButton} component in React app as {@link react!Component}
 *
 * ```tsx
 * import { MainButton } from "@vkruglikov/react-telegram-web-app";
 *
 * <MainButton
 *     text="CLICK ME"
 *     onClick={() => console.log('Hello, I am button!')}
 * />
 * ```
 * @param props
 * @group React Components
 */
const MainButton = ({
  text = 'CONTINUE',
  progress = false,
  disable = false,
  color,
  textColor,
  onClick,
}: MainButtonProps): null => {
  const WebApp = useWebApp();
  const MainButton = WebApp?.MainButton;

  // Because it is necessary and immutable
  if (!MainButton) return null;

  useEffect(() => {
    MainButton.setParams({
      color: color || WebApp.themeParams.button_color || '#fff',
    });
  }, [color]);

  useEffect(() => {
    MainButton.setParams({
      text_color: textColor || WebApp.themeParams.button_text_color || '#000',
    });
  }, [textColor]);

  useEffect(() => {
    MainButton.setText(text);
  }, [text]);

  useEffect(() => {
    if (MainButton.isActive && disable) {
      MainButton.disable();
    } else if (!MainButton.isActive && !disable) {
      MainButton.enable();
    }
  }, [disable]);

  useEffect(() => {
    if (!MainButton.isProgressVisible && progress) {
      MainButton.showProgress(false);
    } else if (MainButton.isProgressVisible && !progress) {
      MainButton.hideProgress();
    }
  }, [progress]);

  useEffect(() => {
    if (!onClick) {
      return;
    }

    MainButton.onClick(onClick);
    return () => {
      MainButton.offClick(onClick);
    };
  }, [onClick]);

  useEffect(() => {
    MainButton.show();
    return () => {
      MainButton.hide();
    };
  }, []);

  return null;
};

export default MainButton;
