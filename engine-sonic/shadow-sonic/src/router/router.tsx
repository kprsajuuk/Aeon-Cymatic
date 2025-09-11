import { redirect } from 'react-router-dom';
import Test from '../pages/test';
import MusicSearch from "@/pages/MusicSearch/Music";
import Beat from "@/pages/Beat/Beat";
import Visualize from "@/pages/Visualize/Visualize";

const router = [
    { path: "test/a", element: <Test />, name: "test" },
    { path: "search", element: <MusicSearch />, name: "search" },
    { path: "beat", element: <Beat />, name: "beat" },
    { path: "visual", element: <Visualize />, name: "visual" },
]

export default router;