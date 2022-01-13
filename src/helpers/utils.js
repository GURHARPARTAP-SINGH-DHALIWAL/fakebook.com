export function getFormBody(details)
{
    var formBody = [];
    for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    return formBody;
}


export function getAuthorisationTokenFromLocalStorage()
{
    return localStorage.getItem('token');
}