import React from 'react';

const useMediaQuery = (initialQuery: string) => {
    const [query, setQuery] = React.useState(initialQuery);
    const [matches, setMatches] = React.useState(false);

    React.useEffect(() => {
        if(!query) return;

        const mql = window.matchMedia(query);
    
        setMatches(mql.matches);
    
        const onChange = (e: MediaQueryListEvent) => {
            setMatches(e.matches);
        };
    
        try {
            mql.addEventListener("change", onChange);
        } catch (error) {
            mql.addListener(onChange);
        }
    
        return () => {
            try {
                mql.removeEventListener("change", onChange);
            } catch (error) {
                mql.removeListener(onChange);
            }
        };
    }, [query]);

    return [matches, setQuery] as const;
};

export default useMediaQuery;