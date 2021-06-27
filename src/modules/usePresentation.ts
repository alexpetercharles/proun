import { reactive } from 'vue';
import { firestore } from '@/modules/firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

const state = reactive({
  step: 0,
  time: 10 * 60,
});

const stateDocument = doc(firestore, 'state', 'presentation');

// step callback auto update
onSnapshot(stateDocument, (document) => {
  state.step = (document.data() as any).step;
});

const usePresentation = () => {
  const nextStep = () => {
    state.step += 1;
    setDoc(stateDocument, state);
  };
  const prevStep = () => {
    state.step -= 1;
    setDoc(stateDocument, state);
  };
  return {
    state,
    nextStep,
    prevStep,
  };
};

export default usePresentation;
