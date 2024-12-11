export const fetchConcerts = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/concerts`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch concerts");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching concerts:", error);
    return { status: "error", data: [] };
  }
};

export const fetchConcert = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/concerts/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch concerts");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching concerts:", error);
    return { status: "error", data: [] };
  }
};

export const fetchAvailableSeats = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/areas/availableSeats/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch concerts");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching concerts:", error);
    return { status: "error", data: [] };
  }
};

export const fetchOrders = async (token, page = 0, size = 10) => {
  if (!token) {
    return { status: "error", data: [] };
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/order?page=${page}&pageSize=${size}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return { status: "error", data: [] };
  }
};

export const fetchSnapTicket = async (orderId, tokens) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/order/snap/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${tokens}`,
            },
        });
        if(!response.ok) {
            throw new Error('Failed to snap ticket');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching concerts:', error);
        return {status: 'error', data: []};
    }
}

export const fetchPayOrder = async (orderId, tokens, paymentMethod) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/order/pay`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${tokens}`,
            },
            body: JSON.stringify({orderId, paymentMethod})
        });
        if(!response.ok) {
            throw new Error('Failed to pay order');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching concerts:', error);
        return {status: 'error', data: []};
    }
}

export const fetchOrder = async (orderId, tokens) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/order/${orderId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${tokens}`,
            },
        });
        if(!response.ok) {
            throw new Error('Failed to fetch order');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching concerts:', error);
        return {status: 'error', data: []};
    }
}