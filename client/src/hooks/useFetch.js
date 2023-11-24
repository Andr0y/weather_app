import * as React from 'react';

function useFetch(url, setLoadingItem) {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (!url)
            return;

        async function fetchData() {
            if (setLoadingItem)
                setLoadingItem(true);
            setLoading(true);
            const response = await fetch(url);
            const responseData = await response.json();
            setData(responseData);
            if (setLoadingItem)
                setLoadingItem(false);
            setLoading(false);
        };

        fetchData();
    }, [url]);

    return { data, loading };
}

export default useFetch;
