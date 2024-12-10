export const fetchConcerts = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/concerts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch concerts');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching concerts:', error);
        return { status: 'error', data: [] };
    }
};

export const fetchConcert = async (id) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/concerts/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch concerts');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching concerts:', error);
        return { status: 'error', data: [] };
    }
};

export const fetchAvailableSeats = async (id) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/areas/availableSeats/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch concerts');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching concerts:', error);
        return { status: 'error', data: [] };
    }
};
