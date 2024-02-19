import { useContext, useState } from "react";
import ThemeContext from "../contexts/ThemeContext";

// -------------------------------
// HOOK personalisé
// -------------------------------
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState( {color: 'light', light: '#e8f1f5ab', dark: '#080110d9'} ) 
    // console.log('Provider: ' + theme.color)
    const { color, light, dark } = theme;

    const toggleTheme = () => {
        const body = document.body;
        setTheme(theme => (
            {
                ...theme,
                color: (color === 'light' ? 'dark' : 'light')
            }
        ));
        body.style.backgroundColor = (color === 'light' ? dark : light);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte
export const useTheme = () => useContext(ThemeContext);