import { BottomSheetBackdrop, type BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { FunctionComponent } from 'react';

export const DefaultBackdrop: FunctionComponent<BottomSheetBackdropProps> = (props) => (
  <BottomSheetBackdrop disappearsOnIndex={-1} appearsOnIndex={0} {...props} />
);
