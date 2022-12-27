import { API_ROOT } from ".";

const getAddress = async (postData) => {

    const api_url = API_ROOT + 'getcamaddress.php';    
    var myHeaders = new Headers();
    //myHeaders.append("Authorization", "Bearer " + bearerToken);
    myHeaders.append("Content-Type", "application/json");

    //postData = {...postData, alt: 200, v: 'premium'}

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(postData)
    };

    try {
        const response = await fetch(api_url, requestOptions);
        if (response.ok) {
            const json = await response.json();
            return json;
        }
    } catch (error) {
        console.log(error);
    }
}

export default getAddress;