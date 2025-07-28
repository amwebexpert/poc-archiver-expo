import { SafeContainer } from '~/components/layout/safe-container';
import NativeSignaturePadScreen from '~/features/experiments/native-signature-pad';

export default function NativeSignaturePad() {
  return (
    <SafeContainer>
      <NativeSignaturePadScreen />
    </SafeContainer>
  );
}
