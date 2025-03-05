class HttpService{

    async  invoke(uri, method, body) {
        try {
            const response = await fetch(
                uri,
                {
                    method: method,
                    body: body,
                    headers: { "Content-Type": "application/json" }
                }
            );
    
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                return null;
            }
            
        } catch (error) {
            console.log('Error fetching: ' + error.message);
            return null;
        }

    }

}