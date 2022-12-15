import { API_ROOT } from ".";

const getCamArchive = async (postData) => {

    const form_api_url = API_ROOT + 'getcamarchive.php';

    var myHeaders = new Headers();
    //myHeaders.append("Authorization", "Bearer " + bearerToken);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(postData)
    };

    try {
        const response = await fetch(form_api_url, requestOptions);
        if (response.ok) {
            const json = await response.json();
            return json;
        }
        else {
            return { resource_id: postData.resource_id, error: 'Not Found' }
        }


    } catch (error) {
        console.log(error);
    }
};

export default getCamArchive;