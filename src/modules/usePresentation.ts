import { reactive } from 'vue';
import { firestore } from '@/modules/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const state = reactive({
  step: 0,
});

onSnapshot(doc(firestore, 'state', 'presentation'), (document) => {
  state.step = (document.data() as any).step;
});

export default state;
