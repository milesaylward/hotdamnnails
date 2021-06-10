/* eslint-disable no-underscore-dangle */
import debounce from 'lodash/debounce';
import fastdom from 'fastdom';
import * as types from '@/store/mutationTypes';

const DEFAULTS = {
  speed: 50, // how fast to update
  buffer: 5, // how far to scroll before it counts
};

export default class MediaListeners {
  constructor(
    store, {
      scrollingElement = document.body,
      speed = DEFAULTS.speed,
      buffer = DEFAULTS.buffer,
    } = {},
  ) {
    this.store = store;
    this.listeners = [];

    this._scrollingElement = scrollingElement;
    this._options = { ...DEFAULTS, speed, buffer };
    this._lastScrollY = 0;
  }

  init = () => {
    const resizeListener = debounce(
      this.updateDimensions,
      this._options.speed,
      { leading: true, trailing: true },
    );
    window.addEventListener('mousemove', this.updateMousePosition);
    window.addEventListener('resize', resizeListener);
    this.listeners.push(['mousemove', this.updateMousePosition]);
    this.listeners.push(['resize', resizeListener]);
    this.updateDimensions();
  }

  updateDimensions = () => {
    let clientWidth;
    let clientHeight;
    fastdom.measure(() => {
      clientHeight = window.innerHeight;
      clientWidth = window.innerWidth;
    });
    fastdom.mutate(() => {
      this.store.commit(types.SET_WINDOW_SIZE,
        {
          dimensions: {
            width: clientWidth || 0,
            height: clientHeight || 0,
          },
        });
    });
  }

  destroy = () => {
    this.listeners.forEach(([event, listener]) => {
      window.removeEventListener(event, listener);
    });
  }
}
