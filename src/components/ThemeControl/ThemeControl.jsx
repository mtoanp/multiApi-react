import { useContext } from 'react';
import { useTheme } from '../../hooks/ThemeProvider';
import './ThemeControl.scss';

export default function ThemeControl() {
    const { theme, toggleTheme } = useTheme()
    // const { color, light, dark, toggleTheme } = useTheme()
    // console.log('ThemeControl: ' + color)

    return <>
        <button className='btn theme-control'
                onClick={toggleTheme}
        >
            { 
                theme.color == 'light' ? 
                <i className="bi bi-brightness-high-fill"></i> :
                <i className="bi bi-moon"></i>
            }       
        </button>
    </>
}