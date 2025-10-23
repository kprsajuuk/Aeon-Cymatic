import { redirect } from 'react-router-dom';
import Test from '../pages/test';
import MusicSearch from "@/pages/MusicSearch/Music";
import Beat from "@/pages/Beat/Beat";
import Visualize from "@/pages/Visualize/Visualize";
import Notebook from "@/pages/Notebook/Notebook";

const router = [
    { path: "test/a", element: props => <Test {...props} />, name: "test" },
    { path: "search", element: props => <MusicSearch {...props} />, name: "search" },
    { path: "beat", element: props => <Beat {...props} />, name: "beat" },
    { path: "visual", element: props => <Visualize {...props} />, name: "visual" },
    { path: "notebook", element: props => <Notebook {...props} />, name: "notebook" },
]

export default router;