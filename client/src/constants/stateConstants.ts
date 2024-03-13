import { useState } from 'react';

export const useLoadingState = (initialValue: boolean = false) => {
  const [dataIsLoading, setDataIsLoading] = useState<boolean>(initialValue);
  return { dataIsLoading, setDataIsLoading };
};

export const usePopupState = (initialValue: string = '') => {
  const [popupIsActive, setPopupIsActive] = useState<string>(initialValue);
  return { popupIsActive, setPopupIsActive };
};

export const useHoveredCoinState = (initialValue: string = '') => {
  const [hoveredCoinId, setHoveredCoinId] = useState<string>(initialValue);
  return { hoveredCoinId, setHoveredCoinId };
};
