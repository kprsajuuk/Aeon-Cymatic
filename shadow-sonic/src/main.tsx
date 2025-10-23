import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import 'dayjs/locale/zh-cn';

import App from './App.tsx'
//import 'antd/dist/antd.css'
import './antd-less-reset.css';
import './index.css'

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);
dayjs.extend(duration);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ConfigProvider locale={zhCN} theme={{ 
            algorithm: theme.darkAlgorithm,
            token: {
                // Seed Token，影响范围大
                colorPrimary: '#faad14ee',
                //borderRadius: 2,
                // 派生变量，影响范围小
                //colorBgContainer: '#f6ffed',
            },
        }}>
            <App />
        </ConfigProvider>
    </StrictMode>,
)
